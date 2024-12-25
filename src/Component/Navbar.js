import './Navbar.css';

function Navbar(){
    return(
        <nav className="navigation">
        <div className="nav-background">
            <ul className="nav-links">
                <li><a href="#living-room">Living Room</a></li>
                <li><a href="#bedroom">Bedroom</a></li>
                <li><a href="#kitchen">Kitchen and Dining Room</a></li>
                <li><a href="#home-office">Home Office</a></li>
                <li><a href="#about-us">About Us</a></li>
                <li><a href="#terms">Terms and Conditions</a></li>
            </ul>
        </div>
        </nav>
    );
};

export default Navbar;
    