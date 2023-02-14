const mongoose = require('mongoose');

const { Schema } = mongoose;
const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  brandId: {
    type: Number,
    required: true,
  },

  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
