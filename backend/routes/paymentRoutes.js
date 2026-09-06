const express = require('express')
const crypto = require('crypto')
const { body, validationResult } = require('express-validator')
const Payment = require('../models/Payment')
const Order = require('../models/Order')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()
const validate = (req, res, next) => { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed', errors: errors.array() }); next() }
const razorpayRequest = async (path, options = {}) => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) throw Object.assign(new Error('Razorpay is not configured'), { statusCode: 503 })
  const response = await fetch(`https://api.razorpay.com/v1${path}`, { ...options, headers: { Authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64')}`, 'Content-Type': 'application/json', ...(options.headers || {}) } })
  const data = await response.json()
  if (!response.ok) throw Object.assign(new Error(data.error?.description || 'Razorpay request failed'), { statusCode: 502 })
  return data
}

router.post('/payments/create', requireAuth, [body('orderId').isMongoId(), body('provider').isIn(['razorpay', 'stripe', 'cash'])], validate, async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.body.orderId, userId: req.user._id })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (await Payment.findOne({ orderId: order._id })) return res.status(409).json({ message: 'Payment already initialized' })
    const payment = await Payment.create({ orderId: order._id, userId: req.user._id, provider: req.body.provider, amount: order.totalAmount, status: 'pending' })
    if (req.body.provider === 'cash') { order.paymentStatus = 'pending'; await order.save(); return res.status(201).json({ payment, message: 'Cash on delivery selected' }) }
    const razorpayOrder = await razorpayRequest('/orders', { method: 'POST', body: JSON.stringify({ amount: Math.round(order.totalAmount * 100), currency: 'INR', receipt: order._id.toString(), notes: { paymentId: payment._id.toString() } }) })
    payment.providerOrderId = razorpayOrder.id
    await payment.save()
    res.status(201).json({ payment, keyId: process.env.RAZORPAY_KEY_ID, razorpayOrder })
  } catch (error) { next(error) }
})

router.post('/payments/:id/verify', requireAuth, [body('razorpay_order_id').trim().notEmpty(), body('razorpay_payment_id').trim().notEmpty(), body('razorpay_signature').trim().notEmpty()], validate, async (req, res, next) => {
  try {
    const payment = await Payment.findOne({ _id: req.params.id, userId: req.user._id })
    if (!payment || payment.provider !== 'razorpay') return res.status(404).json({ message: 'Payment not found' })
    const digest = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(`${req.body.razorpay_order_id}|${req.body.razorpay_payment_id}`).digest('hex')
    if (digest !== req.body.razorpay_signature || payment.providerOrderId !== req.body.razorpay_order_id) return res.status(400).json({ message: 'Payment signature verification failed' })
    payment.providerPaymentId = req.body.razorpay_payment_id; payment.status = 'paid'; await payment.save()
    await Order.findByIdAndUpdate(payment.orderId, { paymentStatus: 'completed', paymentProviderId: payment.providerPaymentId })
    res.json({ payment })
  } catch (error) { next(error) }
})
router.post('/payments/:id/confirm', requireAuth, [body('providerPaymentId').trim().notEmpty()], validate, async (req, res, next) => {
  try { const payment = await Payment.findOne({ _id: req.params.id, userId: req.user._id }); if (!payment) return res.status(404).json({ message: 'Payment not found' }); payment.providerPaymentId = req.body.providerPaymentId; payment.status = 'paid'; await payment.save(); await Order.findByIdAndUpdate(payment.orderId, { paymentStatus: 'completed', paymentProviderId: payment.providerPaymentId }); res.json(payment) } catch (error) { next(error) }
})

module.exports = router
