// layouts/UserLayout.js
import React from 'react';
import Menubar from '../Component/Menubar';
import Navbar from '../Component/Navbar';
import '../App.css';

const UserLayout = ({ children }) => {
  return (
    <div className="user-layout">
      <Menubar />
      <Navbar />
      <div className="user-content">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;