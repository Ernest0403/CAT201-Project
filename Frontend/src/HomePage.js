import './HomePage.css';
import React from 'react';
import Menubar from './Component/Menubar';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import ItemGrid from "./Component/ItemGrid";
import mockItems from './Component/mockItems';

function HomePage() {
  return (
    <div>
    <Menubar />
    <Navbar />
    <div className='homepage-container'>
      <img src="\Images\chat.png" alt='' className="chat-icon" />

      <div className="offer-image">
      </div>
      <section className="item-container">
        <h1 className="header">New Arrivals</h1>
        <ItemGrid items={mockItems.slice(0,5)} />
      </section>
      <section className="item-container">
        <h1 className="header">Hot Sale</h1>
        <ItemGrid items={mockItems.slice(0,5)} />
      </section>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
