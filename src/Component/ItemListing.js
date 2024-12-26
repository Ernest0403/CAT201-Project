import React, { useEffect , useState } from "react";
import "./ItemListing.css";
import Footer from './Footer';
import SortBy from "./SortBy";

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
];

function ItemListing({ title, dataEndpoint, categories }) {
  const [products, setProducts] = useState(mockProducts);
  const [filterPrice, setFilterPrice] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pageTitle, setPageTitle] = useState(title);
  const [sortOption, setSortOption] = useState("default");

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

  // Sorting logic
  const sortProducts = (productsToSort) => {
    switch (sortOption) {
      case "price-low-high":
        return productsToSort.sort(
          (a, b) => a.discountedPrice - b.discountedPrice
        );
      case "price-high-low":
        return productsToSort.sort(
          (a, b) => b.discountedPrice - a.discountedPrice
        );
      case "new-arrivals":
        return productsToSort.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "popularity":
        return productsToSort.sort((a, b) => b.popularity - a.popularity);
      default:
        return productsToSort; // Default or no sorting
    }
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
      <div className="wrap-content">
      <SortBy onSortChange={handleSortChange} />
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
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default ItemListing;
