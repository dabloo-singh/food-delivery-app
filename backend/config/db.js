const mongoose = require('mongoose')

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food-delivery'

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    console.log('Starting server without database connection. Set MONGO_URI to connect later.')
  }
}

module.exports = connectDB
