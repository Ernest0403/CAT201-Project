import React from 'react';
import './UserSidebar.css'; 

function UserSidebar() {
    return(
        <>
        <nav className='SidebarNav'>
            <h3>My Account</h3>
            <button className='SidebarButton'>Dashboard</button>
            <button className='SidebarButton'>Account Details</button>
            <button className='SidebarButton'>Orders</button>
            <button className='SidebarButton'>Addresses</button>
            <button className='SidebarButton'>Log out</button>
        </nav>
        </>
    )
}

export default UserSidebar;