import './ManageProducts.css';
import { useState } from 'react';

const ManageProducts = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', image: 'delete.png', category: 'Category 1', quantity: 10, brand: '', dimension: '', weight: '', color: '', material: '', country: '', arrivalDate: '', warranty: '' },
    { id: 2, name: 'Item 2', image: 'edit.png', category: 'Category 2', quantity: 5, brand: '', dimension: '', weight: '', color: '', material: '', country: '', arrivalDate: '', warranty: '' },
  ]);

  const emptyProduct = {
    id: '',
    name: '',
    category: '',
    quantity: 0,
    brand: '',
    dimension: '',
    weight: '',
    color: '',
    material: '',
    country: '',
    arrivalDate: '',
    warranty: ''
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayTable, setDisplayTable] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState(emptyProduct);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const categories = [...new Set(items.map((item) => item.category)), 'Full List'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === 'Full List' ? null : category);
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  const handleQuantityEditClick = (item) => {
    setEditingItemId(item.id);
  };

  const handleQuantityChange = (e, itemId) => {
    const updatedQuantity = e.target.value;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: updatedQuantity } : item
      )
    );
  };

  const handleQuantityBlur = () => {
    setEditingItemId(null);
  };

  const handleEditClick = (item) => {
    setEditFormData(item);
    setDisplayTable(false);
  };

  const handleDeleteClick = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  }

  const handleAddProductClick = () => {
    setIsAddingProduct(true);
    setEditFormData(emptyProduct); 
    setDisplayTable(false); 
  }

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddItemClick = () => {
    if (items.some(item => item.id === editFormData.id)) {
      alert('This ID already exists. Please choose a different ID.');
      return;
    }
  
    setItems((prevItems) => [...prevItems, editFormData]);
  
    setEditFormData(emptyProduct);
    setDisplayTable(true);
    setIsAddingProduct(false);
  }

  const handleSave = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editFormData.id ? { ...editFormData } : item
      ));
    setEditFormData(emptyProduct);
    setDisplayTable(true);
  };

  const handleCancel = () => {
    setEditFormData(emptyProduct);
    setDisplayTable(true);
    setIsAddingProduct(false);
  };

  return (
    <div className='manageContainer'>
      {displayTable ? (
        <>
          <table>
            <thead>
              <tr>
                <td colSpan='5'>
                <div>
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryClick(category)}
                      className={selectedCategory === category ? 'selected-category' : ''}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                </td>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="5">No items available in this category.</td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className='border-left'>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      Stock:{' '}
                      {editingItemId === item.id ? (
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(e, item.id)}
                          onBlur={handleQuantityBlur}
                          autoFocus
                          className="quantityInput"
                        />
                      ) : (
                        <>
                          {item.quantity}{' '}
                          <input
                            type="button"
                            value="+/-"
                            className="quantityButton"
                            onClick={() => handleQuantityEditClick(item)}
                          />
                        </>
                      )}
                    </td>
                    <td>
                      <button type="button" onClick={() => handleEditClick(item)}>
                        <img src="/Images/edit.png" alt="Edit" />
                      </button>
                    </td>
                    <td className='border-right'>
                      <button type="button" onClick={() => handleDeleteClick(item.id)} >
                        <img src="/Images/delete.png" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <button className='btnContainer' type='button' onClick={handleAddProductClick}>
            Add Product
          </button>
        </>
      ) : (
        <div className="edit-form">
          <form>
            {Object.entries(editFormData).map(([key, value]) => (
              <div key={key} className="selection-container">
                <label htmlFor={key}>{key}:</label>
                <input
                  type={key === 'arrivalDate' ? 'date' : key === 'image' ? 'file' : 'text'}
                  id={key}
                  name={key}
                  value={key !== 'image' ? value : undefined}
                  onChange={handleFormInputChange}
                />
                {key === 'dimension' ? (
                  <label>cm</label>
                ) : key === 'weight' ? (
                  <label>kg</label>
                ) : key === 'warranty' ? (
                  <label>year</label>
                ) : (
                  ''
                )}
              </div>
            ))}
            <div className="form-actions">
            {isAddingProduct ?
             <button type="button" onClick={handleAddItemClick} className="saveorcancelbtn">
                Add Product
              </button>
               : <button type="button" onClick={handleSave} className="saveorcancelbtn">
               Save Changes
             </button>}
              
              <button type="button" onClick={handleCancel} className="saveorcancelbtn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
