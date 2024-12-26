import React, { useEffect, useState } from "react";
import "./ItemListing.css";
import Footer from './Footer';

function ItemListing({ title, dataEndpoint, categories }) {
  const [products, setProducts] = useState([]);
  const [filterPrice, setFilterPrice] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pageTitle, setPageTitle] = useState(title);

  // Fetch data from the provided endpoint
 /* useEffect(() => {
    fetch("dataEndpoint")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);  // Debug: check the data
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [dataEndpoint]);*/

   // Filter products by category
   const filteredProducts = selectedCategory
   ? products.filter((product) => product.category === selectedCategory)
   : products;

   console.log("Filtered products:", filteredProducts);

  // Handle price filtering
  const handlePriceFilter = () => {
    const filtered = products.filter(
      (product) =>
        product.discountedPrice >= filterPrice[0] &&
        product.discountedPrice <= filterPrice[1]
    );
    setProducts(filtered);
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPageTitle(category); // Update the title based on selected category
  };

  return (
    <div className="product-container">
      <h1 className="page-title">{pageTitle}</h1>
      <div className="listing-container">
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
              <li key={index} onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
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
    </div>
  );
}


export default ItemListing;
