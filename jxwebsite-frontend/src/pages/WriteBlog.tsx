import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../WriteBlog/WriteBlog.css';
import {BlogAllTitle, BlogTitle, BlogTitleById } from '../Blog/BlogTitle';
import {  saveNewTitle, saveNewArticle , modifyArticle,deleteArticle} from '../WriteBlog/WriteBlog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBookmark,faArrowRight ,faFile ,faXmark ,faCheck ,faPenToSquare} from '@fortawesome/free-solid-svg-icons';


interface BlogNavbarProps {
  onItemClic?: (content: string, createtime: string, updatetime: string) => void;
}

interface Title {
  id: number;
  subject: string;
  children: { id: number; subject: string; createtime: string; }[];
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
        alert('請先選擇一篇文章');
        return;
      }
      // TODO: 實現保存文章的 API 調用
      await modifyArticle(activeId , currentTitle, content);      
      setIsEditing(false);
      alert('文章已保存');
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
      alert('請輸入文章名稱');
      return;
    }
    try {
      // TODO: 實現保存新標題的 API 調用
      await saveNewTitle(newTitleName);
      setIsAddingTitle(false);
      setNewTitleName('');
      alert('新增（分類）成功！！！');
      handleReload();
    } catch (error) {
      console.error('保存新標題失敗:', error);
    }
  };

  const handleSaveNewArticle = async () => {
    if (!selectedParentId) {
      alert('請選擇（ 分類 ）分類');
      return;
    }
    if (!newArticleTitle.trim()) {
      alert('請輸入文章標題');
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
      alert('新增文章成功！！！棒棒der');
      handleReload();
    } catch (error) {
      console.error('保存新文章失敗:', error);
    }
  };

  const handleDelete = async ()=>{
    try{
      if(!activeId){
        alert('沒選文章');
        return
      }
      alert('確定要刪除嗎！！！？？？');
      await deleteArticle(activeId);
      handleReload();
      alert('刪除文章成功！！！');
    }catch(error){
      console.error('刪除文章失敗:', error);
    }
    
  }

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
              <FontAwesomeIcon icon={faCheck} />  新增文章
              </button>
              <button className="writeblog-cancel-button" onClick={() => setIsAddingTitle(false)}>
              <FontAwesomeIcon icon={faXmark} />  ( 取消 )新增
              </button>
            </div>
          </div>
        )}

        {titles.map((title) => (
          <div key={title.id} className="writeblog-navbar-card">
           <h3 className="navbar-card-title"><FontAwesomeIcon icon={faBookmark} /> {title.subject}</h3>
            {title.children.map((child) => (
              <p
                key={child.id}
                onClick={() => handleClick(child.id)}
                className={`writeblog-navbar-item ${activeId === child.id ? 'active' : ''}`}
              >
              <FontAwesomeIcon icon={faArrowRight} />  {child.subject}
                <br />
                <span className="writeblog-createtime">
                  {child.createtime ? new Date(child.createtime).toLocaleString() : '無日期'}
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
                    ['bold', 'italic', 'underline'], // 粗體、斜體、底線
                    ['image', 'code-block'], // 插入圖片和代碼區塊
                  ],
                }}
                formats={[
                  'header', // 支援標題
                  'bold', 'italic', 'underline', // 支援文字樣式
                  'image', 'code-block', // 支援圖片與代碼區塊
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
                    ['bold', 'italic', 'underline'], // 粗體、斜體、底線
                    ['image', 'code-block'], // 插入圖片和代碼區塊
                  ],
                }}
                formats={[
                  'header', // 支援標題
                  'bold', 'italic', 'underline', // 支援文字樣式
                  'image', 'code-block', // 支援圖片與代碼區塊
                ]}
                className="writeblog-quill-editor"
                readOnly={!isEditing}
              />
            </div>
            ) : (
              <div className="writeblog-empty-state">請選擇一篇文章</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteBlog;