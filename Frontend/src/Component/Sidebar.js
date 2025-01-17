import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Using the file above

const Sidebar = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => setShowPopup(true);
  const confirmLogout = () => {
    setShowPopup(false);
    navigate('/'); // or clear auth token, then navigate
  };
  const cancelLogout = () => setShowPopup(false);

  return (
      <div>
        <ul>
          <li><button onClick={() => navigate('/dashboard')}>Dashboard</button></li>
          <li><button onClick={() => navigate('/manage-products')}>Manage Products</button></li>
          <li><button onClick={() => navigate('/manage-orders')}>Manage Orders</button></li>
          <li><button onClick={() => navigate('/promotions')}>Promotions</button></li>
          <li><button onClick={() => navigate('/customer-service')}>Customer Service</button></li>
          <li><button className="logout" onClick={handleLogout}>Log Out</button></li>
        </ul>

        {showPopup && (
            <div className="PopupOverlay">
              <div className="PopupBox">
                <h3>Confirm Logout</h3>
                <p>Are you sure you want to log out?</p>
                <button className="confirm-button" onClick={confirmLogout}>Yes</button>
                <button className="cancel-button" onClick={cancelLogout}>No</button>
              </div>
            </div>
        )}
      </div>
  );
};

export default Sidebar;

