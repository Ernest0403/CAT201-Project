import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Description.css";
import ItemGrid from "./ItemGrid";
import mockItems from './mockItems';

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const selectedItem = mockItems.find(item => item.id === parseInt(id));
    setItem(selectedItem);
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Description":
        return <p>This is the description of the product.</p>;
      case "Additional Information":
        return (
          <div>
            <p><strong>Weight:</strong> 500g</p>
            <p><strong>Colour:</strong> Red</p>
          </div>
        );
      case "Reviews":
        return <p>No reviews yet. Be the first to review this product!</p>;
      default:
        return null;
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="main-container">
    <div className="main-container">
      <div className="desc-container">
        <img src={item.image} alt= {item.name} className="product-image"/>
        <div className="product-details">
          <h1>{item.name}</h1>
          <h2>RM {item.discountedPrice} </h2>
          <p>Description: </p>
          <div className="quantity">
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <div className="add-to-cart">
            <button>Add to cart</button>
          </div>
          <div className="product-meta">
            <p>SKU:</p>
            <p>Categories:</p>
            <p>Tag:</p>
            <p>Brand:</p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="tabs-header">
          <button
            className={activeTab === "Description" ? "active" : ""}
            onClick={() => setActiveTab("Description")}
          >
            Description
          </button>
          <button
            className={activeTab === "Additional Information" ? "active" : ""}
            onClick={() => setActiveTab("Additional Information")}
          >
            Additional Information
          </button>
          <button
            className={activeTab === "Reviews" ? "active" : ""}
            onClick={() => setActiveTab("Reviews")}
          >
            Reviews
          </button>
        </div>
        <div className="tabs-content">{renderTabContent()}</div>
      </div>

      <div className="related-products">
        <h2>Related Products</h2>
        <ItemGrid items={mockItems}/>
      </div>
      </div>
    </div>
  );
};

export default ItemPage;