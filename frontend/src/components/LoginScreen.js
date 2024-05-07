import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';
const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:8000/api/auth/loginapi', {
        email: email,
        password: password
      });

      localStorage.setItem('username', username);
      localStorage.setItem('token', response.data.token);

      console.log('Login successful:', response.data.token);

      setEmail('');
      setPassword('');
      navigate("/home");

    } catch (error) {
      console.error('Login failed:', error.response.data.error);

    }
  };


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium">Email Address</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
            
            />


            <button type='button'               onClick={() => setShowPassword(!showPassword)}
>              {showPassword ? 'Hide' : 'Show'}


            </button>

          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
        </form>

        <p>Don't have an account? <Link style={{ color: "blue" }} to="/register">Regiister</Link></p>

      </div>
    </div>
  );
}

export default LoginScreen;
