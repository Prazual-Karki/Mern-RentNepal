const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },

  // photo: {
  //   type: String,
  //   data: Buffer,
  //   contentType: String,
  // },
})

module.exports = mongoose.model('users', userSchema)
