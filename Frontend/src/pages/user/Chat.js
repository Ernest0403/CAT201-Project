import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

function Chat() {
  const [title, setTitle] = useState('');
  const [inquiries, setInquiries] = useState('');

  // Show/hide success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // For navigation (redirecting to previous page)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Inquiries:', inquiries);

    // Display the success message pop-up
    setShowSuccessMessage(true);

    // After 3 seconds, hide pop-up and navigate back
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate(-1); // -1 goes back one page in history
    }, 3000);
  };

  return (
    <div className="ChatContainer">
      <h2 className="ChatHeading">Chat or Inquiries</h2>
      
      <form onSubmit={handleSubmit} className="ChatForm">
        <div className="formGroup">
          <label>Title:</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter..."
          />
        </div>

        <div className="formGroup">
          <label>Inquiries:</label>
          <textarea
            value={inquiries}
            onChange={(e) => setInquiries(e.target.value)}
            placeholder="Enter..."
            rows="5"
          />
        </div>

        <button type="submit" className="SubmitButton">
          Submit
        </button>
      </form>

      {/* Success pop-up when submitted */}
      {showSuccessMessage && (
        <div className="SuccessPopup">
          <h2 className="SuccessTitle">Success</h2>
          <p>Submitted successfully!</p>
        </div>
      )}
    </div>
  );
}

export default Chat;



