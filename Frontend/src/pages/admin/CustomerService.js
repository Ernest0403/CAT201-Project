import React, { useState } from "react";
import "./CustomerService.css";

const CustomerService = () => {
  const [inquiries, setInquiries] = useState([
    { id: 1, title: "Order Issue", description: "I have an issue with my recent order.", username: "Ernest", status: "To Reply", reply: "" },
    { id: 2, title: "Payment Inquiry", description: "Can you confirm my payment status?", username: "Ernest", status: "Replied", reply: "Your payment was successful." },
  ]);

  const [currentInquiry, setCurrentInquiry] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleReply = (inquiry) => {
    setCurrentInquiry(inquiry);
    setReplyText("");
  };

  const handleSubmitReply = () => {
    if (currentInquiry) {
      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === currentInquiry.id
            ? { ...inq, status: "Replied", reply: replyText }
            : inq
        )
      );
      setCurrentInquiry(null);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className="customer-service">
      {showPopup && (
        <div className="popup-message">
          <p>Reply submitted successfully!</p>
        </div>
      )}
      {!currentInquiry ? (
        <div className="inquiry-list">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="inquiry-item">
              <h3>{inquiry.title}</h3>
              <p><strong>Description:</strong> {inquiry.description}</p>
              <p><strong>Username:</strong> {inquiry.username}</p>
              <p><strong>Status:</strong> {inquiry.status}</p>
              {inquiry.status === "To Reply" ? (
                <button onClick={() => handleReply(inquiry)}>Reply</button>
              ) : (
                <p><strong>Reply:</strong> {inquiry.reply}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="reply-form">
          <h3>{currentInquiry.title}</h3>
          <p><strong>Description:</strong> {currentInquiry.description}</p>
          <p><strong>Username:</strong> {currentInquiry.username}</p>
          <textarea
            placeholder="Type your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleSubmitReply}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default CustomerService;