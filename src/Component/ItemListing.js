import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ItemListing.css";
import Footer from './Footer';
import SortBy from "./SortBy";
import ItemGrid from "./ItemGrid";
import mockItems from "./mockItems";

function ItemListing({ title, categories, roomType }) {
  const [filterPrice, setFilterPrice] = useState([0, 5000]);
  const [appliedPrice, setAppliedPrice] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pageTitle, setPageTitle] = useState(title);
  const [setSortOption] = useState("default");

  const navigate = useNavigate();

  const roomItems = mockItems.filter((item) => item.roomType === roomType);

  const filteredItems = roomItems.filter((item) => {
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;

    const matchesPrice =
      item.discountedPrice >= appliedPrice[0] &&
      item.discountedPrice <= appliedPrice[1];

    return matchesCategory && matchesPrice;
  });

  const handlePriceFilter = () => {
    setAppliedPrice(filterPrice);
  };

  const handleCategoryClick = (category) => {
      setSelectedCategory(category);
      setPageTitle(category);
      navigate(`/${roomType.toLowerCase().replace(" ", "-")}/${category.toLowerCase().replace(" ", "-")}`);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
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
          <h3>item Categories</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap-content">
      <SortBy onSortChange={handleSortChange} />
      <ItemGrid items={filteredItems} />
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default ItemListing;