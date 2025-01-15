import React, {useEffect, useState} from 'react';
import './ManageOrders.css';
import Validation from "../../utils/Validation";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [displayTable, setDisplayTable] = useState(true);
  const [editOrderData, setEditOrderData] = useState({});
  const [originalId, setOriginalId] = useState(null);
  const [viewOrderDetails, setViewOrderDetails] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");


  useEffect(() => {
    fetch('http://localhost:8080/cat201_project_war/AdminOrder-servlet')
        .then(response => response.json())
        .then(data => { console.log(data); setOrders(data); })
        .catch(error => console.error('Error fetching orders:', error));
  }, []);

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => {
        setPopupMessage("");
        setPopupType("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  const statuses = ['Pending', 'Shipped', 'Completed', 'Cancelled', 'Full List'];

  const handleStatusClick = (status) => {
    setSelectedStatus(status === 'Full List' ? null : status);
  };

  const filteredOrders = selectedStatus
      ? orders.filter((order) => order.order_status === selectedStatus)
      : orders;

  const handleEditClick = (order) => {
    setEditOrderData(order);
    setOriginalId(order.order_id);
    setViewOrderDetails(null);
    setDisplayTable(false);
  };

  const handleViewClick = (order) => {
    setViewOrderDetails(order);
    setEditOrderData({});
    setDisplayTable(false);
  };

  const handleCancel = () => {
    setDisplayTable(true);
    setViewOrderDetails(null);
    setOriginalId(null);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setEditOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const validationResults = Validation.validateOrder(editOrderData);
    if (Validation.validateOrder(editOrderData) === true) {
      console.log("Order data is valid!");
      setPopupMessage([]);
      setPopupType("success")
    } else {
      console.log("Order validation failed.");
      setPopupMessage(validationResults.join("\n"));
      setPopupType("error");
      return;
    }

    const isIdUnique = orders.every(order => order.order_id !== editOrderData.order_id ||  order.order_id === originalId);

    if (!isIdUnique) {
      setPopupMessage("Id must be unique. Please provide a different Id.");
      setPopupType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/cat201_project_war/AdminOrder-servlet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          originalId: originalId, // Send order ID for update
          updatedOrder: editOrderData // Send the updated order details
        })
      });
      console.log(originalId);
      if (!response.ok) {
        throw new Error("Failed to update order.");
      }

      // Update local state only if the request was successful
      setOrders((prevOrders) =>
          prevOrders.map((order) =>
              order.order_id === editOrderData.order_id ? { ...editOrderData } : order
          )
      );

      setEditOrderData({});
      setDisplayTable(true);
      setOriginalId(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
      <div className='manageContainer responsive-table'>
        <h1>Order</h1>
        {displayTable ? (
            <>
              <table>
                <thead>
                <tr>
                  <th colSpan='4'>
                    <div>
                      {statuses.map((status) => (
                          <button
                              key={status}
                              type='button'
                              onClick={() => handleStatusClick(status)}
                              className={selectedStatus === status ? 'selected-status' : ''}
                          >
                            {status}
                          </button>
                      ))}
                    </div>
                  </th>
                </tr>
                </thead>
                <tbody>
                {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan='4'>No orders available in this status.</td>
                    </tr>
                ) : (
                    filteredOrders.map((order) => (
                        <tr key={order.order_id}>
                          <td className='border-left'>{order.order_id}</td>
                          <td>{order.order_orderNumber}</td>
                          <td>{order.order_status}</td>
                          <td className='border-right'>
                            {['Pending', 'Shipped'].includes(order.order_status) && (
                                <button type='button' onClick={() =>handleEditClick(order)} >
                                  <img src='/Images/edit.png' alt='Edit' />
                                </button>
                            )}
                            <button type='button' onClick={() =>handleViewClick(order)} >
                              <img src='/Images/view.png' alt='View' />
                            </button>
                          </td>
                        </tr>
                    ))
                )}
                </tbody>
              </table>
            </>
        ) : viewOrderDetails ? (
            <>
              <div className='view-order-details'>
                <table>
                  <tbody>
                  {/* Order Number */}
                  <tr>
                    <td>  Order Number:  </td>
                    <td>{ viewOrderDetails.order_orderNumber}</td>
                  </tr>

                  {/* Customer Information */}
                  <tr>
                    <td>  Username:  </td>
                    <td>{ viewOrderDetails.order_customer.username}</td>
                  </tr>
                  <tr>
                    <td>  Contact:  </td>
                    <td>{ viewOrderDetails.order_customer.contactNumber}</td>
                  </tr>
                  <tr>
                    <td>  Address:  </td>
                    <td>{ viewOrderDetails.order_customer.address}</td>
                  </tr>

                  { viewOrderDetails.order_products.map((product, index) => (
                      <React.Fragment key={product.productId}>
                        <tr>
                          <td>Product {index + 1} ID: </td>
                          <td>{product.productId}</td>
                        </tr>
                        <tr>
                          <td>Product {index + 1} Quantity: </td>
                          <td>{product.quantity}</td>
                        </tr>
                      </React.Fragment>
                  ))}

                  {/* Order Details */}
                  <tr>
                    <td>  Total Items:  </td>
                    <td>{ viewOrderDetails.order_orderDetails.totalItems}</td>
                  </tr>
                  <tr>
                    <td>  Product Price:  </td>
                    <td> { viewOrderDetails.order_orderDetails.productPrice}</td>
                  </tr>
                  <tr>
                    <td>  Delivery Fee:  </td>
                    <td> { viewOrderDetails.order_orderDetails.deliveryFee}</td>
                  </tr>
                  <tr>
                    <td>  Assembly Fee:  </td>
                    <td> { viewOrderDetails.order_orderDetails.assemblyFee}</td>
                  </tr>
                  <tr>
                    <td>  SST:  </td>
                    <td> { viewOrderDetails.order_orderDetails.sst}</td>
                  </tr>
                  <tr>
                    <td>  Total:  </td>
                    <td> { viewOrderDetails.order_orderDetails.total}</td>
                  </tr>

                  {/* Payment Details */}
                  <tr>
                    <td>  Payment Type:  </td>
                    <td>{ viewOrderDetails.order_paymentDetails.paymentType}</td>
                  </tr>
                  <tr>
                    <td>  Payment Status:  </td>
                    <td>{ viewOrderDetails.order_paymentDetails.paymentStatus}</td>
                  </tr>

                  {/* Cancellation Details */}
                  { viewOrderDetails.order_cancellationDetails.cancellationReason ? (
                      <>
                        <tr>
                          <td>  Cancellation Reason:  </td>
                          <td>{ viewOrderDetails.order_cancellationDetails.cancellationReason}</td>
                        </tr>
                        <tr>
                          <td>  Cancellation Date:  </td>
                          <td>{ viewOrderDetails.order_cancellationDetails.cancellationDate}</td>
                        </tr>
                      </>
                  ) : (
                      <tr>
                        <td>  Cancellation:  </td>
                        <td>No cancellation</td>
                      </tr>
                  )}

                  {/* Order Date */}
                  <tr>
                    <td>  Order Date:  </td>
                    <td>{ viewOrderDetails.order_orderDate}</td>
                  </tr>

                  {/* Status */}
                  <tr>
                    <td>  Status:  </td>
                    <td>{ viewOrderDetails.order_status}</td>
                  </tr>
                  <tr className='back2ListBtn'>
                    <td colSpan='2'>
                      <button type='button' onClick={handleCancel} className='saveorcancelbtn'>
                        Back To List
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </>
        ) : (
            <>
              <div className='edit-form'>
                <form>
                  <div className='selection-container'>
                    <label htmlFor='order_orderNumber'>Order Number:</label>
                    <input
                        type='text'
                        id='order_orderNumber'
                        name='order_orderNumber'
                        value={editOrderData.order_orderNumber}
                        onChange={handleFormInputChange}
                    />
                  </div>
                  <div className='selection-container'>
                    <label htmlFor='order_status'>Status:</label>
                    <select
                        id='order_status'
                        name='order_status'
                        value={editOrderData.order_status}
                        onChange={handleFormInputChange}
                    >
                      <option value='Pending'>Pending</option>
                      <option value='Shipped'>Shipped</option>
                      <option value='Completed'>Completed</option>
                      <option value='Cancelled'>Cancelled</option>
                    </select>
                  </div>
                  <div className='selection-container'>
                    <label htmlFor='order_orderDate'>Order Date:</label>
                    <input
                        type='date'
                        id='order_orderDate'
                        name='order_orderDate'
                        value={editOrderData.order_orderDate}
                        onChange={handleFormInputChange}
                    />
                  </div>
                  <div className='selection-container'>
                    <label htmlFor='paymentStatus'>Payment Status:</label>
                    <select
                        id='paymentStatus'
                        name='paymentStatus'
                        value={editOrderData.order_paymentDetails.paymentStatus}
                        onChange={(e) => setEditOrderData({ ...editOrderData, order_paymentDetails: { ...editOrderData.order_paymentDetails, paymentStatus: e.target.value } })}
                    >
                      <option value='Completed'>Completed</option>
                      <option value='Pending'>Pending</option>
                      <option value='Failed'>Failed</option>
                    </select>
                  </div>

                  <div className='form-actions'>
                    <button type='button' onClick={handleSave} className='saveorcancelbtn'>
                      Save Changes
                    </button>
                    <button type='button' onClick={handleCancel} className='saveorcancelbtn'>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
        )}

        {popupMessage && (
            <div
                className={`PopupBox ${popupType === "error" ? "PopupError" : "PopupSuccess"}`}
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  zIndex: 1000,
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  whiteSpace: "pre-line"
                }}
            >
              <h3>{popupType === "error" ? "Error" : "Success"}</h3>
              <p>{popupMessage}</p>
            </div>
        )}

      </div>
  );
};

export default ManageOrders;