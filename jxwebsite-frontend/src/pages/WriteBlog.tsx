import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../WriteBlog/WriteBlog.css';
import {BlogAllTitle, BlogTitle, BlogTitleById } from '../Blog/BlogTitle';
import {  saveNewTitle, saveNewArticle } from '../WriteBlog/WriteBlog';


interface BlogNavbarProps {
  onItemClick: (content: string, createtime: string, updatetime: string) => void;
}

interface Title {
  id: number;
  subject: string;
  children: { id: number; subject: string; createtime: string; }[];
}

const WriteBlog: React.FC<BlogNavbarProps> = ({ onItemClick }) => {
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

  useEffect(() => {
    fetchAllTitles(); // 只获取大标题列表
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
        setContent(contentData.content);
        setIsEditing(false);
        // onItemClick(contentData.content, contentData.createtime, contentData.updatetime);
      }
    } catch (error) {
      console.error('獲取文章內容失敗:', error);
    }
  };

  const handleSave = async () => {
    try {
      // TODO: 實現保存文章的 API 調用
      // const response = await saveContent(activeId, content);
      setIsEditing(false);
      alert('文章已保存');
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
    } catch (error) {
      console.error('保存新文章失敗:', error);
    }
  };

  return (
    <div className="writeblog-container">
      <div className="writeblog-sidebar">
        <div className="writeblog-actions">
          <button className="writeblog-add-button" onClick={handleAddTitleClick}>
            新增分類
          </button>
          <button className="writeblog-add-button" onClick={handleAddArticleClick}>
            新增文章
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
                保存
              </button>
              <button className="writeblog-cancel-button" onClick={() => setIsAddingTitle(false)}>
                取消
              </button>
            </div>
          </div>
        )}

        {titles.map((title) => (
          <div key={title.id} className="writeblog-navbar-card">
            <h3 className="navbar-card-title">{title.subject}</h3>
            {title.children.map((child) => (
              <p
                key={child.id}
                onClick={() => handleClick(child.id)}
                className={`writeblog-navbar-item ${activeId === child.id ? 'active' : ''}`}
              >
                <span className="writeblog-arrow-icon">→</span>
                {child.subject}
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
                className="writeblog-quill-editor"
              />
            </div>
            <div className="writeblog-buttons">
              <button className="writeblog-save-button" onClick={handleSaveNewArticle}>
                保存
              </button>
              <button className="writeblog-cancel-button" onClick={() => setIsAddingArticle(false)}>
                取消
              </button>
            </div>
          </div>
        ) : (
          <div className="writeblog-edit-area">
            {activeId && (
              <div className="writeblog-action-buttons">
                {isEditing ? (
                  <>
                    <button className="writeblog-save-button" onClick={handleSave}>
                      保存
                    </button>
                    <button className="writeblog-cancel-button" onClick={handleCancel}>
                      取消
                    </button>
                  </>
                ) : (
                  <button className="writeblog-save-button" onClick={handleEdit}>
                    修改
                  </button>
                )}
              </div>
            )}
            {activeId ? (
              <div className="writeblog-editor-container">
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  theme="snow"
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