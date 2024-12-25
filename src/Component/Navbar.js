import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navigation">
            <div className="nav-background">
                <ul className="nav-links">
                    <li><Link to="/living-room">Living Room</Link></li>
                    <li><Link to="/bedroom">Bedroom</Link></li>
                    <li><Link to="/kitchen">Kitchen and Dining Room</Link></li>
                    <li><Link to="/home-office">Home Office</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/terms">Terms and Conditions</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
    