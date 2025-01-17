import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';
import UserSidebar from '../../Component/UserSidebar';

function AccountDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user details on component mount
  useEffect(() => {
    fetch('http://localhost:8080/cat201_project_war/AccountDetailsServlet', {
      method: 'GET',
      credentials: 'include',
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch account details.');
          }
          return response.json();
        })
        .then((data) => {
          const user = data[0] || {}; // Assuming the first user in the response
          setFirstName(user.firstName || '');
          setLastName(user.lastName || '');
          setDisplayName(user.displayName || '');
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('Error fetching account details.');
        });
  }, []);

  // Handle form submission
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setShowSuccessMessage(false);

    fetch('http://localhost:8080/cat201_project_war/AccountDetailsServlet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        firstName,
        lastName,
        displayName,
      }),
    })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || 'Failed to save changes.');
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success') {
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
          } else {
            throw new Error(data.message || 'Failed to save changes.');
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error.message);
        });
  };

  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  return (
      <div className="DashboardContainer">
        <UserSidebar />
        <div className="AccountDetails">
          <h2>Account Details</h2>
          {errorMessage && (
              <div className="ErrorMessage">
                <p>Error: {errorMessage}</p>
              </div>
          )}
          <form onSubmit={handleSaveChanges} className="AccountDetailsForm">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                  type="button"
                  className="reset-password"
                  onClick={handleResetPassword}
              >
                Reset Password? Click Here
              </button>
            </div>
            <button type="submit" className="save-changes">
              Save Changes
            </button>
          </form>
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











