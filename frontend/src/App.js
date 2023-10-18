import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';


const App = () => {
  return (
    <>
      <Routes>
            <Route path="/home" exact element={<HomePage/>} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/" element={<LoginForm/>} />
      </Routes>
    </>
  );
};

export default App;