const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()
const signToken = (user) => jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET || 'development-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
const validate = (req, res, next) => { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed', errors: errors.array() }); next() }

router.post('/register', [body('name').trim().isLength({ min: 2 }), body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 })], validate, async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body
    if (await User.findOne({ email })) return res.status(409).json({ message: 'Email is already registered' })
    const user = await User.create({ name, email, phone, password: await bcrypt.hash(password, 12) })
    res.status(201).json({ token: signToken(user), user: user.toSafeObject() })
  } catch (error) { next(error) }
})

router.post('/login', [body('email').isEmail().normalizeEmail(), body('password').notEmpty()], validate, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password')
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(401).json({ message: 'Invalid email or password' })
    res.json({ token: signToken(user), user: user.toSafeObject() })
  } catch (error) { next(error) }
})

router.get('/me', requireAuth, (req, res) => res.json({ user: req.user.toSafeObject() }))
router.patch('/me', requireAuth, [body('name').optional().trim().isLength({ min: 2 }), body('phone').optional().trim()], validate, async (req, res, next) => {
  try { Object.assign(req.user, { name: req.body.name ?? req.user.name, phone: req.body.phone ?? req.user.phone }); await req.user.save(); res.json({ user: req.user.toSafeObject() }) } catch (error) { next(error) }
})
router.post('/me/addresses', requireAuth, [body('street').trim().notEmpty(), body('city').trim().notEmpty()], validate, async (req, res, next) => {
  try { req.user.addresses.push(req.body); await req.user.save(); res.status(201).json({ addresses: req.user.addresses }) } catch (error) { next(error) }
})
router.delete('/me/addresses/:id', requireAuth, async (req, res, next) => {
  try { req.user.addresses = req.user.addresses.filter((address) => address._id.toString() !== req.params.id); await req.user.save(); res.json({ addresses: req.user.addresses }) } catch (error) { next(error) }
})

module.exports = router
