import './ManageProducts.css';
import Validation from "../../utils/Validation";
import { useState, useEffect } from 'react';

const ManageProducts = () => {

  const emptyProduct = {
    product_sku: '',
    product_name: '',
    product_src: '',
    product_roomCategory: '',
    product_itemCategory: '',
    product_brand: '',
    product_dimension: '',
    product_weight: '',
    product_colour: '',
    product_material: '',
    product_manufacturer: '',
    product_arrivalDate: '',
    product_quantity: 0,
    product_price: 0.0,
    product_discount: 0.0,
    product_warranty: '',
    product_discountedPrice: '',
    product_orderVolume: 0
  };

  const [items, setItems] = useState([]);
  const [editFormData, setEditFormData] = useState(emptyProduct);
  const [originalSku, setOriginalSku] = useState(null); // To store the original SKU
  const [displayTable, setDisplayTable] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingItemSku, setEditingItemSku] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/cat201_project_war/AdminProduct-servlet')
        .then(response => response.json())
        .then(data => { console.log(data); setItems(data); })
        .catch(error => console.error('Error fetching products:', error));
  }, []);

  const categories = [...new Set(items.map(item => item.product_roomCategory)), 'Full List'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === 'Full List' ? null : category);
  };

  const filteredItems = selectedCategory
      ? items.filter(item => item.product_roomCategory === selectedCategory)
      : items;

  const handleQuantityEditClick = (item) => {
    setEditingItemSku(item.product_sku);
  };

  const handleQuantityChange = (e, itemId) => {
    const updatedQuantity = e.target.value;
    setItems((prevItems) =>
        prevItems.map((item) =>
            item.product_sku === itemId ? { ...item, product_quantity: updatedQuantity } : item
        )
    );
  };

  const handleQuantityBlur = () => {
    setEditingItemSku(null);
  };

  const handleEditClick = (item) => {
    setEditFormData(item);
    setOriginalSku(item.product_sku); // Store the original SKU when editing
    setDisplayTable(false);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    setEditFormData(emptyProduct);
    setOriginalSku(null); // Reset original SKU on cancel
    setDisplayTable(true);
    setIsAddingProduct(false);
  };

  const handleSave = async () => {
    if (Validation.validateProduct(editFormData)) {
      console.log("Product data is valid!");
    } else {
      console.log("Product validation failed.");
      return;
    }

    const isSkuUnique = items.every(item => item.product_sku !== editFormData.product_sku || item.product_sku === originalSku);

    if (!isSkuUnique) {
      alert("SKU must be unique. Please provide a different SKU.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/cat201_project_war/AdminProduct-servlet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          originalSku: originalSku, // Send the original SKU
          updatedProduct: editFormData // Send the updated product details
        })
      });
      console.log(originalSku);
      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      // Update the local state only if the request was successful
      const updatedItems = items.map((item) =>
          item.product_sku === originalSku ? { ...editFormData } : item
      );
      setItems(updatedItems);
      setEditFormData(emptyProduct);
      setOriginalSku(null); // Reset the original SKU after save
      setDisplayTable(true);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteClick = async (sku) => {
    try {
      const response = await fetch(`http://localhost:8080/cat201_project_war/AdminProduct-servlet?product_sku=${sku}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

        if (!response.ok) {
          throw new Error('Failed to delete product.');
        }

        // Remove the product from the local state
        const updatedItems = items.filter((item) => item.product_sku !== sku);
        setItems(updatedItems);
      } catch (error) {
        console.error('Error deleting product:', error);
      }

  };

  const handleAddProductClick = async () => {
      setIsAddingProduct(true);  // Show the form to add a new product
      setEditFormData(emptyProduct);  // Reset the form data for the new product
      setDisplayTable(false);  // Hide the table while adding a new product
  };

  const handleAdd = async () => {
    if (Validation.validateProduct(editFormData)) {
      console.log("Product data is valid!");
    } else {
      console.log("Product validation failed.");
      return;
    }

    if(editFormData.product_sku == null || editFormData.product_sku === '')
    {
      alert("Please enter SKU value");
      return;
    }

    const isSkuUnique = items.every(item => item.product_sku !== editFormData.product_sku || item.product_sku === originalSku);

    if (!isSkuUnique) {
      alert("SKU must be unique. Please provide a different SKU.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/cat201_project_war/AdminProduct-servlet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editFormData)
      });
      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      setItems((prevItems) => [...prevItems, editFormData]);
      setEditFormData(emptyProduct);
      setDisplayTable(true);
      setIsAddingProduct(false);

    } catch (error) {
      console.error("Error adding new product:", error);
    }
  }


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
                        <tr key={item.product_sku}>
                          <td className='border-left'>{item.product_sku}</td>
                          <td>{item.product_name}</td>
                          <td>
                            Stock:{' '}
                            {editingItemSku === item.product_sku ? (
                                <input
                                    type="number"
                                    value={item.product_quantity}
                                    onChange={(e) => handleQuantityChange(e, item.product_sku)}
                                    onBlur={handleQuantityBlur}
                                    autoFocus
                                    className="quantityInput"
                                />
                            ) : (
                                <>
                                  {item.product_quantity}{' '}
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
                              <img src="/Images/edit.png" alt="Edit"/>
                            </button>
                          </td>
                          <td className='border-right'>
                            <button type="button" onClick={() => handleDeleteClick(item.product_sku)}>
                              <img src="/Images/delete.png" alt="Delete"/>
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
                    {key === 'product_src' ? (
                        <input
                            type="file"
                            id={key}
                            name={key}
                            onChange={handleFormInputChange} // handle file change separately
                        />
                    ) : key === 'product_arrivalDate' ? (
                        <input
                            type="date"
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleFormInputChange}
                        />
                    ) : (
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleFormInputChange}
                        />
                    )}
                    {key === 'product_dimension' ? (
                        <label>cm</label>
                    ) : key === 'product_weight' ? (
                        <label>kg</label>
                    ) : key === 'product_warranty' ? (
                        <label>year</label>
                    ) : null}
                  </div>
              ))}

              <div className="form-actions">
                <button
                    type="button"
                    onClick={isAddingProduct ? handleAdd : handleSave}
                    className="saveorcancelbtn"
                >
                  {isAddingProduct ? "Add Product" : "Save Changes"}
                </button>

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