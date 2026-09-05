const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  cuisine: [String],
  image: { type: String, default: '' },
  address: { street: String, city: String, state: String, zipCode: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  isOpen: { type: Boolean, default: true },
  deliveryTime: { type: String, default: '30 min' },
}, { timestamps: true })

module.exports = mongoose.model('Restaurant', restaurantSchema)
