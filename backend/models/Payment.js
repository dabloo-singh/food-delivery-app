const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: String, enum: ['razorpay', 'stripe', 'cash'], required: true },
  providerOrderId: String,
  providerPaymentId: String,
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)
