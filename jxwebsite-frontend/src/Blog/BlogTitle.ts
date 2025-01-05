
import axios from 'axios';
export const BlogTitle = async () => {
  try { 
    const response = await axios.get('http://localhost:8080/blog/titles'); 
    return response.data; 
  } catch (error) { 
    console.error('Error fetching data', error); 
    return []; 
  }
};
  
export const BlogTitleById = async (id: number) => { try { const response = await axios.get(`http://localhost:8080/blog/content/${id}`); return response.data; } catch (error) { console.error('Error fetching content', error); return null; } };