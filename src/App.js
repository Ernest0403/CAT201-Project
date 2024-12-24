import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Component/Sidebar';
import AdminHeader from './Component/AdminHeader';
import './App.css';

// Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import Promotions from './pages/admin/Promotions';
import CustomerService from './pages/admin/CustomerService';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <AdminHeader />
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage-products" element={<ManageProducts />} />
              <Route path="/manage-orders" element={<ManageOrders />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/customer-service" element={<CustomerService />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
