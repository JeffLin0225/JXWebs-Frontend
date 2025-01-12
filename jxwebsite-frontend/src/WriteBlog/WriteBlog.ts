import axios from "../setting/axios";

export const saveNewTitle = async (titleName: string) => {
  const response = await axios.post(`/writeblog/insertBlogTitle`, { subject: titleName });
  return response.data;
};

export const saveNewArticle = async (parentId: number, title: string, content: string) => {
  const response = await axios.post(`/writeblog/insertBlogContent`, {
    blogTitle: { id : parentId },
    subject: title,
    content,
  });
  return response.data;
};