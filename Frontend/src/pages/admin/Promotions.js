import React, { useState, useEffect } from "react";
import "./Promotions.css";

const Promotions = () => {
    const [promotions, setPromotions] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        promoCode: "",
        expiryDate: "",
    });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [confirmation, setConfirmation] = useState({
        visible: false,
        action: null,
        promoId: null,
        promoTitle: "",
    });
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(""); // "success" or "error"

    const API_URL = "http://localhost:8080/cat201_project_war/PromotionServlet";

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Debugging API response
                setPromotions(data);
            } else {
                throw new Error("Failed to fetch promotions.");
            }
        } catch (error) {
            console.error("Error fetching promotions:", error);
            setPopupType("error");
            setPopupMessage("Failed to fetch promotions. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errors = [];

        if (!formData.title) {
            errors.push("Title is required.");
        }
        if (!formData.description) {
            errors.push("Description is required.");
        }
        if (!formData.promoCode) {
            errors.push("Promo Code is required.");
        }
        if (!formData.expiryDate) {
            errors.push("Expiry Date is required.");
        } else if (new Date(formData.expiryDate) < new Date()) {
            errors.push("Expiry Date cannot be in the past.");
        }

        if (errors.length > 0) {
            setPopupType("error");
            setPopupMessage(errors.join(" "));
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        const payload = {
            id: isEditing, // Include the ID only if editing
            title: formData.title,
            description: formData.description,
            code: formData.promoCode,
            expiryDate: formData.expiryDate,
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload), // Send JSON payload
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === "success") {
                    setPopupType("success");
                    setPopupMessage("Promotion saved successfully!");
                    fetchPromotions();
                    resetForm();
                } else {
                    throw new Error(data.message || "Failed to save promotion.");
                }
            } else {
                throw new Error("Failed to save promotion.");
            }
        } catch (error) {
            console.error("Error saving promotion:", error);
            setPopupType("error");
            setPopupMessage(error.message);
        }
    };

    const handleEdit = (id) => {
        const promo = promotions.find((promo) => promo.id === id);
        setFormData({
            title: promo.title,
            description: promo.description,
            promoCode: promo.code,
            expiryDate: promo.expiryDate,
        });
        setIsAdding(true);
        setIsEditing(id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === "success") {
                    setPopupType("success");
                    setPopupMessage("Promotion deleted successfully!");
                    fetchPromotions();
                } else {
                    throw new Error(data.message || "Failed to delete promotion.");
                }
            } else {
                throw new Error("Failed to delete promotion.");
            }
        } catch (error) {
            console.error("Error deleting promotion:", error);
            setPopupType("error");
            setPopupMessage(error.message);
        }
    };

    const confirmAction = () => {
        if (confirmation.action === "delete" && confirmation.promoId !== null) {
            handleDelete(confirmation.promoId);
        }
        cancelAction();
    };

    const cancelAction = () => {
        setConfirmation({ visible: false, action: null, promoId: null });
    };

    const resetForm = () => {
        setFormData({ title: "", description: "", promoCode: "", expiryDate: "" });
        setIsAdding(false);
        setIsEditing(null);
    };

    useEffect(() => {
        if (popupMessage) {
            const timer = setTimeout(() => setPopupMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [popupMessage]);

    return (
        <div className="promotions">
            <h1>Promotions</h1>
            {!isAdding ? (
                <div>
                    <button className="add-button" onClick={() => setIsAdding(true)}>
                        Add New Promotion
                    </button>
                    <ul className="promotion-list">
                        {promotions.map((promo) => (
                            <li key={promo.id} className="promotion-item">
                                <div className="promotion-details">
                                    <h3>{promo.title}</h3>
                                    <p>{promo.description}</p>
                                    <p>
                                        <strong>Promo Code:</strong> {promo.code}
                                    </p>
                                    <p>
                                        <strong>Expiry Date:</strong> {promo.expiryDate}
                                    </p>
                                </div>
                                <div className="promotion-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(promo.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            setConfirmation({
                                                visible: true,
                                                action: "delete",
                                                promoId: promo.id,
                                                promoTitle: promo.title,
                                            })
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="promotion-form">
                    <div className="form-group">
                        <label>Promotion Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Promo Code:</label>
                        <input
                            type="text"
                            name="promoCode"
                            value={formData.promoCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date:</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-buttons">
                        <button className="save-button" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-button" onClick={resetForm}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {confirmation.visible && (
                <div className="confirmation-popup">
                    <div className="confirmation-popup-content">
                        <p>
                            Are you sure you want to delete the promotion "
                            {confirmation.promoTitle}"?
                        </p>
                        <div className="confirmation-actions">
                            <button className="yes-button" onClick={confirmAction}>
                                Yes
                            </button>
                            <button className="no-button" onClick={cancelAction}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {popupMessage && (
                <div
                    className={`PopupBox ${popupType === "error" ? "PopupError" : "PopupSuccess"}`}
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        zIndex: 1000,
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                    }}
                >
                    <h3>{popupType === "error" ? "Error" : "Success"}</h3>
                    <p>{popupMessage}</p>
                </div>
            )}
        </div>
    );
};

export default Promotions;



















