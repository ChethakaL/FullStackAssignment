// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCode: { type: String, unique: true, required: true },
  productName: { type: String, required: true },
  category:{ type: String, required: true },
  quantity: [{
    color: String,
    size: String,
    stock: String,
  }],  
  productBrand: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, required: true }
});

// Function to calculate total stock based on selected options
productSchema.methods.calculateTotalStock = function (selectedOptions) {
  const selectedStock = this.quantity.find((option) => (
    option.color === selectedOptions.color && option.size === selectedOptions.size
  ));

  return selectedStock ? selectedStock.stock : 0;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
