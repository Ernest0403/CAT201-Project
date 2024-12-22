import './Cart.css';
import React from 'react';
import Menubar from './Component/Menubar';

function Cart() {
  return (
    <>
      <div className='CartContainer'>
        <Menubar />
        <div className='CartView'>
          <div className='ItemList'>
            <p>Hi</p>
          </div>
          <div className='Summary'>
              <p>Hi</p>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Cart;