import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';
import AdminHeader from './Component/AdminHeader';
import './App.css';

// Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import Promotions from './pages/admin/Promotions';
import CustomerService from './pages/admin/CustomerService';
import Login from './pages/login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import UserDashboard from './pages/user/UserDashboard';
import AboutUs from './AboutUs';
import LivingRoom from './LivingRoom';
import Bedroom from './Bedroom';
import Kitchen from './Kitchen';
import DiningRoom from './DiningRoom';
import WorkRoom from './WorkRoom';

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
        <Route path="/living-room" element={<UserLayout><LivingRoom/></UserLayout>} />
        <Route path="/bedroom" element={<UserLayout><Bedroom/></UserLayout>} />
        <Route path="/kitchen" element={<UserLayout><Kitchen/></UserLayout>} />
        <Route path="/dining-room" element={<UserLayout><DiningRoom/></UserLayout>} />
        <Route path="/work-room" element={<UserLayout><WorkRoom/></UserLayout>} />
        <Route path="/about-us" element={<UserLayout><AboutUs /></UserLayout>} />
        <Route path="/terms" element={<UserLayout><div>Terms and Conditions Content</div></UserLayout>} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
