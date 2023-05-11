const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  size: String,
  type: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  location: String,
  status: {
    type: String,
    enum: ['available', 'taken'],
  },
  description: String,
  photo: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('products', productSchema)
