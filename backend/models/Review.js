const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true, maxlength: 1000 },
}, { timestamps: true })

reviewSchema.index({ restaurantId: 1, createdAt: -1 })
module.exports = mongoose.model('Review', reviewSchema)
