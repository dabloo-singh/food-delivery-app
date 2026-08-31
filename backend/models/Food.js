const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    time: {
      type: String,
      default: '20 min',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '🍽️',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Food', foodSchema)
