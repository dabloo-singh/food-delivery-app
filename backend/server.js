const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const foodRoutes = require('./routes/foodRoutes')
const authRoutes = require('./routes/authRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const adminRoutes = require('./routes/adminRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Food Delivery API is running',
  })
})

app.use('/api', foodRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', restaurantRoutes)
app.use('/api', orderRoutes)
app.use('/api', paymentRoutes)
app.use('/api', adminRoutes)

app.use((error, req, res, next) => {
  console.error(error)
  if (res.headersSent) return next(error)
  res.status(error.statusCode || 500).json({ message: 'Something went wrong', error: process.env.NODE_ENV === 'production' ? undefined : error.message })
})

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })
