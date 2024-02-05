const { google } = require('googleapis');
const fs = require('fs');
const Product = require('../models/productModel');

const auth = new google.auth.GoogleAuth({
    keyFile: '/Users/chethakalakshitha/NSBM Green University/Full Stack Module/xdesign-backend/designx-410315-daee2b197b03.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

async function uploadImage(req, res) {
  try {
      const { category, productCode, productName, quantity, productBrand, productDescription, productPrice } = req.body;

      const fileMetadata = {
          name: req.file.originalname,
      };

      const media = {
          mimeType: req.file.mimetype,
          body: require('fs').createReadStream(req.file.path),
      };

      const response = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: 'id, webViewLink',
      });

      const fileId = response.data.id;

      await drive.permissions.create({
          fileId: fileId,
          requestBody: {
              role: 'reader',
              type: 'anyone',
          },
      });

      // Extract the file ID from webViewLink
      const fileID = response.data.id;
      
      // Create the product image URL
      const productImage = `https://drive.google.com/uc?export=view&id=${fileID}`;

      const newProduct = new Product({
          productCode,
          productName,
          category,
          quantity: JSON.parse(quantity),
          productBrand,
          productDescription,
          productPrice,
          productImage,
      });

      await newProduct.save();

      const responseData = {
          productCode,
          productName,
          category,
          quantity: JSON.parse(quantity),
          productBrand,
          productDescription,
          productPrice,
          productImage,
      };

      res.json(responseData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload image.' });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Add other controller functions as needed, for example:

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getProductDetailsById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const productId = req.params.id;
    const { color, size, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the stock based on selected options
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          'quantity.$[option].stock': quantity,
        },
      },
      {
        arrayFilters: [
          {
            'option.color': color,
            'option.size': size,
          },
        ],
        new: true,
      }
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;

    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(204).json(); // No content for successful deletion
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Category of Product

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Check if the category is valid (e.g., 'Men' or 'Women')
    if (category !== 'Men' && category !== 'Women') {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Fetch products based on the category
    const products = await Product.find({ category });

    // Sort the products (you can customize the sorting criteria)
    const sortedProducts = products.sort((a, b) => a.productName.localeCompare(b.productName));

    res.status(200).json(sortedProducts);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Function to get the latest 6 products
const getLatestProducts = async (req, res) => {
  try {
    const latestProducts = await Product.find().sort({ _id: -1 }).limit(6);

    res.status(200).json(latestProducts);
  } catch (error) {
    console.error('Error fetching latest products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports = { 
  uploadImage, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct, 
  getProductDetailsById, 
  updateStock,
  getProductsByCategory,
  getLatestProducts
};
