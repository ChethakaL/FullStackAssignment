const Purchase = require('../models/purchaseModel');
const Product = require('../models/productModel');

exports.createPurchase = async (req, res) => {
  try {
    const { id: customerId } = req.user;
    const { productCode, quantity, color, size, totalAmount } = req.body;

    const product = await Product.findOne({ productCode });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if there's enough stock based on selected options
    const selectedStock = product.calculateTotalStock({ color, size });

    if (selectedStock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Update the product stock based on selected options
    const selectedStockIndex = product.quantity.findIndex((option) => (
      option.color === color && option.size === size
    ));

    product.quantity[selectedStockIndex].stock -= quantity;

    // Save the updated product
    await product.save();

    // Create a new purchase order
    const newPurchase = new Purchase({
      customerId,
      productCode,
      quantity,
      color,
      size,
      totalAmount,
    });

    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error('Error creating purchase order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Getting all the purchase orders

exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('customerId');
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Update the status of a product
exports.updatePurchaseStatus = async (req, res) => {
  try {
    const { purchaseId, newStatus } = req.body;

    // Validate if the new status is one of the allowed statuses
    const allowedStatuses = ['Pending', 'Processing', 'Dispatched', 'Arrival', 'Complete'];
    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Find the purchase by ID and update the status
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      purchaseId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    res.status(200).json(updatedPurchase);
  } catch (error) {
    console.error('Error updating purchase status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.cartPurchase = async (req, res) => {
  try {
    const { id: customerId } = req.user;
    const products = req.body.products; // Assuming an array of products in the request body

    // Array to store the saved purchases
    const savedPurchases = [];

    // Iterate through each product in the cart
    for (const { productCode, quantity, color, size, totalAmount } of products) {
      const product = await Product.findOne({ productCode });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Check if there's enough stock based on selected options
      const selectedStock = product.calculateTotalStock({ color, size });

      if (selectedStock < quantity) {
        return res.status(400).json({ error: 'Insufficient stock for product ' + product.productName });
      }

      // Update the product stock based on selected options
      const selectedStockIndex = product.quantity.findIndex((option) => (
        option.color === color && option.size === size
      ));

      product.quantity[selectedStockIndex].stock -= quantity;

      // Save the updated product
      await product.save();

      // Create a new purchase order
      const newPurchase = new Purchase({
        customerId,
        productCode,
        quantity,
        color,
        size,
        totalAmount,
      });

      const savedPurchase = await newPurchase.save();
      savedPurchases.push(savedPurchase);
    }

    res.status(201).json(savedPurchases);
  } catch (error) {
    console.error('Error creating purchase order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserPurchases = async (req, res) => {
  try {
    const { userId } = req.params;

    const userPurchases = await Purchase.find({ customerId: userId }).populate('productCode', 'productName');

    res.status(200).json(userPurchases);
  } catch (error) {
    console.error('Error fetching user purchases:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// 659a91042fe04768a64ef82f