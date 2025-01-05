import React, { useState } from 'react';
import './Promotions.css';

const Promotions = () => {
  const [promotions, setPromotions] = useState([
    { id: 1, title: '10% Off on Books', description: 'Enjoy 10% discount on all books', expiryDate: '2024-12-31', promoCode: 'BOOK10', photo: null },
    { id: 2, title: 'Free Shipping', description: 'Free shipping for orders above $50', expiryDate: '2024-12-31', promoCode: 'FREESHIP', photo: null },
  ]);

  const [formData, setFormData] = useState({
    photo: null,
    title: '',
    description: '',
    promoCode: '',
    expiryDate: '',
  });

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [confirmation, setConfirmation] = useState({ visible: false, action: null, promoId: null, promoTitle: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSave = () => {
    if (isEditing !== null) {
      setPromotions(
        promotions.map((promo) =>
          promo.id === isEditing ? { ...promo, ...formData } : promo
        )
      );
    } else {
      const newPromotion = {
        id: promotions.length + 1,
        title: formData.title,
        description: formData.description,
        promoCode: formData.promoCode,
        expiryDate: formData.expiryDate,
        photo: formData.photo,
      };
      setPromotions([...promotions, newPromotion]);
    }

    setFormData({ photo: null, title: '', description: '', promoCode: '', expiryDate: '' });
    setIsAdding(false);
    setIsEditing(null);
    setMessage('Promotion saved successfully!');
    setTimeout(() => setMessage(''), 3000); // Automatically hides message after 3 seconds
  };

  const handleEdit = (id) => {
    const promo = promotions.find((promo) => promo.id === id);
    setFormData(promo);
    setIsAdding(true);
    setIsEditing(id);
  };

  const handleDelete = (id) => {
    const promo = promotions.find((promo) => promo.id === id);
    setConfirmation({ visible: true, action: 'delete', promoId: id, promoTitle: promo.title });
  };

  const confirmAction = () => {
    if (confirmation.action === 'delete' && confirmation.promoId !== null) {
      setPromotions(promotions.filter((promo) => promo.id !== confirmation.promoId));
      setMessage(`Promotion "${confirmation.promoTitle}" deleted successfully!`);
      setTimeout(() => setMessage(''), 3000); // Automatically hides message after 3 seconds
    }
    setConfirmation({ visible: false, action: null, promoId: null, promoTitle: '' });
  };

  const cancelAction = () => {
    setConfirmation({ visible: false, action: null, promoId: null, promoTitle: '' });
  };

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
                <img src={promo.photo || 'https://via.placeholder.com/150'} alt="Promotion" className="promotion-photo" />
                <div className="promotion-details">
                  <h3>{promo.title}</h3>
                  <p>{promo.description}</p>
                  <p><strong>Promo Code:</strong> {promo.promoCode}</p>
                  <p><strong>Expiry Date:</strong> {promo.expiryDate}</p>
                </div>
                <div className="promotion-actions">
                  <button className="edit-button" onClick={() => handleEdit(promo.id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(promo.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="promotion-form">
          <label>
            Photos:
            <input type="file" onChange={handlePhotoChange} />
          </label>
          <label>
            Promotion Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Promo Code:
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
            />
          </label>
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={() => { setIsAdding(false); setIsEditing(null); }}>Cancel</button>
        </div>
      )}

      {confirmation.visible && (
        <div className="confirmation-popup">
          <div className="confirmation-popup-content">
            <p>Are you sure you want to delete the promotion "{confirmation.promoTitle}"?</p>
            <div className="confirmation-actions" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button className="yes-button" onClick={confirmAction}>Yes</button>
              <button className="no-button" onClick={cancelAction}>No</button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className="message-popup">
          <div className="message-popup-content" style={{ textAlign: 'center' }}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotions;