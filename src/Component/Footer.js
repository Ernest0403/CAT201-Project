import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return(
        <footer class="footer">
        <div class="footer-container">
            <div class="footer-company">
            <h1>ComfortZone</h1>
            <p>
            Description
            </p>
            </div>

            <div class="footer-section">
            <h2>Useful Links</h2>
            <ul>
                <li><Link to="/">Contact Us</Link></li>
                <li><Link to="/">FAQ</Link></li>
                <li><Link to="/">Buy Now Pay Later</Link></li>
                <li><Link to="/">Return and Refund Policy</Link></li>
                <li><Link to="/">Terms & Conditions</Link></li>
            </ul>
            </div>

            <div class="footer-section">
            <h2>Follow Us</h2>
            <div class="social-icons">
                <img src="\Images\facebook.png" alt="Facebook" />
                <img src="\Images\instagram.png" alt="Instagram" />
                <img src="\Images\tiktok.png" alt="Tiktok" />
            </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 FurnitureDirect. All Rights Reserved.</p>
        </div>
        </footer>
    );
}

export default Footer;
