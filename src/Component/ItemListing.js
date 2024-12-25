import React, { useEffect, useState } from "react";
import "./ItemListing.css";
import Menubar from './Menubar';
import Navbar from './Navbar';
import Footer from './Footer';

function ProductListing({ title, dataEndpoint, categories }) {
  const [products, setProducts] = useState([]);
  const [filterPrice, setFilterPrice] = useState([0, 5000]);

  // Fetch data from the provided endpoint
  useEffect(() => {
    fetch(dataEndpoint)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [dataEndpoint]);

  // Handle price filtering
  const handlePriceFilter = () => {
    const filtered = products.filter(
      (product) =>
        product.discountedPrice >= filterPrice[0] &&
        product.discountedPrice <= filterPrice[1]
    );
    setProducts(filtered);
  };

  return (
    <div className="product-listing-container">
      <Menubar />
      <Navbar />
      <h1 className="page-title">{title}</h1>
      <div className="sidebar">
        <div className="filter-section">
          <h3>Filter by Price</h3>
          <input
            type="range"
            min="0"
            max="5000"
            value={filterPrice[1]}
            onChange={(e) =>
              setFilterPrice([filterPrice[0], Number(e.target.value)])
            }
          />
          <p>
            Price: RM {filterPrice[0]} – RM {filterPrice[1]}
          </p>
          <button onClick={handlePriceFilter}>Filter</button>
        </div>

        <div className="categories-section">
          <h3>Product Categories</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>
              <span className="original-price">RM {product.originalPrice}</span>{" "}
              <span className="discounted-price">
                RM {product.discountedPrice}
              </span>
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProductListing;