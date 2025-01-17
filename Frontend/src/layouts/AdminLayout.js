import React, { useState } from 'react';
import Sidebar from '../Component/Sidebar';
import Header from '../Component/AdminHeader';
import './AdminLayout.css'; // Using the file above

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app">
            {/* Hamburger button (only shows on mobile) */}
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                ☰
            </button>

            {/* The .sidebar container, toggles .open */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <Sidebar />
            </div>

            <div className="main-content">
                <Header />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;




