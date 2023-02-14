const mongoose = require('mongoose')

const { Schema } = mongoose
const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
  }
  email: {
    type: String,
    required: true,
  },
  password: {
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
  age: {
    type: String,
    required: true,
  }.
  gender: {
    type: String,
    required: false,
  },
  adress: {
    type: String,
    required: false,
  },
  registerAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('User', userSchema);