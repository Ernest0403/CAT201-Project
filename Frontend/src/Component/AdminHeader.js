import './AdminHeader.css';
import React from 'react';

function AdminHeader(){
    return(
        <>
            <div className = "Menubar-flex">
                <div><p>ComfortZone</p></div>
                <div><p>ADMIN DASHBOARD</p></div>
                <div><p>User count: 108</p></div>
                <div><p>Total: 5566 </p></div>
                <div><p>Currently online: 235</p> </div>
                <div className='AdminIcon'>
                    <img src={"/Images/accounticon.png"} alt='' />
                    <p>Username</p>
                </div>
            </div>  
        </>
    );
}

export default AdminHeader;