import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';
import UserSidebar from '../../Component/UserSidebar';

function AccountDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');

  // For navigation (reset password link)
  const navigate = useNavigate();

  // State to toggle success message pop-up
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // State for potential error message from the server
  const [errorMessage, setErrorMessage] = useState('');

  // =========================
  // 1) Fetch Current Details
  // =========================
  useEffect(() => {
    // On component mount, fetch user’s existing details (GET)
    fetch('http://localhost:8080/cat201_project_war/AccountDetailsServlet', {
      method: 'GET',
      credentials: 'include', // if your servlet uses session
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch account details');
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success') {
            // Fill the form fields from the response
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setDisplayName(data.displayName || '');
          } else {
            // If the server returned an error status
            setErrorMessage(data.message || 'Unable to load account details.');
          }
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage('Error fetching account details.');
        });
  }, []);

  // =========================
  // 2) Handle Save Changes
  // =========================
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setShowSuccessMessage(false);

    // Make a POST request to update the account details
    fetch('http://localhost:8080/cat201_project_war/AccountDetailsServlet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include', // if your servlet uses session
      body: new URLSearchParams({
        firstName,
        lastName,
        displayName,
      }),
    })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || 'Failed to save changes');
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success') {
            // Show success popup
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000); // Auto-hide after 3s
          } else {
            throw new Error(data.message || 'Failed to save changes');
          }
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage(err.message);
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






