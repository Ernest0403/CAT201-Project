import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menubar from '../Component/Menubar';
import Navbar from '../Component/Navbar';
import './UserLayout.css';

const UserLayout = ({ children }) => {
  const navigate = useNavigate();

  // Handler to navigate to the Chat page
  const handleChatClick = () => {
    navigate('/chat');
  };

  return (
    <div className="user-layout">
      <Menubar />
      <Navbar />

      {/* Main content */}
      <div className="user-content">
        {children}
      </div>



      {/* Floating chat icon at the bottom-right */}
      <div className="chat-icon-container" onClick={handleChatClick}>
        <img
          src="/Images/chat.png"
          alt="Chat"
          className="chat-icon"
        />
      </div>
    </div>
  );
};

export default UserLayout;



