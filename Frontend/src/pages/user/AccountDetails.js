import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';
import UserSidebar from '../../Component/UserSidebar';

function AccountDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  // For navigation (reset password)
  const navigate = useNavigate();

  // State to toggle success message pop-up
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // You can call an API or update global state to save changes.
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Display Name:', displayName);
    console.log('Email:', email);

    // Show the success message
    setShowSuccessMessage(true);

    // Automatically hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleResetPassword = () => {
    // Navigate to /reset-password
    navigate('/reset-password');
  };

  return (
    <div className="DashboardContainer">
      <UserSidebar />

      <div className="AccountDetails">
        <h2>Account Details</h2>

        <form onSubmit={handleSaveChanges} className="AccountDetailsForm">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Display Name */}
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Reset Password Link */}
          <div className="form-group">
            <button
              type="button"
              className="reset-password"
              onClick={handleResetPassword}
            >
              Reset Password? Click Here
            </button>
          </div>

          {/* Save Changes */}
          <button type="submit" className="save-changes">
            Save Changes
          </button>
        </form>

        {/* Success Message Pop-up */}
        {showSuccessMessage && (
          <div className="SuccessPopup">
            <h2 className="SuccessTitle">Success</h2>
            <p>Account details saved successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountDetails;




