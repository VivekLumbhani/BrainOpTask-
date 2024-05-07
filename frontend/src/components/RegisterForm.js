import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); 
      formData.append('email', email);
      formData.append('username', username);
      formData.append('phone', phone);
      formData.append('profile_pic_url', profilePic); 
      formData.append('password', password);

      const response = await axios.post('http://localhost:8000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      
      console.log('Registration successful:', response);
      
      navigate("/");
      setEmail('');
      setUsername('');
      setPhone('');
      setProfilePic(null);
      setPassword('');
    } catch (error) {
      console.error('Registration failed:', error.response.data.error);
      setError(error.response.data.error); 
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4">Registration</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium">Phone Number</label>
            <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="profile_pic" className="block text-gray-700 font-medium">Profile Picture</label>
            <input type="file" id="profile_pic" name="profile_pic" onChange={(e) => setProfilePic(e.target.files[0])} className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500" />
          
            <button type='button'               onClick={() => setShowPassword(!showPassword)}
>              {showPassword ? 'Hide' : 'Show'}


            </button>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
        </form>
        <p>Already have an account? <Link to="/" style={{ color: "blue" }}>Login</Link></p>
      </div>
    </div>
  );
}

export default RegisterForm;
