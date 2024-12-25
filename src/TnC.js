import './TnC.css';
import React from 'react';
import Menubar from './Component/Menubar';
import Navbar from './Component/Navbar';

function TnC() {
    return (
        <>
        <div>
            <Menubar />
            <Navbar />
            <div className='TnCContainer'>
                <p className='TnCTitle'>Terms and Conditions</p>
                <p>ComfortZone tha best!</p>
            </div>
        </div>
        </>
    )
}

export default TnC;