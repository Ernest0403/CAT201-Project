import React, { useState, useEffect } from "react";
import "./CustomerService.css";

const CustomerService = () => {
  const [inquiries, setInquiries] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    username: "",
    status: "",
    reply: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" or "error"
  const [showPopup, setShowPopup] = useState(false);

  const API_URL = "http://localhost:8080/cat201_project_war/CustomerServiceServlet";

  // Fetch inquiries on mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setInquiries(data);
        } else {
          throw new Error("Invalid data format.");
        }
      } else {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      showPopupMessage("error", "Failed to fetch inquiries. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReply = (inquiry) => {
    setFormData({
      id: inquiry.id,
      title: inquiry.title,
      description: inquiry.description,
      username: inquiry.username,
      status: "Replied",
      reply: inquiry.reply || "",
    });
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    if (!formData.reply.trim()) {
      showPopupMessage("error", "Reply cannot be empty.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showPopupMessage("success", "Reply submitted successfully!");
        fetchInquiries(); // Refresh inquiries after submitting reply
        resetForm();
      } else {
        const errorData = await response.json();
        showPopupMessage("error", errorData.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      showPopupMessage("error", "An unexpected error occurred. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      description: "",
      username: "",
      status: "",
      reply: "",
    });
    setIsEditing(false);
  };

  const showPopupMessage = (type, message) => {
    setPopupType(type);
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
      <div className="customer-service">
        <h1>Customer Service</h1>
        {!isEditing ? (
            <div className="inquiry-list">
              {inquiries.length > 0 ? (
                  inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="inquiry-card">
                        <h3 className="inquiry-title">{inquiry.title}</h3>
                        <p>
                          <strong>Description:</strong> {inquiry.description}
                        </p>
                        <p>
                          <strong>Username:</strong> {inquiry.username}
                        </p>
                        <p>
                          <strong>Status:</strong> {inquiry.status}
                        </p>
                        {inquiry.status === "To Reply" ? (
                            <button
                                className="reply-button"
                                onClick={() => handleReply(inquiry)}
                            >
                              Reply
                            </button>
                        ) : (
                            <p>
                              <strong>Reply:</strong> {inquiry.reply}
                            </p>
                        )}
                      </div>
                  ))
              ) : (
                  <p>No inquiries available.</p>
              )}
            </div>
        ) : (
            <div className="reply-form">
              <h3>Reply to Inquiry</h3>
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <textarea
                  name="reply"
                  placeholder="Type your reply here..."
                  value={formData.reply}
                  onChange={handleInputChange}
              />
              <div className="form-buttons">
                <button className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="cancel-button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </div>
        )}
        {showPopup && (
            <div className={`popup-message ${popupType}`}>
              <h2>{popupType === "success" ? "Success" : "Error"}</h2>
              <p>{popupMessage}</p>
            </div>
        )}
      </div>
  );
};

export default CustomerService;









