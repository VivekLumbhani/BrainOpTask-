import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="row flex items-center">
      <h1 className={`text-2xl font-semibold mb-4 mr-4 ${location.pathname === '/home' ? 'text-blue-500' : ''}`}>
        <Link to="/home">Home</Link>
      </h1>
      <h1 className={`text-2xl font-semibold mb-4 ${location.pathname === '/post' ? 'text-blue-500' : ''}`}>
        <Link to="/post">Post Something</Link>
      </h1>
    </div>
  );
};

export default NavBar;
