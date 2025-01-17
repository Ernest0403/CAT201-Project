import './TnC.css';
import React from 'react';

function TnC() {
    return (
        <div className='TnCContainer'>
            <h1 className='TnCTitle'>Terms and Conditions</h1>
            <div className='TnCContent'>
                <h2>Introduction</h2>
                <p>
                    Welcome to <span className='gradientText'>ComfortZone</span>! By using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully before using our services.
                </p>

                <h2>Usage of Website</h2>
                <p>
                    By accessing this website, you warrant and represent that you are at least 18 years old or accessing the site under the supervision of a parent or guardian.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                    All content, including but not limited to images, designs, logos, text, and graphics, is the property of <span className='gradientText'>ComfortZone</span> and is protected by copyright laws. Unauthorized use of this content is strictly prohibited.
                </p>

                <h2>Product Information</h2>
                <p>
                    We make every effort to ensure that the information about our products is accurate. However, we do not warrant that product descriptions or other content on our website are error-free.
                </p>

                <h2>Payment and Pricing</h2>
                <p>
                    All prices are listed in MYR unless stated otherwise. We reserve the right to change prices without prior notice. Payment must be completed at the time of purchase.
                </p>

                <h2>Returns and Refunds</h2>
                <p>
                    Customers may request a return or refund within 30 days of purchase, provided the item is in its original condition. Please review our Return Policy for more details.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    <span className='gradientText'>ComfortZone</span> shall not be held liable for any damages arising out of the use or inability to use our website or products, including but not limited to indirect or consequential damages.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                    <span className='gradientText'>ComfortZone</span> reserves the right to modify these terms and conditions at any time. Continued use of the website following any changes indicates your acceptance of the new terms.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@comfortzone.com" className='emailLink'>support@comfortzone.com</a>.
                </p>
            </div>
        </div>
    );
}

export default TnC;
