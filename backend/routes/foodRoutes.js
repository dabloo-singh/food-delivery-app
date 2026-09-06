const express = require('express')
const mongoose = require('mongoose')
const Food = require('../models/Food')
const { requireAuth } = require('../middleware/authMiddleware')
const { requireAdmin } = require('../middleware/adminMiddleware')

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
const catalogFoods = [
  ['Signature Starter', 'Starters', 179], ['House Special', 'Recommended', 299], ['Classic Comfort Bowl', 'Mains', 269],
  ['Garden Fresh Salad', 'Healthy', 229], ['Spiced Rice Plate', 'Rice', 319], ['Charcoal Grill Platter', 'Grills', 399],
  ['Crispy Golden Fries', 'Sides', 149], ['Handmade Dumplings', 'Momos', 219], ['Creamy Pasta', 'Italian', 329],
  ['Wood Fired Flatbread', 'Breads', 289], ['Fresh Fruit Cooler', 'Drinks', 129], ['Mango Lassi', 'Drinks', 139],
  ['Warm Chocolate Cake', 'Desserts', 199], ['Berry Cheesecake', 'Desserts', 249], ['House Chai', 'Drinks', 99],
].map(([name, category, price]) => ({ name, category, price, rating: 4.7, time: '25 min', description: 'Prepared fresh in the Morsel kitchen.', image: '🍽️' }))
const fullCatalog = [...sampleFoods, ...catalogFoods]

router.get('/foods', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json(sampleFoods)
    }

    const foods = await Food.find()

    const existingNames = new Set(foods.map((food) => food.name))
    const missingFoods = fullCatalog.filter((food) => !existingNames.has(food.name))
    if (missingFoods.length) await Food.insertMany(missingFoods)
    res.status(200).json(await Food.find())
  } catch (error) {
    res.status(200).json(fullCatalog)
  }
})

router.post('/foods', requireAuth, requireAdmin, async (req, res) => {
  try {
    const food = new Food(req.body)
    const savedFood = await food.save()
    res.status(201).json(savedFood)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create food item', error: error.message })
  }
})

module.exports = router
