// controllers/reviewController.js
const Review = require('../models/reviewModel');
const User = require('../models/customerModel'); // Import your User model

// Post a review
exports.postReview = async (req, res) => {
  try {
    const { productCode, review, rating } = req.body;

    // Get user information from the token
    const { id: userId } = req.user;

    // Find the user to get the username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newReview = new Review({
      productCode,
      userId,
      username: user.username,
      review,
      rating,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error posting review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productCode } = req.params;
    
    const reviews = await Review.find({ productCode });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
