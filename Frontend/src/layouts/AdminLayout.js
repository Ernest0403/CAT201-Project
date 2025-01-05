import React from 'react';
import Sidebar from '../Component/Sidebar';
import Header from '../Component/AdminHeader';
import '../App.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;