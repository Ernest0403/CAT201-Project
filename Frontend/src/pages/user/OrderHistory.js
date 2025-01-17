import React, { useState } from "react";
import "./OrderHistory.css";
import UserSidebar from "../../Component/UserSidebar";

function Orders() {
  const [Orders, setOrders] = useState([
    {
      id: 123456,
      orderdate: "25/12/2024",
      orderDetails: {
        totalItems: 2,
        productPrice: 200,
        deliveryFee: 15,
        assemblyFee: 10,
        sst: 12,
        total: 237,
      },
      products: [
        { productId: 1, productName: 'Table', quantity: 10},
        { productId: 2, productName: 'Chair', quantity: 5 },
      ],
      cancellationDetails: {
        cancellationReason: null,
        cancellationDate: null,
      },
      arrivingdate: "30/12/2024",
      address: "Penang",
      price: "35.2",
      status: "Paid",
    },
    {
      id: 123457,
      orderdate: "25/12/2024",
      orderDetails: {
        totalItems: 1,
        productPrice: 150,
        deliveryFee: 10,
        assemblyFee: 0,
        sst: 9,
        total: 169,
      },
      products: [
        { productId: 3, productName: 'Cupboard', quantity: 1 },
      ],
      cancellationDetails: {
        cancellationReason: null,
        cancellationDate: null,
      },
      arrivingdate: "30/12/2024",
      address: "Penang",
      price: "150",
      status: "Shipping",
    },
    {
      id: 123458,
      orderdate: "25/12/2024",
      orderDetails: {
        totalItems: 1,
        productPrice: 100,
        deliveryFee: 10,
        assemblyFee: 5,
        sst: 7,
        total: 122,
      },
      products: [
        { productId: 4, productName: 'Bed', quantity: 1 },
      ],
      cancellationDetails: {
        cancellationReason: null,
        cancellationDate: null,
      },
      arrivingdate: "30/12/2024",
      address: "Penang",
      price: "100",
      status: "Received",
    },
    {
      id: 123459,
      orderdate: "25/12/2024",
      orderDetails: {
        totalItems: 1,
        productPrice: 80,
        deliveryFee: 5,
        assemblyFee: 0,
        sst: 5,
        total: 90,
      },
      products: [
        { productId: 5, productName: 'Drawer', quantity: 1 },
      ],
      cancellationDetails: {
        cancellationReason: 'item not match',
        cancellationDate: '1/12/2024',
      },
      arrivingdate: "30/12/2024",
      address: "Penang",
      price: "80",
      status: "Pending Refund",
    },
    {
      id: 123460,
      orderdate: "25/12/2024",
      orderDetails: {
        totalItems: 2,
        productPrice: 180,
        deliveryFee: 15,
        assemblyFee: 10,
        sst: 11,
        total: 216,
      },
      products: [
        { productId: 6, productName: 'Study Desk', quantity: 1 },
        { productId: 7, productName: 'Clock', quantity: 1 },
      ],
      arrivingdate: "30/12/2024",
      address: "Penang",
      price: "180",
      status: "Cancelled",
    },
  ]);

  const [view, setView] = useState({ type: "list", order: null });
  const [newComment, setNewComment] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [editRefundReason, setEditRefundReason] = useState("");

  const handleViewChange = (type, order = null) => {
    setView({ type, order });
  };

  const handleSubmitComment = (orderId) => {
    const updatedOrders = Orders.map(order =>
      order.id === orderId ? { ...order, comment: newComment } : order
    );
    setOrders(updatedOrders);
    setNewComment("");
    setView({ type: "list", order: null });
  };

  const handleSubmitRefund = (orderId) => {
    const updatedOrders = Orders.map(order =>
      order.id === orderId
        ? { ...order, cancellationDetails: { cancellationReason: refundReason, cancellationDate: new Date().toLocaleDateString() }, status:'Pending Refund'}
        : order
    );
    setOrders(updatedOrders);
    setRefundReason("");
    setView({ type: "list", order: null });
  };

  const handleEditRefund = (orderId) => {
    const updatedOrders = Orders.map(order =>
      order.id === orderId
        ? { ...order, cancellationDetails: { cancellationReason: editRefundReason, cancellationDate: new Date().toLocaleDateString() } }
        : order
    );
    setOrders(updatedOrders);
    setEditRefundReason("");
    setView({ type: "list", order: null });
  };

  return (
    <div className="DashboardContainer">
      <UserSidebar />
      <div className="OrderHistory">
        <div className="order-list">
          <h1>Orders</h1>
          {view.type === "list" ? (
            Orders.map((order) => (
              <div key={order.id} className="order-item">
                <div>Image</div>
                <div>
                  <h3>{order.products[0].productName}</h3>
                  <p>Order Number: {order.id}</p>
                  <p>Estimated Receiving Date: {order.arrivingdate}</p>
                </div>
                <div className="status">
                  <p>Status:</p>
                  <p><strong>{order.status}</strong></p>
  
                  {order.status === "Paid" || order.status === "Shipping" ? (
                    <div className="ButtonGroup">
                      <button className="BlueButton" onClick={() => handleViewChange("details", order)}>View Order</button>
                      <button className="RedButton" onClick={() => handleViewChange("cancel", order)}>Cancel</button>
                    </div>
                  ) : null}
  
                  {order.status === "Received" ? (
                    <div className="ButtonGroup">
                      <button className="BlueButton" onClick={() => handleViewChange("details", order)}>View Order</button>
                      <button className="BlueButton" onClick={() => handleViewChange("rate", order)}>Rate</button>
                      <button className="RedButton" onClick={() => handleViewChange("refund", order)}>Return & Refund</button>
                    </div>
                  ) : null}
  
                  {order.status === "Pending Refund" ? (
                    <div className="ButtonGroup">
                      <button className="BlueButton" onClick={() => handleViewChange("details", order)}>View Order</button>
                      <button className="BlueButton" onClick={() => handleViewChange("editRefund", order)}>Edit Refund</button>
                      <button className="RedButton" onClick={() => handleViewChange("cancelRefund", order)}>Cancel Refund</button>
                    </div>
                  ) : null}
  
                  {order.status === "Cancelled" ? (
                    <div className="ButtonGroup">
                      <button className="BlueButton" onClick={() => handleViewChange("details", order)}>View Order</button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : view.type === "details" && view.order ? (
            <div className="orderOperationContainer rowContainer">
              <div>
                <p><strong>Order ID:</strong> {view.order.id}</p>
                <p><strong>Order Date:</strong> {view.order.orderdate}</p>
                <p><strong>Arriving Date:</strong> {view.order.arrivingdate}</p>
                <p><strong>Address:</strong> {view.order.address}</p>
                <p><strong>Status:</strong> {view.order.status}</p>
                <p><strong>Price:</strong> {view.order.price}</p>
              </div>

              <div>
                <strong>Order Details:</strong>
                <div>
                  <p>Total Items: {view.order.orderDetails.totalItems}</p>
                  <p>Product Price: {view.order.orderDetails.productPrice}</p>
                  <p>Delivery Fee: {view.order.orderDetails.deliveryFee}</p>
                  <p>Assembly Fee: {view.order.orderDetails.assemblyFee}</p>
                  <p>SST: {view.order.orderDetails.sst}</p>
                  <p>Total: {view.order.orderDetails.total}</p>
                </div>
              </div>

              {view.order.cancellationDetails.cancellationReason && view.order.cancellationDetails.cancellationDate ? (
                <div>
                  <strong>Cancellation Details:</strong>
                  <div>
                    <p>Reason: {view.order.cancellationDetails.cancellationReason}</p>
                    <p>Date: {view.order.cancellationDetails.cancellationDate}</p>
                  </div>
                </div>
              ) : ('')}

              <button className="BlueButton smallButton" onClick={() => setView({ type: "list", order: null })}>Back to Orders</button>
            </div>
          ) : view.type === "cancel" && view.order ? (
            <div className="orderOperationContainer rowContainer">
              {view.order.status === 'Shipping' ? (
                <>
                  <p>Your item is already on its way and can't be canceled now.</p>
                  <button className="BlueButton" onClick={() => setView({ type: "list", order: null })}>Back to Orders</button>
                </>
              ) : (
                <>
                  <p>Do you really want to cancel the order?</p>
                  <div className="ButtonGroup">
                    <button className="RedButton" onClick={() => setView({ type: "list", order: null })}>Yes</button>
                    <button className="BlueButton" onClick={() => setView({ type: "list", order: null })}>Back to Orders</button>
                  </div>
                </>
              )}
            </div>
          ) : view.type === "rate" && view.order ? (
            <div className="orderOperationContainer columnContainer">
              <p><strong>What’s your star rating for this? </strong></p>
              <div>
                <p>Leave your comment here: </p>
                <input type="text" placeholder="comment here" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
              </div>
              <div className="ButtonGroup">
                <button className="RedButton" onClick={() => setView({ type: "list", order: null })}>Cancel</button>
                <button className="BlueButton" onClick={() => handleSubmitComment(view.order.id)}>Submit</button>
              </div>
            </div>
          ) : view.type === "refund" && view.order ? (
            <div className="orderOperationContainer columnContainer">
              <p><strong>Could you please provide the details for the refund?</strong></p>
              <div>
                <p>Please state your reason: </p>
                <input type="text" placeholder="reason" value={refundReason} onChange={(e) => setRefundReason(e.target.value)} />
              </div>
              <div className="ButtonGroup">
                <button className="RedButton" onClick={() => handleSubmitRefund(view.order.id)}>Submit</button>
                <button className="BlueButton" onClick={() => setView({ type: "list", order: null })}>Cancel</button>
              </div>
            </div>
          ) : view.type === "editRefund" && view.order ? (
            <div className="orderOperationContainer columnContainer">
              <p><strong>Could you please provide the details for the refund?</strong></p>
              <div>
                <p>Please state your reason: </p>
                <input type="text" placeholder="reason" value={editRefundReason} onChange={(e) => setEditRefundReason(e.target.value)} />
              </div>
              <div className="ButtonGroup">
                <button className="RedButton" onClick={() => handleEditRefund(view.order.id)}>Submit</button>
                <button className="BlueButton" onClick={() => setView({ type: "list", order: null })}>Cancel</button>
              </div>
            </div>
          ) : view.type === "cancelRefund" && view.order ? (
            <div className="orderOperationContainer rowContainer">
              <p>You have successfully canceled your refund request.</p>
              <div className="ButtonGroup">
                <button className="BlueButton" onClick={() => setView({ type: "list", order: null })}>Back to Orders</button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
