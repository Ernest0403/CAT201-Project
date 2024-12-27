import React, { useState } from "react";
import "./Description.css";
import ItemGrid from "./ItemGrid";

const mockProducts = [
    {
      id: 1,
      name: "Product A",
      image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg", // Placeholder image
      originalPrice: 100,
      discountedPrice: 80,
      category: "Electronics",
      date: "2024-12-01",
      popularity: 5,
    },
    {
      id: 2,
      name: "Product B",
      image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg",
      originalPrice: 200,
      discountedPrice: 150,
      category: "Clothing",
      date: "2024-12-10",
      popularity: 10,
    },
    {
      id: 3,
      name: "Product C",
      image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg",
      originalPrice: 300,
      discountedPrice: 250,
      category: "Accessories",
      date: "2024-11-20",
      popularity: 7,
    },
    {
      id: 4,
      name: "Product D",
      image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg",
      originalPrice: 400,
      discountedPrice: 350,
      category: "Electronics",
      date: "2024-12-15",
      popularity: 3,
    },

    {
        id: 5,
        name: "Product E",
        image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg",
        originalPrice: 500,
        discountedPrice: 450,
        category: "Electronics",
        date: "2024-12-15",
        popularity: 3,
      },
  ];

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const [quantity, setQuantity] = useState(1);

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
      {/* Main Product Section */}
      <div className="desc-container">
        {/* Product Image */}
        <img src="https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg" alt= "" className="product-image"/>

        {/* Product Details */}
        <div className="product-details">
          <h1>Item Name</h1>
          <h2>Price: </h2>
          <p>Description: </p>
          <div className="quantity">
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <button className="add-to-cart">Add to cart</button>
          <div className="product-meta">
            <p>SKU:</p>
            <p>Categories:</p>
            <p>Tag:</p>
            <p>Brand:</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
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

      {/* Related Products Section */}
      <div className="related-products">
        <h2>Related Products</h2>
        <ItemGrid items={mockProducts}/>
      </div>
      </div>
    </div>
  );
};

export default ProductPage;