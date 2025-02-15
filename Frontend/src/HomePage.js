import './HomePage.css';
import React, { useState, useEffect } from 'react';
import Menubar from './Component/Menubar';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import ItemGrid from "./Component/ItemGrid";
import Slider from './Component/Slider';

function HomePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/cat201_project_war/Product-servlet')
        .then((response) => response.json())
        .then((data) => setItems(data))
        .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const sortedNewArrivals = [...items].sort((a, b) => new Date(b.product_arrivalDate) - new Date(a.product_arrivalDate));
  const sortedHotSale = [...items].sort((a, b) => b.product_orderVolume - a.product_orderVolume);

  // Promotions array with paths to images
  const promotions = [
    '/Images/promotion1.png',
    '/Images/promotion2.png',
    '/Images/promotion3.png',
  ];

  return (
      <div>
        <Menubar />
        <Navbar />
        <div className='homepage-container'>
          <img src="\Images\chat.png" alt='' className="chat-icon" />

          {/* Include Slider component */}
          <div className="offer-image">
            <Slider images={promotions} />
          </div>

          <section className="item-container">
            <h1 className="header">New Arrivals</h1>
            <ItemGrid items={sortedNewArrivals.slice(0, 5)} />
          </section>
          <section className="item-container">
            <h1 className="header">Hot Sale</h1>
            <ItemGrid items={sortedHotSale.slice(0, 5)} />
          </section>
        </div>
        <Footer />
      </div>
  );
}

export default HomePage;

