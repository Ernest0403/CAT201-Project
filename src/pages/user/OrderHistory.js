import React,{useState} from 'react';
import './OrderHistory.css';
import UserSidebar from '../../Component/UserSidebar';

function Orders() {
    const [Orders] = useState([
        { id: 123456, product: "Chair", orderdate: "25/12/2024", arrivingdate: "30/12/2024", address: "Penang", price:"35.2", status: "Paid"},
        { id: 123456, product: "Chair", orderdate: "25/12/2024", arrivingdate: "30/12/2024", address: "Penang", price:"35.2", status: "Shipping"},
        { id: 123458, product: "Chair", orderdate: "25/12/2024", arrivingdate: "30/12/2024", address: "Penang", price:"35.2", status: "Received"},
        { id: 123459, product: "Chair", orderdate: "25/12/2024", arrivingdate: "30/12/2024", address: "Penang", price:"35.2", status: "Returned"},
        { id: 123460, product: "Chair", orderdate: "25/12/2024", arrivingdate: "30/12/2024", address: "Penang", price:"35.2", status: "Cancelled"},
      ]);

    return (
        <div className='DashboardContainer'>
            <UserSidebar />
            <div className="OrderHistory">
                <div className="order-list">
                    <h1>Orders</h1>
                    {Orders.map((order) => (
                        <div key={order.id} className="order-item">
                            <div>Image</div>
                            <div>
                                <h3>{order.product}</h3>
                                <p>Order Number: {order.id}</p>
                                <p>Estimated Receiving Date: {order.arrivingdate}</p>          
                            </div>
                            <div className='status'>
                                <p>Status:</p>
                                <p><strong>{order.status}</strong></p>
                                {order.status === "Paid" ? (
                                    <button className='RedButton'>Cancel</button>
                                ) : ("")}
                                {order.status === "Shipping" ? (
                                    <button className='RedButton'>Cancel</button>
                                ) : ("")}
                                {order.status === "Received" ? (
                                    <div className='ButtonGroup'>
                                        <button className='RedButton'>Return & Refund</button>
                                        <button className='BlueButton'>Rate</button>
                                    </div>
                                ) : ("")}                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>   
    );
}

export default Orders;