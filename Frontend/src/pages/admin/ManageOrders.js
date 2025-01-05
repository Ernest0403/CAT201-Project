import React, { useState } from 'react';
import './ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD001',
      customer: {
        username: 'customer1',
        contactNumber: '123-456-7890',
        address: '123 Main St, City, Country',
      },
      products: [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 5 },
      ],
      orderDetails: {
        totalItems: 2,
        productPrice: 200,
        deliveryFee: 15,
        assemblyFee: 10,
        sst: 12,
        total: 237,
      },
      paymentDetails: {
        paymentType: 'Credit Card',
        paymentStatus: 'Completed',
      },
      cancellationDetails: {
        cancellationReason: null,
        cancellationDate: null,
      },
      status: 'Pending',
      orderDate: '2024-12-26',
    },
    {
      id: 2,
      orderNumber: 'ORD002',
      customer: {
        username: 'customer2',
        contactNumber: '987-654-3210',
        address: '456 Elm St, City, Country',
      },
      products: [
        { productId: 3, quantity: 3 },
      ],
      orderDetails: {
        totalItems: 1,
        productPrice: 75,
        deliveryFee: 10,
        assemblyFee: 5,
        sst: 7.5,
        total: 97.5,
      },
      paymentDetails: {
        paymentType: 'PayPal',
        paymentStatus: 'Completed',
      },
      cancellationDetails: {
        cancellationReason: 'Out of stock',
        cancellationDate: '2024-12-24',
      },
      status: 'Completed',
      orderDate: '2024-12-25',
    },
    {
      id: 3,
      orderNumber: 'ORD021',
      customer: {
        username: 'customer3',
        contactNumber: '123-456-7890',
        address: '123 Main St, City, Country',
      },
      products: [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 5 },
      ],
      orderDetails: {
        totalItems: 2,
        productPrice: 200,
        deliveryFee: 15,
        assemblyFee: 10,
        sst: 12,
        total: 237,
      },
      paymentDetails: {
        paymentType: 'Credit Card',
        paymentStatus: 'Completed',
      },
      cancellationDetails: {
        cancellationReason: null,
        cancellationDate: null,
      },
      status: 'Pending',
      orderDate: '2024-12-26',
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState(null); 
  const [displayTable, setDisplayTable] = useState(true);
  const [editOrderData, setEditOrderData] = useState({});
  const [viewOrderDetails, setViewOrderDetails] = useState(null); 

  const statuses = ['Pending', 'Shipped', 'Completed', 'Cancelled', 'Full List'];

  const handleStatusClick = (status) => {
    setSelectedStatus(status === 'Full List' ? null : status);
  };

  const filteredOrders = selectedStatus
    ? orders.filter((order) => order.status === selectedStatus)
    : orders;

  const handleEditClick = (order) => {
    setEditOrderData(order);
    setDisplayTable(false);
  };

  const handleViewClick = (order) => {
    setViewOrderDetails(order); 
    setDisplayTable(false);
  };

  const handleCancel = () => {
    setDisplayTable(true);
    setViewOrderDetails(null);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setEditOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === editOrderData.id ? { ...editOrderData } : order
      )
    );
    setDisplayTable(true);
  };

  return (
    <div className='manageContainer'>
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
                  <tr key={order.id}>
                    <td className='border-left'>{order.id}</td>
                    <td>{order.orderNumber}</td>
                    <td>{order.status}</td>
                    <td className='border-right'>
                      {['Pending', 'Shipped'].includes(order.status) && (
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
            <h2>Order Details</h2>
            <table>
            <tbody>
              {/* Order Number */}
              <tr>
                <td>  Order Number:  </td>
                <td>{ viewOrderDetails.orderNumber}</td>
              </tr>

              {/* Customer Information */}
              <tr>
                <td>  Username:  </td>
                <td>{ viewOrderDetails.customer.username}</td>
              </tr>
              <tr>
                <td>  Contact:  </td>
                <td>{ viewOrderDetails.customer.contactNumber}</td>
              </tr>
              <tr>
                <td>  Address:  </td>
                <td>{ viewOrderDetails.customer.address}</td>
              </tr>

              { viewOrderDetails.products.map((product, index) => (
<>
    <tr>
      <td>Product {index + 1} ID: </td>
      <td>{product.productId}</td>
    </tr>
    <tr>
      <td>Product {index + 1} Quantity: </td>
      <td>{product.quantity}</td>
    </tr>
    </>
))}

              {/* Order Details */}
              <tr>
                <td>  Total Items:  </td>
                <td>{ viewOrderDetails.orderDetails.totalItems}</td>
              </tr>
              <tr>
                <td>  Product Price:  </td>
                <td> { viewOrderDetails.orderDetails.productPrice}</td>
              </tr>
              <tr>
                <td>  Delivery Fee:  </td>
                <td> { viewOrderDetails.orderDetails.deliveryFee}</td>
              </tr>
              <tr>
                <td>  Assembly Fee:  </td>
                <td> { viewOrderDetails.orderDetails.assemblyFee}</td>
              </tr>
              <tr>
                <td>  SST:  </td>
                <td> { viewOrderDetails.orderDetails.sst}</td>
              </tr>
              <tr>
                <td>  Total:  </td>
                <td> { viewOrderDetails.orderDetails.total}</td>
              </tr>

              {/* Payment Details */}
              <tr>
                <td>  Payment Type:  </td>
                <td>{ viewOrderDetails.paymentDetails.paymentType}</td>
              </tr>
              <tr>
                <td>  Payment Status:  </td>
                <td>{ viewOrderDetails.paymentDetails.paymentStatus}</td>
              </tr>

              {/* Cancellation Details */}
              { viewOrderDetails.cancellationDetails.cancellationReason ? (
                <>
                  <tr>
                    <td>  Cancellation Reason:  </td>
                    <td>{ viewOrderDetails.cancellationDetails.cancellationReason}</td>
                  </tr>
                  <tr>
                    <td>  Cancellation Date:  </td>
                    <td>{ viewOrderDetails.cancellationDetails.cancellationDate}</td>
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
                <td>{ viewOrderDetails.orderDate}</td>
              </tr>

              {/* Status */}
              <tr>
                <td>  Status:  </td>
                <td>{ viewOrderDetails.status}</td>
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
                <label htmlFor='orderNumber'>Order Number:</label>
                <input
                  type='text'
                  id='orderNumber'
                  name='orderNumber'
                  value={editOrderData.orderNumber}
                  onChange={handleFormInputChange}
                />
              </div>
              <div className='selection-container'>
                <label htmlFor='status'>Status:</label>
                <select
                  id='status'
                  name='status'
                  value={editOrderData.status}
                  onChange={handleFormInputChange}
                  disabled={['Completed', 'Cancelled'].includes(editOrderData.status)}
                >
                  <option value='Pending'>Pending</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Completed'>Completed</option>
                  <option value='Cancelled'>Cancelled</option>
                </select>
              </div>
              <div className='selection-container'>
                <label htmlFor='orderDate'>Order Date:</label>
                <input
                  type='date'
                  id='orderDate'
                  name='orderDate'
                  value={editOrderData.orderDate}
                  onChange={handleFormInputChange}
                />
              </div>
              <div className='selection-container'>
                <label htmlFor='paymentStatus'>Payment Status:</label>
                <select
                  id='paymentStatus'
                  name='paymentStatus'
                  value={editOrderData.paymentDetails.paymentStatus}
                  onChange={(e) => setEditOrderData({ ...editOrderData, paymentDetails: { ...editOrderData.paymentDetails, paymentStatus: e.target.value } })}
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
    </div>
  );
};

export default ManageOrders;
