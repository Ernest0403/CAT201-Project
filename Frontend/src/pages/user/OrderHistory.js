import React, { useState, useEffect } from 'react';
import "./OrderHistory.css";
import UserSidebar from "../../Component/UserSidebar";

function Orders() {
  const [Orders, setOrders] = useState([]);
  const [view, setView] = useState({ type: "list", order: null });
  const [newComment, setNewComment] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [editRefundReason, setEditRefundReason] = useState("");
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/cat201_project_war/UserOrders-servlet')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        data.forEach(order => {
          const productSku = order.order_products.productSku || order.order_products[0].productSku;
          if (productSku) {
            fetchProductDetails(productSku, order.order_id);
          }
        });
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const fetchProductDetails = (productSku, orderId) => {
    fetch(`http://localhost:8080/cat201_project_war/Product-servlet?sku=${productSku}`)
      .then((response) => response.json())
      .then((data) => {
        const product = data.find(item => item.product_sku === productSku);
        if (product) {
          setProductDetails(prevState => ({
            ...prevState,
            [orderId]: product
          }));
        } else {
            console.error(`Product with SKU ${productSku} not found`);
        }
      })
      .catch((error) => console.error("Error fetching product details:", error));
  };

  const handleViewChange = (type, order = null) => {
    setView({ type, order });
  };

  async function handleSubmitComment(orderId, updatedOrder) {
    updatedOrder = Orders.find(order => order.order_id === orderId);
    updatedOrder.order_comment = newComment;

    fetch(`http://localhost:8080/cat201_project_war/UserOrders-servlet?id=${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalId: orderId,
        updatedOrder: updatedOrder,
      }),
    })
      .then((response) => {
        if (response.ok) {
          const updatedOrders = Orders.map(order =>
            order.order_id === orderId ? updatedOrder : order
          );
          setOrders(updatedOrders);
          setNewComment("");
          setView({ type: "list", order: null });
        } else {
          console.error("Failed to update comment");
        }
      })
      .catch((error) => console.error("Error updating comment:", error));
  };

  async function handleSubmitRefund(orderId, updatedOrder) {
    updatedOrder = Orders.find(order => order.order_id === orderId);
    updatedOrder.order_cancellationDetails = {
      cancellationReason: refundReason,
      cancellationDate: new Date().toLocaleDateString(),
    };
    updatedOrder.order_status = "Pending Refund";

    fetch(`http://localhost:8080/cat201_project_war/UserOrders-servlet?id=${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalId: orderId,
        updatedOrder: updatedOrder,
      }),
    })
      .then((response) => {
        if (response.ok) {
          const updatedOrders = Orders.map(order =>
            order.order_id === orderId ? updatedOrder : order
          );
          setOrders(updatedOrders);
          setRefundReason("");
          setView({ type: "list", order: null });
        } else {
          console.error("Failed to submit refund");
        }
      })
      .catch((error) => console.error("Error submitting refund:", error));
  };

  async function handleEditRefund(orderId, updatedOrder) {
    updatedOrder = Orders.find((order) => order.order_id === orderId);
    updatedOrder.order_cancellationDetails = {
      cancellationReason: editRefundReason,
      cancellationDate: new Date().toLocaleDateString(),
    };

    fetch(`http://localhost:8080/cat201_project_war/UserOrders-servlet?id=${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalId: orderId,
        updatedOrder: updatedOrder,
      }),
    })
      .then((response) => {
        if (response.ok) {
          const updatedOrders = Orders.map((order) =>
            order.order_id === orderId ? updatedOrder : order
          );
          setOrders(updatedOrders);
          setEditRefundReason("");
          setView({ type: "list", order: null });
        } else {
          console.error("Failed to edit refund");
        }
      })
      .catch((error) => console.error("Error editing refund:", error));
  };

  async function handleCancelRefund(orderId, updatedOrder) {
    updatedOrder = Orders.find(order => order.order_id === orderId);
    updatedOrder.order_status = "Received";

    fetch(`http://localhost:8080/cat201_project_war/UserOrders-servlet?id=${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalId: orderId,
        updatedOrder: updatedOrder,
      }),
    })
      .then((response) => {
        if (response.ok) {
          const updatedOrders = Orders.map((order) =>
            order.order_id === orderId ? updatedOrder : order
          );
          setOrders(updatedOrders);
          setEditRefundReason("");
          setView({ type: "list", order: null });
        } else {
          console.error("Failed to cancel refund");
        }
      })
      .catch((error) => console.error("Error canceling refund:", error));
  };

  return (
    <div className="DashboardContainer">
      <UserSidebar />
      <div className="OrderHistory">
        <div className="order-list">
          <h1>Orders</h1>
          {view.type === "list" ? (
            Orders.map((order) => (
              <div key={order.order_id} className="order-item">
                {productDetails[order.order_id] ? (
                  <>
                    <img src={productDetails[order.order_id].product_src} alt={productDetails[order.order_id].product_name} />
                    <h3>{productDetails[order.order_id].product_name}</h3>
                  </>
                ) : (
                  <p>Loading product details...</p>
                )}
                <div>
                  <p>Order Number: {order.order_id}</p>
                  <p>Estimated Receiving Date: {order.order_arrivingDate}</p>
                </div>
                <div className="status">
                  <p>Status:</p>
                  <p><strong>{order.order_status}</strong></p>

                  {order.order_status === "Paid" || order.order_status === "Shipping" ? (
                    <div className="ButtonGroup">
                      <button className="BlueButton" onClick={() => handleViewChange("details", order)}>View Order</button>
                      <button className="RedButton" onClick={() => handleViewChange("cancel", order)}>Cancel</button>
                    </div>
                  ) : null}

                  {order.order_status === "Received" ? (
                    <div className="ButtonGroup">
                      <button className="BlueButton" onClick={() => handleViewChange("details", order)}>View Order</button>
                      <button className="BlueButton" onClick={() => handleViewChange("rate", order)}>Rate</button>
                      <button className="RedButton" onClick={() => handleViewChange("refund", order)}>Return & Refund</button>
                    </div>
                  ) : null}

                  {order.order_status === "Pending Refund" ? (
                    <div className="ButtonGroup">
                      <button className="BlueButton" onClick={() => handleViewChange("details", order)}>View Order</button>
                      <button className="BlueButton" onClick={() => handleViewChange("editRefund", order)}>Edit Refund</button>
                      <button className="RedButton" onClick={() => handleViewChange("cancelRefund", order)}>Cancel Refund</button>
                    </div>
                  ) : null}

                  {order.order_status === "Cancelled" ? (
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
                <p><strong>Order ID:</strong> {view.order.order_id}</p>
                <p><strong>Order Date:</strong> {view.order.order_orderDate}</p>
                <p><strong>Arriving Date:</strong> {view.order.order_arrivingDate}</p>
                <p><strong>Address:</strong> {view.order.order_customer.address}</p>
                <p><strong>Status:</strong> {view.order.order_status}</p>
                <p><strong>Price:</strong> {view.order.order_orderDetails.total}</p>
              </div>

              <div>
                <strong>Order Details:</strong>
                <div>
                  <p>Total Items: {view.order.order_orderDetails.totalItems}</p>
                  <p>Product Price: {view.order.order_orderDetails.productPrice}</p>
                  <p>Delivery Fee: {view.order.order_orderDetails.deliveryFee}</p>
                  <p>Assembly Fee: {view.order.order_orderDetails.assemblyFee}</p>
                  <p>SST: {view.order.order_orderDetails.sst}</p>
                  <p>Total: {view.order.order_orderDetails.total}</p>
                </div>
              </div>

              {view.order.order_cancellationDetails.cancellationReason && view.order.order_cancellationDetails.cancellationDate ? (
                <div>
                  <strong>Cancellation Details:</strong>
                  <div>
                    <p>Reason: {view.order.order_cancellationDetails.cancellationReason}</p>
                    <p>Date: {view.order.order_cancellationDetails.cancellationDate}</p>
                  </div>
                </div>
              ) : ('')}

              <button className="BlueButton smallButton" onClick={() => setView({ type: "list", order: null })}>Back to Orders</button>
            </div>
          ) : view.type === "cancel" && view.order ? (
            <div className="orderOperationContainer rowContainer">
              {view.order.order_status === 'Shipping' ? (
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
                <button className="BlueButton" onClick={() => handleSubmitComment(view.order.order_id)}>Submit</button>
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
                <button className="RedButton" onClick={() => handleSubmitRefund(view.order.order_id)}>Submit</button>
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
                <button className="RedButton" onClick={() => handleEditRefund(view.order.order_id)}>Submit</button>
                <button className="BlueButton" onClick={() => setView({ type: "list", order: null })}>Cancel</button>
              </div>
            </div>
          ) : view.type === "cancelRefund" && view.order ? (
            <div className="orderOperationContainer rowContainer">
              <p>You have successfully canceled your refund request.</p>
              <div className="ButtonGroup">
                <button className="BlueButton" onClick={() => handleCancelRefund(view.order.order_id)}>Back to Orders</button>
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
