import './AboutUs.css';
import React from 'react';

function AboutUs() {
    return (
        <div className="AboutUsContainer">
            <h1 className="AboutUsTitle">About Us</h1>
            <p className="AboutUsDescription">
                Welcome to <span className="highlight">ComfortZone</span>, where style meets comfort! Our mission is to provide high-quality, beautifully crafted furniture that transforms your space into a haven of relaxation and inspiration. From timeless classics to modern designs, we offer a wide range of options to suit your style and needs.
            </p>
            <div className="AboutUsValues">
                <h2>Why choose <span className="highlight">ComfortZone</span>?</h2>
                <ul>
                    <li>
                        <span className="highlight">Exceptional Quality:</span> Crafted with care to ensure durability and style.
                    </li>
                    <li>
                        <span className="highlight">Affordable Luxury:</span> Beautiful furniture at prices that make sense.
                    </li>
                    <li>
                        <span className="highlight">Wide Selection:</span> Perfect pieces for every room and taste.
                    </li>
                    <li>
                        <span className="highlight">Customer-Centric Service:</span> Your satisfaction is our top priority.
                    </li>
                </ul>
            </div>
            <p className="AboutUsClosing">
                Transform your home or office with <span className="highlight">ComfortZone</span>—where comfort is always in style.
            </p>
        </div>
    );
}

export default AboutUs;



