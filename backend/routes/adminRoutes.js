const express = require('express')
const User = require('../models/User')
const Restaurant = require('../models/Restaurant')
const Food = require('../models/Food')
const Order = require('../models/Order')
const { requireAuth } = require('../middleware/authMiddleware')
const { requireAdmin } = require('../middleware/adminMiddleware')

const router = express.Router()
router.use(requireAuth, requireAdmin)
router.get('/admin/users', async (req, res, next) => { try { res.json(await User.find().select('-password').sort({ createdAt: -1 })) } catch (error) { next(error) } })
router.get('/admin/restaurants', async (req, res, next) => { try { res.json(await Restaurant.find().sort({ createdAt: -1 })) } catch (error) { next(error) } })
router.get('/admin/foods', async (req, res, next) => { try { res.json(await Food.find().populate('restaurantId', 'name').sort({ createdAt: -1 })) } catch (error) { next(error) } })
router.get('/admin/analytics', async (req, res, next) => {
  try {
    const [summary, byStatus, byDay] = await Promise.all([
      Order.aggregate([{ $group: { _id: null, orders: { $sum: 1 }, revenue: { $sum: '$totalAmount' }, averageOrder: { $avg: '$totalAmount' } } }]),
      Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Order.aggregate([{ $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, revenue: { $sum: '$totalAmount' }, orders: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    ])
    res.json({ summary: summary[0] || { orders: 0, revenue: 0, averageOrder: 0 }, byStatus, byDay })
  } catch (error) { next(error) }
})

module.exports = router
