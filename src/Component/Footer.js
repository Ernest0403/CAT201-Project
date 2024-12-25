import './Footer.css';
import React from 'react';

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
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Buy Now Pay Later</a></li>
                <li><a href="#">Return and Refund Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
            </ul>
            </div>

            <div class="footer-section">
            <h2>Follow Us</h2>
            <div class="social-icons">
                <a href="#"><img src="\Images\facebook.png" alt="Facebook" /></a>
                <a href="#"><img src="\Images\instagram.png" alt="Instagram" /></a>
                <a href="#"><img src="\Images\tiktok.png" alt="Tiktok" /></a>
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
