const mongoose = require('mongoose');

const { Schema } = mongoose;
const adminSchema = new Schema({
  Id: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
