import React from "react";
import { useNavigate } from "react-router-dom";
import "./ItemGrid.css";

const ItemGrid = ({ items }) => {

  console.log("ItemGrid received items:", items);

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="item-grid">
      {items.map((item) => (
        <div className="item-card" key={item.product_sku}>
          <img src={item.product_src} alt={item.product_name} onClick={() => handleCardClick(item.product_sku)} style={{ cursor: "pointer" }} />
          <h4 className="item-name" onClick={() => handleCardClick(item.product_sku)} style={{ cursor: "pointer" }}>{item.product_name}</h4>
          <p>
            <span className="original-price">RM {item.product_price}</span>{" "}
            <span className="discounted-price">RM {(item.product_discountedPrice).toFixed(2)}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;
