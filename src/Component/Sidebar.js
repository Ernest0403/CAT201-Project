import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul>
        <li><button onClick={() => navigate('/dashboard')}>Dashboard</button></li>
        <li><button onClick={() => navigate('/manage-products')}>Manage Product</button></li>
        <li><button onClick={() => navigate('/manage-orders')}>Manage Orders</button></li>
        <li><button onClick={() => navigate('/promotions')}>Setting Promotions or Discounts</button></li>
        <li><button onClick={() => navigate('/customer-service')}>Handling Customer Service Requests</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;