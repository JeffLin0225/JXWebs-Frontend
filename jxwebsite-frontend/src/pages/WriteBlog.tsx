import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';
import '../WriteBlog/WriteBlog.css';
import {BlogAllTitle, BlogTitle, BlogTitleById } from '../Blog/BlogTitle';
import {  saveNewTitle, saveNewArticle , modifyArticle,deleteArticle} from '../WriteBlog/WriteBlog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBookmark,faArrowRight ,faFile ,faXmark ,faCheck ,faPenToSquare} from '@fortawesome/free-solid-svg-icons';


interface BlogNavbarProps {
  onItemClic?: (content: string, createtime: string, updatetime: string) => void;
}

interface BlogTitleDTO {
  id: number;
  subject: string;
  createtime: string;
}

interface Title {
  id: number;
  subject: string;
  blogTitleDTO: BlogTitleDTO;
  createtime: string;
  updatetime: string | null;
}

const WriteBlog: React.FC<BlogNavbarProps> = ({  }) => {
  const [reloadFlag, setReloadFlag] = useState(false); // reload

  const [allTitles, setAllTitles] = useState<{ id: number; subject: string }[]>([]); // 用于存储大标题
  const [titles, setTitles] = useState<Title[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [content, setContent] = useState<string>('');
  const [isAddingTitle, setIsAddingTitle] = useState<boolean>(false);
  const [isAddingArticle, setIsAddingArticle] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitleName, setNewTitleName] = useState<string>('');
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [newArticleTitle, setNewArticleTitle] = useState<string>('');
  const [newArticleContent, setNewArticleContent] = useState<string>('');
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [currentCreatetime, setCurrentCreatetime] = useState<string | null>(null);  
  const [currentUpdatetime, setCurrentUpdatetime] = useState<string | null>(null);  


  useEffect(() => {
    // fetchAllTitles(); // 只获取大标题列表
    fetchTitles();
  }, [reloadFlag]); // 当 reloadFlag 改变时触发
  
  // 这个 effect 只会执行 fetchTitles，且不会受 reloadFlag 的影响
  useEffect(() => {
    fetchTitles(); // 获取其他数据
    fetchAllTitles(); // 只获取大标题列表
  }, []); // 这个 effect 只会在组件挂载时执行一次

  const handleReload = () => {
    setReloadFlag(prev => !prev);  // 修改状态，强制重新渲染
  };

  const fetchAllTitles = async () => {
    try {
      const result = await BlogAllTitle(); // 获取所有大标题
      setAllTitles(result);
    } catch (error) {
      console.error('获取大标题列表失败:', error);
    }
  };

  const fetchTitles = async () => {
    try {
      const result = await BlogTitle();
      setTitles(result);
    } catch (error) {
      console.error('獲取標題列表失敗:', error);
    }
  };

  const handleClick = async (id: number) => {
    try {
      const contentData = await BlogTitleById(id);
      if (contentData) {
        setActiveId(id);
        setCurrentTitle(contentData.subject); // 設置當前標題
        setContent(contentData.content);
        setIsEditing(false);
        setCurrentCreatetime( contentData.createtime)
        setCurrentUpdatetime( contentData.updatetime)
        // onItemClick(contentData.content, contentData.createtime, contentData.updatetime);
      }
    } catch (error) {
      console.error('獲取文章內容失敗:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (activeId === null) {
        Swal.fire('請先選擇一篇文章');
        return;
      }
      // TODO: 實現保存文章的 API 調用
      await modifyArticle(activeId , currentTitle, content);      
      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "文章已保存",
        showConfirmButton: false,
        timer: 1500
      });
      handleReload();
    } catch (error) {
      console.error('保存文章失敗:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (activeId) {
      handleClick(activeId);
    }
  };

  const handleAddTitleClick = () => {
    setIsAddingTitle(true);
  };

  const handleAddArticleClick = () => {
    setIsAddingArticle(true);
    setNewArticleContent('');
    setNewArticleTitle('');
  };

  const handleSaveNewTitle = async () => {
    if (!newTitleName.trim()) {
      Swal.fire('請輸入文章名稱');
      return;
    }
    try {
      // TODO: 實現保存新標題的 API 調用
      await saveNewTitle(newTitleName);
      setIsAddingTitle(false);
      setNewTitleName('');
      Swal.fire('新增（分類）成功！！！', '', 'success');
      handleReload();
    } catch (error) {
      Swal.fire('保存新標題失敗', '', 'error');
    }
  };

  const handleSaveNewArticle = async () => {
    if (!selectedParentId) {
      Swal.fire('請選擇（ 分類 ）分類', '', 'warning');
      return;
    }
    if (!newArticleTitle.trim()) {
      Swal.fire('請輸入文章標題', '', 'warning');
      return;
    }
    try {
      // TODO: 實現保存新文章的 API 調用
      await saveNewArticle(selectedParentId, newArticleTitle, newArticleContent);
      await BlogTitle(); // 刷新标题列表

      setIsAddingArticle(false);
      setNewArticleTitle('');
      setNewArticleContent('');
      setSelectedParentId(null);
      Swal.fire({
        icon: "success",
        title: "新增文章成功！！！棒棒der",
        showConfirmButton: false,
        timer: 1500
      });
      handleReload();
    } catch (error) {
      Swal.fire('保存新文章失敗', '', 'error');
    }
  };

  const handleDelete = async ()=>{
    try{
      if(!activeId){
        Swal.fire('沒選文章', '', 'warning');
        return
      }
      await Swal.fire({
        title: "確定要刪除文章嗎？？？",
        showCancelButton: true,
        confirmButtonText: "刪除",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteArticle(activeId);
          Swal.fire('刪除成功！！！', '', 'success');
        } 
      });
      handleReload();

    }catch(error){
      Swal.fire('刪除文章失敗', '', 'error');
    }
    
  }

  const groupedTitles = titles.reduce((acc, title) => {
    const group = acc.find((group) => group.subject === title.blogTitleDTO.subject);
    if (group) {
      group.children.push(title); // 将小标题（title）添加到对应的组
    } else {
      acc.push({
        subject: title.blogTitleDTO.subject,
        children: [title], // 新建组并添加第一个小标题
      });
    }
    return acc;
  }, [] as { subject: string; children: Title[] }[]);

  return (
    <div className="writeblog-container">
      <div className="writeblog-sidebar">
        <div className="writeblog-actions">
          <button className="writeblog-add-button" onClick={handleAddTitleClick}>
          <FontAwesomeIcon icon={faBookmark} />  新增分類
          </button>
          <button className="writeblog-add-button" onClick={handleAddArticleClick}>
          <FontAwesomeIcon icon={faFile} />  新增文章
          </button>
        </div>
        <p style={{color:'black', fontWeight:'bolder',marginLeft:'5%'}}><FontAwesomeIcon icon={faBookmark} /> 分類 , <FontAwesomeIcon icon={faArrowRight} /> 文章 </p>

        {isAddingTitle && (
          <div className="writeblog-add-form">
            <input
              type="text"
              value={newTitleName}
              onChange={(e) => setNewTitleName(e.target.value)}
              placeholder="輸入新分類名稱"
            />
            <div className="writeblog-buttons">
              <button className="writeblog-save-button" onClick={handleSaveNewTitle}>
              <FontAwesomeIcon icon={faCheck} />  新增分類
              </button>
              <button className="writeblog-cancel-button" onClick={() => setIsAddingTitle(false)}>
              <FontAwesomeIcon icon={faXmark} />  ( 取消 )新增
              </button>
            </div>
          </div>
        )}

      {groupedTitles.map((group) => (
        <div key={group.subject} className="writeblog-navbar-card">
          <h3 className="navbar-card-title">
            <FontAwesomeIcon icon={faBookmark} /> {group.subject}
          </h3>
          {group.children.map((title) => (
          <p
            key={title.id}
            onClick={() => handleClick(title.id)}
            className={`navbar-item ${activeId === title.id ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faArrowRight} /> &nbsp;&nbsp;
            {title.subject}
            <br />
            <span
              style={{
                fontSize: '0.8rem',
                color: 'gray', /* 当前项目文字颜色 */
                marginLeft: '10px',
                textDecoration: 'underline',
              }}
            >
              {title.createtime ? new Date(title.createtime).toLocaleString() : '无日期'}
            </span>
          </p>
        ))}
        </div>
      ))}
      </div>

      <div className="writeblog-content">
        {isAddingArticle ? (
          <div className="writeblog-add-article-form">
            <select
              value={selectedParentId || ''}
              onChange={(e) => setSelectedParentId(Number(e.target.value))}
            >
              <option value="">請選擇（分類）</option>
              {allTitles.map((title) => (
                <option key={title.id} value={title.id}>
                  {title.subject}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newArticleTitle}
              onChange={(e) => setNewArticleTitle(e.target.value)}
              placeholder="輸入文章標題"
              className="writeblog-input"
            />
            <div className="writeblog-editor-container">
              <ReactQuill
                value={newArticleContent}
                onChange={setNewArticleContent}
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }], // 標題選項
                    ['bold', 'italic', 'underline', 'strike', 'code'], // 粗體、斜體、底線、刪除線、行內代碼
                    [{ list: 'ordered' }, { list: 'bullet' }], // 有序與無序列表
                    ['link', 'image', 'video'], // 插入鏈接、圖片、視頻
                    [{ align: [] }], // 對齊選項（左、中、右）
                    [{ indent: '-1' }, { indent: '+1' }], // 縮排
                    ['blockquote', 'code-block'], // 引文和代碼區塊
                    ['clean'], // 清除格式
                  ],
                }}
                formats={[
                  'header', 'bold', 'italic', 'underline', 'strike', 'code', // 支援文字樣式
                  'list', 'bullet', 'ordered', // 支援列表
                  'link', 'image', 'video', // 支援插入鏈接、圖片、視頻
                  'align', 'indent', // 支援對齊與縮排
                  'blockquote', 'code-block', // 支援引文和代碼區塊
                  'clean', // 支援清除格式
                ]}
                className="writeblog-quill-editor"
              />
            </div>
            <div className="writeblog-buttons">
              <button className="writeblog-save-button" onClick={handleSaveNewArticle}>
              <FontAwesomeIcon icon={faCheck} />   新增文章
              </button>
              <button className="writeblog-cancel-button" onClick={() => setIsAddingArticle(false)}>
              <FontAwesomeIcon icon={faXmark} />   取消
              </button>
            </div>
          </div>
        ) : (
          <div className="writeblog-edit-area">
            {activeId && (
              <div className="writeblog-action-buttons">
                {isEditing ? (
                  <>
                  {/* 編輯模式下顯示標題輸入框 */}
                  <input
                    type="text"
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    className="writeblog-input"
                    placeholder="文章標題"
                  />
                    <button className="writeblog-save-button" onClick={handleSave}>
                    <FontAwesomeIcon icon={faCheck} />  保存修改
                    </button>
                    <button className="writeblog-cancel-button" onClick={handleCancel}>
                    <FontAwesomeIcon icon={faXmark} />  取消
                    </button>
                  </>
                ) : (
                  <button className="writeblog-save-button" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} />  修改
                  </button>
                )}&emsp;	&emsp;
                <span style={{fontSize:'xx-large' , textDecoration:'underline' ,color :'wheat'}}>{currentTitle}</span>&emsp;	&emsp;
                <span style={{ fontSize: '0.9rem', color: 'white', textDecoration : 'underline'}}>
                {currentCreatetime ? `發佈時間：${new Date(currentCreatetime).toLocaleString()}` : '無日期'}
                </span>&emsp;	&emsp;
                <span style={{ fontSize: '0.9rem', color: 'white', textDecoration : 'underline'}}>
                {currentUpdatetime ? `更新時間：${new Date(currentUpdatetime).toLocaleString()}` : ''}
                </span>&emsp;	&emsp;
                <button className="writeblog-save-button" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faPenToSquare} />  刪除文章
                </button>
                <hr />
              </div>
            )}
            {activeId ? (
              <div className="writeblog-editor-container">
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }], // 標題選項
                    ['bold', 'italic', 'underline', 'strike', 'code'], // 粗體、斜體、底線、刪除線、行內代碼
                    [{ list: 'ordered' }, { list: 'bullet' }], // 有序與無序列表
                    ['link', 'image', 'video'], // 插入鏈接、圖片、視頻
                    [{ align: [] }], // 對齊選項（左、中、右）
                    [{ indent: '-1' }, { indent: '+1' }], // 縮排
                    ['blockquote', 'code-block'], // 引文和代碼區塊
                    ['clean'], // 清除格式
                  ],
                }}
                formats={[
                  'header', 'bold', 'italic', 'underline', 'strike', 'code', // 支援文字樣式
                  'list', 'bullet', 'ordered', // 支援列表
                  'link', 'image', 'video', // 支援插入鏈接、圖片、視頻
                  'align', 'indent', // 支援對齊與縮排
                  'blockquote', 'code-block', // 支援引文和代碼區塊
                  'clean', // 支援清除格式
                ]}
                className="writeblog-quill-editor"
                readOnly={!isEditing}
              />
            </div>
            ) : (
              <div className="writeblog-empty-state">請選擇一篇有興趣的文章～</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteBlog;