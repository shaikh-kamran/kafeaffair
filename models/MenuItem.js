const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  discountedPrice: {
    type: String,
    default: '',
    trim: true,
  },
  img: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    default: '',
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);
