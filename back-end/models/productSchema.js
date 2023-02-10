const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  size: Number,
  type: String,
  userId: String,
  location: String,
  status: String,
  photo: String,
})

module.exports = mongoose.model('products', productSchema)
