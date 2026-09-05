const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: ['placed', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
      default: 'placed',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['razorpay', 'stripe', 'cash'],
      default: 'cash',
    },
    paymentProviderId: String,
    statusHistory: [{ status: String, at: { type: Date, default: Date.now } }],
    estimatedDelivery: Date,
    actualDelivery: Date,
    notes: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Order', orderSchema)
