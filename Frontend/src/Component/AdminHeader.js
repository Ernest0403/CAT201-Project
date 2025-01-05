import './AdminHeader.css';
import React from 'react';

function AdminHeader(){
    return(
        <>
            <div className = "Menubar-flex">
                <div><p>ComfortZone</p></div>
                <div><p>ADMIN DASHBOARD</p></div>
                <div><p>User count: </p></div>
                <div><p>Total: </p></div>
                <div><p>Currently online: </p> </div>
                <div className='AdminIcon'>
                    <img src={"/Images/accounticon.png"} alt='' />
                    <p>Username</p>
                </div>
            </div>  
        </>
    );
}

export default AdminHeader;