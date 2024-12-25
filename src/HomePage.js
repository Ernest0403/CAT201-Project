import './HomePage.css';
import React from 'react';
import Menubar from './Component/Menubar';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';


function HomePage() {
  return (
    <div className='container'>
      <Menubar />
      <Navbar />
      <img src="\Images\chat.png" alt='' className="chat-icon" />

      <div className="offer-image">
      </div>
      <section className="item-container">
        <h1 className="header">New Arrivals</h1>
        
        <div className="item-grid">
          <div className="item-card">
            <img src="https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg" alt="Item 1" />
            <div className="item-name">Item 1</div>
            <div className="item-price">RM 100</div>
          </div>
          <div className="item-card">
            <img src="\Images\chat.png" alt="Item 2" />
            <div className="item-name">Item 2</div>
            <div className="item-price">RM 200</div>
          </div>
          <div className="item-card">
            <img src="\Images\chat.png" alt="Item 3" />
            <div className="item-name">Item 3</div>
            <div className="item-price">RM 300</div>
          </div>
          <div className="item-card">
            <img src="\Images\chat.png" alt="Item 4" />
            <div className="item-name">Item 4</div>
            <div className="item-price">RM 400</div>
          </div>
        </div>
      </section>
      <section className="item-container">
        <h1 className="header">Hot Sale</h1>
        
        <div className="item-grid">
          <div className="item-card">
            <img src="https://www.furnituredirect.com.my/wp-content/uploads/2024/03/VESTA-6D-CD04-0045-1.jpg" alt="Item 1" />
            <div className="item-name">Item 1</div>
            <div className="item-price">RM 100</div>
          </div>
          <div className="item-card">
            <img src="\Images\chat.png" alt="Item 2" />
            <div className="item-name">Item 2</div>
            <div className="item-price">RM 200</div>
          </div>
          <div className="item-card">
            <img src="\Images\chat.png" alt="Item 3" />
            <div className="item-name">Item 3</div>
            <div className="item-price">RM 300</div>
          </div>
          <div className="item-card">
            <img src="\Images\chat.png" alt="Item 4" />
            <div className="item-name">Item 4</div>
            <div className="item-price">RM 400</div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
