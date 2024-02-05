const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { protect } = require('../middleware/auth'); // Import the protect middleware

// Create a new purchase order
router.post('/create', protect, purchaseController.createPurchase);
router.get('/all', purchaseController.getAllPurchases);
router.post('/cart', protect, purchaseController.cartPurchase);
router.put('/update-status/:id', purchaseController.updatePurchaseStatus);
router.get('/user-purchases/:userId', purchaseController.getUserPurchases);


module.exports = router;
