const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getToken = (req) => req.headers.authorization?.startsWith('Bearer ')
  ? req.headers.authorization.slice(7)
  : null

async function requireAuth(req, res, next) {
  try {
    const token = getToken(req)
    if (!token) return res.status(401).json({ message: 'Authentication required' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'development-secret')
    const user = await User.findById(payload.sub)
    if (!user) return res.status(401).json({ message: 'User no longer exists' })
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = { requireAuth }
