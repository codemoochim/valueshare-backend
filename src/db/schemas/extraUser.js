const mongoose = require('mongoose')

const { Schema } = mongoose
const extraUserSchema = new Schema({
  id: {
    type: Number,
    required: true,
  }
  email: {
    type: String,
    required: true,
  },
  shippingAdress: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  }
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('ExtraUser', extraUserSchema);