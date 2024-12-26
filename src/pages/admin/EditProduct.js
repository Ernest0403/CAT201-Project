import React from 'react'
import './EditProduct.css';

function EditProduct() {
    return(
        <>
            <form>
                <div className='selection-container'>
                    <label htmlFor='name'>Item Id:</label>
                    <input type='text' id='name' name='name' />
                </div>
                <div className='selection-container'>
                    <label htmlFor='category'>Item Category: </label>
                    <input type='text' id='category' name='category' />
                </div>
                <div className='selection-container'>
                    <label htmlFor='brand'>Brand: </label>
                    <input type='text' id='brand' name='brand' />
                </div>
                <div className='selection-container'>
                    <label htmlFor='dimension'>Dimension: </label>
                    <input type='text' id='dimension' name='dimension' />
                    <label>cm</label>
                </div>
                <div className='selection-container'>
                    <label htmlFor='weight'>Weight: </label>
                    <input type='text' id='weight' name='weight' />
                    <label>kg</label>
                </div>
                <div className='selection-container'>
                    <label htmlFor='colour'>Colour: </label>
                    <input type='text' id='colour' name='colour' />
                </div>
                <div className='selection-container'>
                    <label htmlFor='material'>Material: </label>
                    <input type='text' id='material' name='material' />
                </div>
                <div className='selection-container'>
                    <label htmlFor='manufacturing-country'>Manufacturing Country: </label>
                    <input type='text' id='manufacturing-country' name='manufacturing-country' />
                </div>
                <div className='selection-container'>
                    <label htmlFor='arriaval-date'>Arrival Date: </label>
                    <input type='date' id='arriaval-date' name='arriaval-date' />
                </div>
                <div className='selection-container'>
                    <label htmlFor='stock-quantity'>Stock Quantity: </label>
                    <input type='text' id='stock-quantity' name='stock-quantity' />
                </div>
                <div className='selection-container'>
                    <label htmlFor='warranty'>Warranty: </label>
                    <input type='text' id='warranty' name='warranty' />
                    <label>year</label>
                </div>
                <button type='submit' className='save-changes'>Save Changes</button>  
            </form>
        </>
    )
}

export default EditProduct;