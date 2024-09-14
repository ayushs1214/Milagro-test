const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String // URL of the uploaded image from S3
  },
  description: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  stock: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);