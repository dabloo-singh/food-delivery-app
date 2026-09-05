const express = require('express')
const { body, validationResult } = require('express-validator')
const Order = require('../models/Order')
const Food = require('../models/Food')
const { requireAuth } = require('../middleware/authMiddleware')
const { requireAdmin } = require('../middleware/adminMiddleware')

const router = express.Router()
const statuses = ['placed', 'confirmed', 'preparing', 'out-for-delivery', 'delivered']
const validate = (req, res, next) => { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed', errors: errors.array() }); next() }

router.post('/orders', requireAuth, [body('items').isArray({ min: 1 }), body('deliveryAddress').isObject(), body('paymentMethod').isIn(['razorpay', 'stripe', 'cash'])], validate, async (req, res, next) => {
  try {
    const requested = req.body.items
    const foods = await Food.find({ _id: { $in: requested.map((item) => item.foodId) }, isAvailable: true })
    if (foods.length !== requested.length) return res.status(400).json({ message: 'One or more food items are unavailable' })
    const items = requested.map((item) => { const food = foods.find((entry) => entry._id.toString() === item.foodId); return { foodId: food._id, name: food.name, price: food.price, quantity: Math.max(1, Number(item.quantity) || 1) } })
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const order = await Order.create({ userId: req.user._id, items, totalAmount, deliveryAddress: req.body.deliveryAddress, paymentMethod: req.body.paymentMethod, statusHistory: [{ status: 'placed' }] })
    res.status(201).json(order)
  } catch (error) { next(error) }
})
router.get('/orders', requireAuth, async (req, res, next) => { try { res.json(await Order.find({ userId: req.user._id }).populate('items.foodId').sort({ createdAt: -1 })) } catch (error) { next(error) } })
router.get('/orders/:id', requireAuth, async (req, res, next) => { try { const filter = req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, userId: req.user._id }; const order = await Order.findOne(filter).populate('items.foodId'); if (!order) return res.status(404).json({ message: 'Order not found' }); res.json(order) } catch (error) { next(error) } })
router.patch('/orders/:id/status', requireAuth, requireAdmin, [body('status').isIn(statuses)], validate, async (req, res, next) => {
  try { const order = await Order.findById(req.params.id); if (!order) return res.status(404).json({ message: 'Order not found' }); const previous = statuses.indexOf(order.status); const nextStatus = statuses.indexOf(req.body.status); if (nextStatus < previous) return res.status(400).json({ message: 'Order status cannot move backwards' }); order.status = req.body.status; order.statusHistory.push({ status: req.body.status }); if (req.body.status === 'delivered') order.actualDelivery = new Date(); await order.save(); res.json(order) } catch (error) { next(error) }
})
router.get('/admin/orders', requireAuth, requireAdmin, async (req, res, next) => { try { res.json(await Order.find().populate('userId', 'name email').sort({ createdAt: -1 })) } catch (error) { next(error) } })

module.exports = router
