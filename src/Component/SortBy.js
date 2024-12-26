import React from "react";
import "./SortBy.css";

const SortBy = ({ onSortChange }) => {

    const handleSortChange = (event) => {
    const value = event.target.value;
    if (onSortChange) onSortChange(value); // Notify parent component about the selected sort option
  };
  return (
    <div className="sort-by-container">
      <label htmlFor="sort-by" className="sort-by-label">
        Sort By:
      </label>
      <select
        id="sort-by"
        onChange={handleSortChange}
        className="sort-by-select"
      >
        <option value="default">Default</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="new-arrivals">New Arrivals</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortBy;
