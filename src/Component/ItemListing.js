import React, { useState } from "react";
import "./ItemListing.css";
import Footer from './Footer';
import SortBy from "./SortBy";
import ItemGrid from "./ItemGrid";

const mockitems = [
  {
    id: 1,
    name: "item A",
    image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg", // Placeholder image
    originalPrice: 100,
    discountedPrice: 80,
    category: "Sofas",
    date: "2024-12-01",
    popularity: 5,
  },
  {
    id: 2,
    name: "item B",
    image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg",
    originalPrice: 200,
    discountedPrice: 150,
    category: "Sofas",
    date: "2024-12-10",
    popularity: 10,
  },
  {
    id: 3,
    name: "item C",
    image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg",
    originalPrice: 300,
    discountedPrice: 250,
    category: "Pouf",
    date: "2024-11-20",
    popularity: 7,
  },
  {
    id: 4,
    name: "item D",
    image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg",
    originalPrice: 400,
    discountedPrice: 350,
    category: "Pouf",
    date: "2024-12-15",
    popularity: 3,
  },

  {
    id: 5,
    name: "item E",
    image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg",
    originalPrice: 400,
    discountedPrice: 350,
    category: "Pouf",
    date: "2024-12-15",
    popularity: 3,
  },

  {
    id: 6,
    name: "item E",
    image: "https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg",
    originalPrice: 400,
    discountedPrice: 350,
    category: "Pouf",
    date: "2024-12-15",
    popularity: 3,
  },
];

function ItemListing({ title, categories }) {
  const [items, setItems] = useState(mockitems);
  const [filterPrice, setFilterPrice] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pageTitle, setPageTitle] = useState(title);
  const [setSortOption] = useState("default");

   // Filter items by category
   const filteredItems = selectedCategory
   ? items.filter((item) => item.category === selectedCategory)
   : items;

  // Handle price filtering
  const handlePriceFilter = () => {
    const filtered = items.filter(
      (item) =>
        item.discountedPrice >= filterPrice[0] &&
        item.discountedPrice <= filterPrice[1]
    );
    setItems(filtered);
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPageTitle(category); 
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
