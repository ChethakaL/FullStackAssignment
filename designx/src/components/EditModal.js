import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditModal = ({ product, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleSave = async () => {
    try {
      // Make a PUT request to update the product
      const response = await axios.put(
        `http://localhost:4000/api/products/update/${editedProduct._id}`,  // Fix the endpoint here
        editedProduct
      );
  
      if (response.status === 200) {
        // Update the local state with the edited product
        // You might need to fetch the updated data again from the server
        // depending on your backend behavior
        onClose();
      } else {
        console.error('Error updating product:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };  

  return (
    <div>
      <h2>Edit Product</h2>
      {/* Render your form fields here based on editedProduct state */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditModal;
