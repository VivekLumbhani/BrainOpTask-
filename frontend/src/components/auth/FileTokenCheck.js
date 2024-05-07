import React,{useEffect,useState} from 'react'
import {Link,useNavigate } from "react-router-dom";

const FileTokenCheck = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {

        const decodedToken = decodeToken(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {

          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate("/home");
        }
      } else {

        setIsAuthenticated(false);
        navigate("/home");
    }
    }, []);
  
    return isAuthenticated;
  };
  
  const decodeToken = (token) => {
    try {

        const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  };
  
  
export default FileTokenCheck
