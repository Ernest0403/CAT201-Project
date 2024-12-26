// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import Menubar from './Component/Menubar';
import Navbar from './Component/Navbar';
import './App.css';

//Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import Promotions from './pages/admin/Promotions';
import CustomerService from './pages/admin/CustomerService';

//General Pages
import Login from './pages/login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import AboutUs from './AboutUs';
import TnC from './TnC';

//User Pages
import UserDashboard from './pages/user/UserDashboard';


const HomePage = () => (
  <div>
    <Menubar />
    <Navbar />
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Welcome to Our Store</h2>
      <p>Browse through our amazing furniture collections!</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/manage-products" element={<AdminLayout><ManageProducts /></AdminLayout>} />
        <Route path="/manage-orders" element={<AdminLayout><ManageOrders /></AdminLayout>} />
        <Route path="/promotions" element={<AdminLayout><Promotions /></AdminLayout>} />
        <Route path="/customer-service" element={<AdminLayout><CustomerService /></AdminLayout>} />

        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
        <Route path="/register" element={<UserLayout><Register /></UserLayout>} />
        <Route path="/reset-password" element={<UserLayout><ForgetPassword /></UserLayout>} />
        <Route path="/user-dashboard" element={<UserLayout><UserDashboard /></UserLayout>} />

        {/* Living Room and Other Category Routes */}
        <Route path="/living-room" element={<UserLayout><div>Living Room Content</div></UserLayout>} />
        <Route path="/bedroom" element={<UserLayout><div>Bedroom Content</div></UserLayout>} />
        <Route path="/kitchen" element={<UserLayout><div>Kitchen and Dining Room Content</div></UserLayout>} />
        <Route path="/home-office" element={<UserLayout><div>Home Office Content</div></UserLayout>} />
        <Route path="/about-us" element={<UserLayout><AboutUs /></UserLayout>} />
        <Route path="/terms" element={<UserLayout><TnC /></UserLayout>} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
