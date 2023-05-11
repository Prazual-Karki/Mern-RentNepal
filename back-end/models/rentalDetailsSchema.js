const mongoose = require('mongoose')
const rentalDetailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
  name: String,
  price: Number,
  type: String,
  location: String,
  productLikes: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('rentalDetails', rentalDetailSchema)
