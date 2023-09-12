import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditBlogPost() {
  const { postId } = useParams(); // Assuming postId is the parameter in the URL
  const [blogData, setBlogData] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const blog_id = useParams().blogId;

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`https://9129-116-126-166-12.ngrok-free.app/blogs/${blog_id}`);
        setBlogData(response.data);
        setTitle(response.data.title);
        setBody(response.data.body);
      } catch (error) {
        console.error('Error fetching blog post data:', error);
      }
    };

    fetchBlogPost();
  }, [blog_id]);

  const handleSave = async () => {
    try {
      const response = await axios.patch(`https://api.example.com/posts/${postId}`, {
        title,
        body,
      });

      if (response.status === 200) {
        console.log('Blog post updated successfully');
      } else {
        console.error('Failed to update blog post');
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Blog Post</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Body:</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
