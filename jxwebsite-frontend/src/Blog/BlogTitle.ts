import axios from "../setting/axios";

export const BlogAllTitle = async () => {
  try {
    const response = await axios.get('/blog/findAllBlogBigTitle');
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
};

export const BlogTitle = async () => {
  try {
    const response = await axios.get('/blog/findAllBlogChildTitle');
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
};

export const BlogTitleById = async (id: number) => {
  try {
    const response = await axios.get(`/blog/content/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content', error);
    return null;
  }
};
