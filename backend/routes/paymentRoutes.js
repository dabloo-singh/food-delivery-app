const express = require('express')
const { body, validationResult } = require('express-validator')
const Payment = require('../models/Payment')
const Order = require('../models/Order')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()
const validate = (req, res, next) => { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed', errors: errors.array() }); next() }

router.post('/payments/create', requireAuth, [body('orderId').isMongoId(), body('provider').isIn(['razorpay', 'stripe', 'cash'])], validate, async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.body.orderId, userId: req.user._id })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (await Payment.findOne({ orderId: order._id })) return res.status(409).json({ message: 'Payment already initialized' })
    const payment = await Payment.create({ orderId: order._id, userId: req.user._id, provider: req.body.provider, amount: order.totalAmount, status: req.body.provider === 'cash' ? 'pending' : 'pending' })
    if (req.body.provider === 'cash') { order.paymentStatus = 'pending'; await order.save() }
    res.status(201).json({ payment, message: req.body.provider === 'cash' ? 'Cash on delivery selected' : 'Payment intent created; confirm with the provider SDK' })
  } catch (error) { next(error) }
})
router.post('/payments/:id/confirm', requireAuth, [body('providerPaymentId').trim().notEmpty()], validate, async (req, res, next) => {
  try { const payment = await Payment.findOne({ _id: req.params.id, userId: req.user._id }); if (!payment) return res.status(404).json({ message: 'Payment not found' }); payment.providerPaymentId = req.body.providerPaymentId; payment.status = 'paid'; await payment.save(); await Order.findByIdAndUpdate(payment.orderId, { paymentStatus: 'completed', paymentProviderId: payment.providerPaymentId }); res.json(payment) } catch (error) { next(error) }
})

module.exports = router
