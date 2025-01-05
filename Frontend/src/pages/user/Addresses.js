import React, { useState } from 'react';
import './Addresses.css';
import UserSidebar from '../../Component/UserSidebar';

function Addresses() {
  // States to hold the actual addresses
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  // States to control whether the forms (modals) are open
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);

  // Temporary states to capture form input
  const [tempBilling, setTempBilling] = useState('');
  const [tempShipping, setTempShipping] = useState('');

  // Show success message pop-up
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handlers to open the modals
  const handleAddBillingAddress = () => {
    setTempBilling(billingAddress);
    setShowBillingForm(true);
  };

  const handleAddShippingAddress = () => {
    setTempShipping(shippingAddress);
    setShowShippingForm(true);
  };

  // Save and close modals
  const saveBillingAddress = () => {
    setBillingAddress(tempBilling);
    setShowBillingForm(false);
    showSaveSuccessPopup();
  };

  const saveShippingAddress = () => {
    setShippingAddress(tempShipping);
    setShowShippingForm(false);
    showSaveSuccessPopup();
  };

  // Cancel out of the forms
  const cancelBilling = () => {
    setShowBillingForm(false);
  };

  const cancelShipping = () => {
    setShowShippingForm(false);
  };

  // Show a 3-second success message
  const showSaveSuccessPopup = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="DashboardContainer">
      <UserSidebar />

      <div className="AddressesContent">
        <h2>
          The following addresses will be used on the checkout page by default.
        </h2>
        <div className="AddressesRow">
          {/* Billing Address */}
          <div className="AddressColumn">
            <h3>Billing Address</h3>
            {billingAddress ? (
              <div>
                <p>{billingAddress}</p>
                <button 
                  className="EditButton" 
                  onClick={handleAddBillingAddress}
                >
                  Edit Billing Address
                </button>
              </div>
            ) : (
              <button 
                className="AddButton" 
                onClick={handleAddBillingAddress}
              >
                Add Billing Address
              </button>
            )}
          </div>

          {/* Shipping Address */}
          <div className="AddressColumn">
            <h3>Shipping Address</h3>
            {shippingAddress ? (
              <div>
                <p>{shippingAddress}</p>
                <button 
                  className="EditButton" 
                  onClick={handleAddShippingAddress}
                >
                  Edit Shipping Address
                </button>
              </div>
            ) : (
              <button 
                className="AddButton" 
                onClick={handleAddShippingAddress}
              >
                Add Shipping Address
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal / Pop-up for Billing Address */}
      {showBillingForm && (
        <div className="ModalBackdrop">
          <div className="ModalContent">
            <h4>Enter Billing Address</h4>
            <textarea
              value={tempBilling}
              onChange={(e) => setTempBilling(e.target.value)}
              rows="4"
              placeholder="Enter billing address here..."
            />
            <div className="ButtonGroup">
              <button className="SaveButton" onClick={saveBillingAddress}>
                Save
              </button>
              <button className="CancelButton" onClick={cancelBilling}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal / Pop-up for Shipping Address */}
      {showShippingForm && (
        <div className="ModalBackdrop">
          <div className="ModalContent">
            <h4>Enter Shipping Address</h4>
            <textarea
              value={tempShipping}
              onChange={(e) => setTempShipping(e.target.value)}
              rows="4"
              placeholder="Enter shipping address here..."
            />
            <div className="ButtonGroup">
              <button className="SaveButton" onClick={saveShippingAddress}>
                Save
              </button>
              <button className="CancelButton" onClick={cancelShipping}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Pop-up (3 seconds) */}
      {showSuccessMessage && (
        <div className="SuccessPopup">
          <h2 className="SuccessTitle">Success</h2>
          <p>Address saved successfully!</p>
        </div>
      )}
    </div>
  );
}

export default Addresses;


