import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Description.css";
import ItemGrid from "./ItemGrid";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [activeTab, setActiveTab] = useState("Description");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
          const response = await fetch(`http://localhost:8080/cat201_project_war_exploded/Product-servlet?id=${id}`);
          const data = await response.json();

          const selectedProduct = data.find((product) => product.product_sku === id);
              if (selectedProduct) {
                setItem(selectedProduct);

                const relatedResponse = await fetch(`http://localhost:8080/cat201_project_war_exploded/Product-servlet?roomCategory=${selectedProduct.product_roomCategory}`);
                const relatedData = await relatedResponse.json();

                const relatedFiltered = relatedData.filter(
                  (product) => product.product_sku !== selectedProduct.product_sku
                ).slice(0, 5);

                setRelatedItems(relatedFiltered);
              } else {
                console.error("Product not found");
              }
      } catch (error) {
         console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Description":
        return(
          <ul>
            <li>{item.product_name}</li>
            <li>Product overall size {item.product_dimension}</li>
            <li>{item.product_material}</li>
            <li>Made in {item.product_manufacturer}</li>
          </ul>
        );
      case "Additional Information":
        return (
          <div>
            <p><strong>Weight:</strong> {item.product_weight}</p>
            <p><strong>Colour:</strong> {item.product_colour}</p>
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
        <img src={item.product_src} alt= {item.product_name} className="product-image"/>
        <div className="product-details">
          <h1>{item.product_name}</h1>
          <div className="price-container">
            <h2 className="original-price">RM {item.product_price}</h2>
            <h2>RM {item.product_discountedPrice.toFixed(2)}</h2>
          </div>
          <ul>
            <li>{item.product_name}</li>
            <li>Product overall size {item.product_dimension}</li>
            <li>{item.product_material}</li>
            <li>Made in {item.product_manufacturer}</li>
          </ul>
          <div className="quantity">
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <div className="add-to-cart">
            <button>Add to cart</button>
          </div>
          <div className="product-meta">
            <p><strong>SKU:</strong> {item.product_sku}</p>
            <p><strong>Categories:</strong> {item.product_roomCategory}</p>
            <p><strong>Brand:</strong> {item.product_brand}</p>
            <p><strong>Warranty:</strong> {item.product_warranty}</p>
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
        <ItemGrid items={relatedItems}/>
      </div>
      </div>
    </div>
  );
};

export default ItemPage;