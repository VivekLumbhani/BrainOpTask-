import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import FileTokenCheck from './auth/FileTokenCheck';
import NavBar from './NavBar';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const navigate = useNavigate();
  const observer = useRef();

  const isAuth = FileTokenCheck()
  if (!isAuth) {
    navigate("/");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/post/getposts?page=${page}`);
        if (response.data.length === 0) {
          setAllPostsLoaded(true);
        } else {
          setPosts(prevPosts => [...prevPosts, ...response.data]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    if (!loading) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      };

      observer.current = new IntersectionObserver(handleObserver, options);
      if (observer.current) {
        observer.current.observe(document.getElementById("observer"));
      }

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }
  }, [loading]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && !loading && !allPostsLoaded) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {<NavBar/>}
      <div className="flex flex-col">
        {posts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4">
            {console.log("img " + post.postimg)}
            <img src={`http://localhost/brainOpTechnologies/postfolder/${post.postimg}`} alt="Post" className="mb-2 rounded-lg w-full" />
            <p className="text-lg font-semibold mb-2">{post.caption}</p>
            <p className="text-gray-500">Posted by {post.username} on {new Date(post.uploadedAt).toLocaleDateString()}</p>
          </div>
        ))}
        <div id="observer"></div>
        {loading && <p>Loading more posts...</p>}
        {allPostsLoaded && <p>You have watched all posts.</p>}
      </div>
    </div>
  );
}

export default HomeScreen;
