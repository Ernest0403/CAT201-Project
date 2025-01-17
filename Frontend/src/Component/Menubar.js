import React, { useState, useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Menubar.css";

function Menubar() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchResultsRef = useRef(null);
    const inputRef = useRef(null);


    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        fetch(`http://localhost:8080/cat201_project_war/Search-product-servlet?id=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
                setShowSearchResults(true);
                console.log(data)
            })
            .catch(error => console.error("Error fetching search results:", error));
    };

    // Handle click outside search box
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchResultsRef.current &&
                !searchResultsRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setShowSearchResults(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Handle result click to clear the search box
    const handleResultClick = () => {
        setShowSearchResults(false);
        setSearchQuery('');
    };

    return (
        <div className="Menubar-flex">
            <a href="/" className="TextLogo">ComfortZone</a>
            <div className="Searchbar" ref={searchResultsRef}  onMouseLeave={() => setShowSearchResults(false)}>
                <input type="text" name="SearchInput" placeholder="Search for products" value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)} ref={inputRef}/>
                <span className="SearchIcon">
                    <button className='searchBtn' onClick={handleSearch}>
                        <img src="/Images/search.png" alt="Search Icon"/>
                    </button>
                </span>
                {/* Search Results */}
                {showSearchResults && (
                    <div className='searchResult' >
                        <ul>
                            {searchResults[0] != null ? (
                                searchResults.map((item, index) => (
                                    <Link className="no-deco" to={`/item/${item.product_sku}`} state={item} key={index}>
                                        <li onClick={handleResultClick}>
                                            {item.product_name || item.product_brand}
                                        </li>
                                    </Link>
                                ))
                            ) : (
                                <li>No results found</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <button className="MenuLoginButton" onClick={() => navigate("/login")}>
                <div className="LoginIcon">
                <img src="/Images/accounticon.png" alt="Account Icon" />
                    <div>Login/Register</div>
                </div>
            </button>
            <button className="Button" onClick={() => navigate("/cart")}>
                <img src="/Images/cart.jpg" alt="Cart Icon" />
            </button>
            <button className="Button" onClick={() => navigate("/favourite")}>
                <img src="/Images/favourite.png" alt="Favourite Icon" />
            </button>
        </div>
    );
}

export default Menubar;



