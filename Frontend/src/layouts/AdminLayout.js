import React, { useState } from 'react';
import Sidebar from '../Component/Sidebar';
import Header from '../Component/AdminHeader';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen); // Toggles the state
    };

    return (
        <div className="app">
            {/* Toggle Button */}
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                ☰
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="main-content">
                <Header />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;


