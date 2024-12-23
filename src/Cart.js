import './Cart.css';
import React from 'react';
import Menubar from './Component/Menubar';
import Cartlist from './Component/Cartlist';

function Cart() {
  return (
    <>
      <div className='CartContainer'>
        <Menubar />
        <div className='CartView'>
          <div className='ItemList'>
            <Cartlist />
          </div>
          <div className='Summary'>
              <div className='SummaryTitle'>
                <p>SUMMARY</p>
              </div>
              <div className='SummaryBreakdown'>
                <div className='SubDetails'>Selected Item:</div>
                <div className='SubPrices'>2</div>
                <div className='SubDetails'>Product Price:</div>
                <div className='SubPrices'>106.35</div>
                <div className='SubDetails'>Assembly Fee:</div>
                <div className='SubPrices'>30.00</div>
              </div>
              <div className='line'></div>
              <div className='SummaryBreakdown'>
                <div className='SubTotalWord'>Subtotal:</div>
                <div className='SubTotal'>RM138.35</div>
              </div>
              <div className='line'></div>
              <button className='Checkout'>
                <div>Checkout</div>
              </button>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Cart;