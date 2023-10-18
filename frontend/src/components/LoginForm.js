import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css'; 
// 

const baseURL = process.env.REACT_APP_BASE_URL

const LoginForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '', 
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/login`, formData);

      if (response.status === 200) {
        const data = response.data;
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        navigate('/home');
      } else {
        dispatch({ type: 'LOGIN_FAIL', payload: 'Login failed' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: 'Login failed' });
      navigate('/register');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
