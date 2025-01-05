import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSidebar.css'; 

function UserSidebar() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    //Colapsible sidebar
    const [OpenState, setOpen] = useState(false);

    const handleSidebar = () => {
        OpenState === false ? setOpen(true) : setOpen(false)
    }

    return (
        <>
            {OpenState ? 
            <nav className="SidebarNav">
                <h3>My Account</h3>
                <button className='SidebarButton' onClick={() => handleNavigation('/user-dashboard')}>Dashboard</button>
                <button className='SidebarButton' onClick={() => handleNavigation('/account-details')}>Account Details</button>
                <button className='SidebarButton' onClick={() => handleNavigation('/orders')}>Orders</button>
                <button className='SidebarButton' onClick={() => handleNavigation('/addresses')}>Addresses</button>
                <button className='SidebarButton' onClick={() => handleNavigation('/login')}>Log out</button>
                <button className='SidebarNav-collapsed' onClick={handleSidebar}>{'<<'}</button>
            </nav>
            : 
            <button className='SidebarNav-collapsed' onClick={handleSidebar}>{'>>'}</button>}
            
        </>
    );
}

export default UserSidebar;
