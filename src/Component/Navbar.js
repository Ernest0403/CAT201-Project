import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navigation">
        <div className="nav-background">
            <ul className="nav-links">
            <li><Link to="/LivingRoom">Living Room</Link></li>
            <li><Link to="/Bedroom">Bedroom</Link></li>
            <li><Link to="/Kitchen">Kitchen</Link></li>
            <li><Link to="/DiningRoom">Dining Room</Link></li>
            <li><Link to="/WorkStudy">Work/Study Room</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/terms">Terms and Conditions</Link></li>
            </ul>
        </div>
        </nav>
    );
};

export default Navbar;
    