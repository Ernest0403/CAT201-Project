import './HomePage.css';
import React from 'react';
import Menubar from './Component/Menubar';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import ItemGrid from "./Component/ItemGrid";

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
];

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
        <ItemGrid items={mockitems} />
      </section>
      <section className="item-container">
        <h1 className="header">Hot Sale</h1>
        <ItemGrid items={mockitems} />
      </section>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
