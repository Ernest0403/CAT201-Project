import './AboutUs.css';
import React from 'react';
import Menubar from './Component/Menubar';
import Navbar from './Component/Navbar';

function AboutUs() {
    return (
        <>
        <div>
            <Menubar />
            <Navbar />
            <div className='AboutUsContainer'>
                <p className='AboutUsTitle'>About Us</p>
                <p>ComfortZone tha best!</p>
            </div>
        </div>
        </>
    )
}

export default AboutUs;