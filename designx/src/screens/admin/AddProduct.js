import axios from 'axios';
import React, { useState } from 'react';

function AddProduct() {
  const [productData, setProductData] = useState({
    productCode: '',
    productName: '',
    category: '',
    productBrand: '',
    productDescription: '',
    productPrice: '',
    productImage: null,
    quantityDetails: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData((prevData) => ({ ...prevData, productImage: file }));
  };

  const handleAddQuantityDetails = () => {
    setProductData((prevData) => ({
      ...prevData,
      quantityDetails: [...prevData.quantityDetails, { color: '', size: '', stock: '' }],
    }));
  };
  

  const handleQuantityDetailsChange = (index, field, value) => {
    const updatedQuantityDetails = [...productData.quantityDetails];
    updatedQuantityDetails[index][field] = value;
    setProductData((prevData) => ({ ...prevData, quantityDetails: updatedQuantityDetails }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('productCode', productData.productCode);
      formData.append('productImage', productData.productImage);
      formData.append('productName', productData.productName);
      formData.append('category',productData.category)
      formData.append('quantity', JSON.stringify(productData.quantityDetails));
      formData.append('productBrand', productData.productBrand);
      formData.append('productDescription', productData.productDescription);
      formData.append('productPrice', productData.productPrice);
  
      // Log FormData for debugging
      console.log('FormData:', formData);
  
      const response = await fetch('http://localhost:4000/api/products/upload', {
        method: 'POST',
        body: formData,
      });


      
      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div>
      <h1 className='heading-text'>Add Products</h1>
      <div className='add-container'>
        <div className='form-container'>
          <form className="ui form">
            <h2 className="ui dividing header">Product Details</h2>
            <div className="field">
              <div className="three fields">
                <div className='two wide field'>
                  <label>Product Code</label>
                  <div className="field">
                    <input type="text" name="productCode" placeholder="Product Code" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='five wide field'>
                  <label>Product Name</label>
                  <div className="field">
                    <input type="text" name="productName" placeholder="Product Name" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='four wide field'>
                  <label>Product Brand</label>
                  <div className="field">
                    <input type="text" name="productBrand" placeholder="Product Brand" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='four wide field'>
                  <label>Product Category</label>
                  <div className="field">
                    <input type="text" name="category" placeholder="Product Category" onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <div className="two fields">
                <div className='twelve wide field'>
                  <label>Product Description</label>
                  <div className="field">
                    <input type="text" name="productDescription" placeholder="Product Description" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='two wide field'>
                  <label>Product Price</label>
                  <div className="field">
                    <input type="text" name="productPrice" placeholder="Product Price" onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <div className="one field">
                <div className='fifteen wide field'>
                  <label>Product Image</label>
                  <div className='field'>
                    <div className="ui icon input">
                      <input type="file" onChange={handleFileChange} />
                      <i className="upload icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className="ui dividing header" style={{ marginTop: 20 }}>Quantity Details</h2>
              <button type='button' className="ui labeled icon button btn-size" onClick={handleAddQuantityDetails}>
                <i className="add icon"></i>
                Add
              </button>
            </div>
            {productData.quantityDetails.map((detail, index) => (
                <div className="field" key={index}>
                    <div className="three fields">
                    <div className='two wide field'>
                        <label>Colors</label>
                        <div className="field">
                        <input
                            type="text"
                            placeholder="Color"
                            name={`quantityDetails[${index}].color`}
                            value={detail.color}
                            onChange={(e) => handleQuantityDetailsChange(index, 'color', e.target.value)}
                        />
                        </div>
                    </div>
                    <div className='two wide field'>
                        <label>Sizes</label>
                        <div className="field">
                        <select
                            className="ui fluid dropdown"
                            name={`quantityDetails[${index}].size`}
                            value={detail.size}
                            onChange={(e) => handleQuantityDetailsChange(index, 'size', e.target.value)}
                        >
                            <option value="">Sizes</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                        </div>
                    </div>
                    <div className='two wide field'>
                        <label>Quantity</label>
                        <input
                        type="number"
                        placeholder='Quantity'
                        name={`quantityDetails[${index}].stock`}
                        value={detail.stock}
                        onChange={(e) => handleQuantityDetailsChange(index, 'stock', e.target.value)}
                        />
                    </div>
                    </div>
                </div>
            ))}
            <button type='button' className="ui secondary button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
