import React from 'react';
import { Link } from 'react-router-dom';
import TableContent from './TableContent';
import '../assets/home.css'; 

const HomePage = () => {
  return (
    <div className="home-page">
      <h2 className="page-title">Users Details</h2>
      <p className="welcome-message">Welcome to the users page.</p>
      <TableContent />
      <button className="logout-button">
        <Link to="/">Logout</Link>
      </button>
    </div>
  );
};

export default HomePage;
