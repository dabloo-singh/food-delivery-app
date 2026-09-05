const express = require('express')
const { body, validationResult } = require('express-validator')
const Restaurant = require('../models/Restaurant')
const Food = require('../models/Food')
const Review = require('../models/Review')
const { requireAuth } = require('../middleware/authMiddleware')
const { requireAdmin } = require('../middleware/adminMiddleware')

const router = express.Router()
const validate = (req, res, next) => { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed', errors: errors.array() }); next() }

router.get('/restaurants', async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.search) filter.$or = [{ name: new RegExp(req.query.search, 'i') }, { cuisine: new RegExp(req.query.search, 'i') }]
    if (req.query.cuisine) filter.cuisine = new RegExp(`^${req.query.cuisine}$`, 'i')
    if (req.query.open === 'true') filter.isOpen = true
    res.json(await Restaurant.find(filter).sort({ rating: -1 }))
  } catch (error) { next(error) }
})

router.get('/restaurants/:id', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' })
    const [menu, reviews] = await Promise.all([Food.find({ restaurantId: restaurant._id, isAvailable: true }), Review.find({ restaurantId: restaurant._id }).populate('userId', 'name').sort({ createdAt: -1 })])
    res.json({ restaurant, menu, reviews })
  } catch (error) { next(error) }
})

router.post('/restaurants', requireAuth, requireAdmin, [body('name').trim().notEmpty(), body('cuisine').isArray({ min: 1 })], validate, async (req, res, next) => {
  try { res.status(201).json(await Restaurant.create({ ...req.body, ownerId: req.user._id })) } catch (error) { next(error) }
})
router.post('/restaurants/:id/reviews', requireAuth, [body('rating').isInt({ min: 1, max: 5 }), body('comment').optional().trim().isLength({ max: 1000 })], validate, async (req, res, next) => {
  try {
    const review = await Review.create({ ...req.body, restaurantId: req.params.id, userId: req.user._id })
    const stats = await Review.aggregate([{ $match: { restaurantId: review.restaurantId } }, { $group: { _id: null, rating: { $avg: '$rating' }, count: { $sum: 1 } } }])
    await Restaurant.findByIdAndUpdate(req.params.id, { rating: stats[0]?.rating || 0, reviewCount: stats[0]?.count || 0 })
    res.status(201).json(await review.populate('userId', 'name'))
  } catch (error) { next(error) }
})

router.post('/restaurants/:id/menu', requireAuth, requireAdmin, [body('name').trim().notEmpty(), body('category').trim().notEmpty(), body('price').isFloat({ min: 0 })], validate, async (req, res, next) => {
  try { res.status(201).json(await Food.create({ ...req.body, restaurantId: req.params.id })) } catch (error) { next(error) }
})
router.patch('/menu/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try { const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!food) return res.status(404).json({ message: 'Food item not found' }); res.json(food) } catch (error) { next(error) }
})

module.exports = router
