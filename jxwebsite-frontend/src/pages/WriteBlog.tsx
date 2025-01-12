import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../WriteBlog/WriteBlog.css';
import { BlogTitle, BlogTitleById } from '../Blog/BlogTitle';

interface BlogNavbarProps {
  onItemClick: (content: string, createtime: string, updatetime: string) => void;
}

interface Title {
  id: number;
  subject: string;
  children: { id: number; subject: string; createtime: string; }[];
}

const WriteBlog: React.FC<BlogNavbarProps> = ({ onItemClick }) => {
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
    fetchTitles();
  }, []);

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
        onItemClick(contentData.content, contentData.createtime, contentData.updatetime);
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
      alert('請輸入分類名稱');
      return;
    }
    try {
      // TODO: 實現保存新標題的 API 調用
      // const response = await saveNewTitle(newTitleName);
      // await fetchTitles();
      setIsAddingTitle(false);
      setNewTitleName('');
    } catch (error) {
      console.error('保存新標題失敗:', error);
    }
  };

  const handleSaveNewArticle = async () => {
    if (!selectedParentId) {
      alert('請選擇文章分類');
      return;
    }
    if (!newArticleTitle.trim()) {
      alert('請輸入文章標題');
      return;
    }
    try {
      // TODO: 實現保存新文章的 API 調用
      // const response = await saveNewArticle({
      //   parentId: selectedParentId,
      //   title: newArticleTitle,
      //   content: newArticleContent
      // });
      // await fetchTitles();
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
              <option value="">選擇分類</option>
              {titles.map((title) => (
                <option key={title.id} value={title.id}>
                  {title.subject}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newArticleTitle}
              onChange={(e) => setNewArticleTitle(e.target.value)}
              placeholder="文章標題"
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