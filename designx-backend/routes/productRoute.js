// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Product = require('../models/productModel');

// Create a new product
router.post('/upload', upload.single('productImage'), productController.uploadImage);
// Get all products
router.get('/all', productController.getAllProducts);

router.get('/update-stock', productController.updateStock);

router.get('/by:id', productController.getProductById);

router.get('/category/:category', productController.getProductsByCategory);

router.get('/latest', productController.getLatestProducts);

router.put('/update/:id', productController.updateProduct);

router.delete('/delete:id', productController.deleteProduct);

// Search Function
router.get('/search', async (req, res) => {
    try {
      const searchTerm = req.query.q;
  
      // Use a regular expression for a case-insensitive search
      const products = await Product.find({ productName: new RegExp(searchTerm, 'i') });
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Add other routes as needed

module.exports = router;
