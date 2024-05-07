import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import FileTokenCheck from './auth/FileTokenCheck';
import { Link, useNavigate } from "react-router-dom";

const PostSomething = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const name = localStorage.getItem('username');
  const navigate = useNavigate();

  
  const isAuth = FileTokenCheck()
  if (!isAuth) {
    navigate("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append('postimg', file);
      formData.append('username', name);
      formData.append('caption', caption);


      await axios.post('http://localhost:8000/api/post/postapi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


      setFile(null);
      setCaption('');
      
      console.log('Post uploaded successfully');
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
            {<NavBar/>}


      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 font-medium">Choose File</label>
          <input type="file" id="file" name="file" onChange={(e) => setFile(e.target.files[0])} className="mt-1 w-full border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="caption" className="block text-gray-700 font-medium">Caption</label>
          <input type="text" id="caption" name="caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Upload Post</button>
      </form>
    </div>
  );
}

export default PostSomething;
