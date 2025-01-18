import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    return (
        <div className="slider">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`slider-image ${index === currentIndex ? 'active' : ''}`}
                />
            ))}
        </div>
    );
};

export default Slider;



