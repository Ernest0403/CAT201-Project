import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ItemListing.css";
import Footer from './Footer';
import SortBy from "./SortBy";
import ItemGrid from "./ItemGrid";

const capitalizeWords = (string) => {
  if (!string) return "";
  return string
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function ItemListing({ title, categories, roomType, defaultCategory }) {
  const [filterPrice, setFilterPrice] = useState([0, 5000]);
  const [appliedPrice, setAppliedPrice] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory || "");
  const [pageTitle, setPageTitle] = useState(title);
  const [sortOption, setSortOption] = useState("default");
  const [products, setProducts] = useState([]);
  const [filterBarVisible, setFilterBarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      fetch('http://localhost:8080/cat201_project_war/Product-servlet')
      .then((response) => response.json())
      .then((data) => setProducts(data)) 
      .catch((error) => console.error("Error fetching products:", error));

      if (category) {
        const formattedCategory = capitalizeWords(category.replace("-", " "));
        setSelectedCategory(formattedCategory);
        setPageTitle(formattedCategory);
      } else {
        setSelectedCategory("");
        setPageTitle(title);
      }

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [category, title]);

  const roomItems = products.filter((item) => item.product_roomCategory === roomType);

  const sortItems = (items) => {
    switch (sortOption) {
      case "price-low-high":
        return items.sort((a, b) => a.product_discountedPrice - b.product_discountedPrice);
      case "price-high-low":
        return items.sort((a, b) => b.product_discountedPrice - a.product_discountedPrice);
      case "new-arrivals":
        return items.sort((a, b) => new Date(b.product_arrivalDate) - new Date(a.product_arrivalDate));
      case "popularity":
        return items.sort((a, b) => b.product_orderVolume - a.product_orderVolume);
      default:
        return items;
    }
  };

  const filteredItems = roomItems.filter((item) => {
    const matchesCategory = selectedCategory
      ? item.product_itemCategory === selectedCategory
      : true;

    const matchesPrice =
      item.product_discountedPrice >= appliedPrice[0] &&
      item.product_discountedPrice <= appliedPrice[1];

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

  const sortedItems = sortItems(filteredItems);

  const toggleFilterBar = () => {
    setFilterBarVisible(!filterBarVisible);
  };

  return (
    <div className="product-container">
      <div className="page-title">
      <h1>{pageTitle}</h1>
      </div>
      <div className="listing-container">
      <div className="filterBar" style={{ display: (filterBarVisible || !isMobile) ? 'block' : 'none',}}>
        {isMobile && (
            <button className={`filterBar-close-btn ${filterBarVisible ? 'visible' : ''}`} onClick={toggleFilterBar}>
              Close
            </button>
        )}
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
          <h3>Item Categories</h3>
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
      <div className="filter-container">
      {isMobile && (
        <button
          className="filterBar-button"
          onClick={toggleFilterBar}
        >
          <img src="./Images/filter.png" alt="Filter" className="filter-icon" />
        </button>
      )}
      <SortBy onSortChange={handleSortChange} />
      </div>
      <ItemGrid items={sortedItems} />
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default ItemListing;