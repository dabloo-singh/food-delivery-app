const express = require('express')
const mongoose = require('mongoose')
const Food = require('../models/Food')

const router = express.Router()

const sampleFoods = [
  {
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 18.5,
    rating: 4.8,
    time: '25 min',
    description: 'Fresh mozzarella, basil, and tomato sauce baked to perfection.',
    image: '🍕',
  },
  {
    name: 'Classic Burger',
    category: 'Burgers',
    price: 16.2,
    rating: 4.9,
    time: '20 min',
    description: 'Double patty burger with cheddar, lettuce, and special sauce.',
    image: '🍔',
  },
  {
    name: 'Spicy Noodles',
    category: 'Chinese',
    price: 14.8,
    rating: 4.7,
    time: '18 min',
    description: 'Wok-tossed noodles with chili oil, veggies, and savory sauce.',
    image: '🍜',
  },
  {
    name: 'Chicken Biryani',
    category: 'Indian',
    price: 19.9,
    rating: 4.9,
    time: '30 min',
    description: 'Aromatic rice layered with marinated chicken and fragrant spices.',
    image: '🍛',
  },
  {
    name: 'Chocolate Cake',
    category: 'Desserts',
    price: 9.5,
    rating: 4.6,
    time: '10 min',
    description: 'Soft, rich chocolate cake topped with melted ganache.',
    image: '🍰',
  },
  {
    name: 'Green Salad Bowl',
    category: 'Healthy',
    price: 12.3,
    rating: 4.5,
    time: '15 min',
    description: 'Healthy greens, avocado, grains, and a light citrus dressing.',
    image: '🥗',
  },
]

router.get('/foods', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json(sampleFoods)
    }

    const foods = await Food.find()

    if (foods.length === 0) {
      const createdFoods = await Food.insertMany(sampleFoods)
      return res.status(200).json(createdFoods)
    }

    res.status(200).json(foods)
  } catch (error) {
    res.status(200).json(sampleFoods)
  }
})

router.post('/foods', async (req, res) => {
  try {
    const food = new Food(req.body)
    const savedFood = await food.save()
    res.status(201).json(savedFood)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create food item', error: error.message })
  }
})

module.exports = router
