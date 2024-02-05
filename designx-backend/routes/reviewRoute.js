// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {protect} = require('../middleware/auth');

// Route to post a review
router.post('/', protect, reviewController.postReview);

// Route to get all reviews for a product
router.get('/product/:productCode', reviewController.getProductReviews);

router.get('/all', reviewController.getAllReviews);

module.exports = router;
