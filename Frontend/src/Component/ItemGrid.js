import React from "react";
import { useNavigate } from "react-router-dom";
import "./ItemGrid.css";

const ItemGrid = ({ items }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="item-grid">
      {items.map((item) => (
        <div className="item-card" key={item.id}>
          <img src={item.image} alt={item.name} onClick={() => handleCardClick(item.id)} style={{ cursor: "pointer" }} />
          <h4 className="item-name" onClick={() => handleCardClick(item.id)} style={{ cursor: "pointer" }}>{item.name}</h4>
          <p>
            <span className="original-price">RM {item.originalPrice}</span>{" "}
            <span className="discounted-price">RM {item.discountedPrice}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;
