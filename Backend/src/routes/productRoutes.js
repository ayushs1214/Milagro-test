const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const upload = require('../middlewares/upload'); // Use local upload middleware

// Route to create a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;  // Local image URL

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;