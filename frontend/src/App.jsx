import { useEffect, useMemo, useState } from 'react'
import './App.css'

const categories = [
  { name: 'All', icon: '🍽️' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burgers', icon: '🍔' },
  { name: 'Chinese', icon: '🍜' },
  { name: 'Indian', icon: '🍛' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Healthy', icon: '🥗' },
]

const fallbackFoods = [
  {
    id: 1,
    name: 'Margherita Pizza',
    category: 'Pizza',
    icon: '🍕',
    tag: 'Best Seller',
    price: 18.5,
    time: '25 min',
    rating: 4.8,
    desc: 'Fresh mozzarella, basil, and tomato sauce baked to perfection.',
  },
  {
    id: 2,
    name: 'Classic Burger',
    category: 'Burgers',
    icon: '🍔',
    tag: 'Hot Deal',
    price: 16.2,
    time: '20 min',
    rating: 4.9,
    desc: 'Double patty burger with cheddar, lettuce, and special sauce.',
  },
  {
    id: 3,
    name: 'Spicy Noodles',
    category: 'Chinese',
    icon: '🍜',
    tag: 'Popular',
    price: 14.8,
    time: '18 min',
    rating: 4.7,
    desc: 'Wok-tossed noodles with chili oil, veggies, and savory sauce.',
  },
  {
    id: 4,
    name: 'Chicken Biryani',
    category: 'Indian',
    icon: '🍛',
    tag: 'Chef Special',
    price: 19.9,
    time: '30 min',
    rating: 4.9,
    desc: 'Aromatic rice layered with marinated chicken and fragrant spices.',
  },
  {
    id: 5,
    name: 'Chocolate Cake',
    category: 'Desserts',
    icon: '🍰',
    tag: 'Sweet',
    price: 9.5,
    time: '10 min',
    rating: 4.6,
    desc: 'Soft, rich chocolate cake topped with melted ganache.',
  },
  {
    id: 6,
    name: 'Green Salad Bowl',
    category: 'Healthy',
    icon: '🥗',
    tag: 'Fresh',
    price: 12.3,
    time: '15 min',
    rating: 4.5,
    desc: 'Healthy greens, avocado, grains, and a light citrus dressing.',
  },
]

function App() {
  const [foodItems, setFoodItems] = useState(fallbackFoods)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedFood, setSelectedFood] = useState(fallbackFoods[0])
  const [cart, setCart] = useState([])
  const [activeView, setActiveView] = useState('Home')

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const response = await fetch('/api/foods')
        const data = await response.json()

        if (Array.isArray(data) && data.length > 0) {
          const normalizedFoods = data.map((food, index) => ({
            id: food._id || `${food.name}-${index}`,
            name: food.name,
            category: food.category,
            icon: food.image || '🍽️',
            tag: food.tag || 'Popular',
            price: Number(food.price) || 0,
            time: food.time || '20 min',
            rating: Number(food.rating) || 4.5,
            desc: food.description || 'Fresh and delicious food delivered to you.',
          }))

          setFoodItems(normalizedFoods)
          setSelectedFood(normalizedFoods[0])
        }
      } catch (error) {
        console.error('Failed to load foods:', error)
      }
    }

    loadFoods()
  }, [])

  const filteredFoods = useMemo(() => {
    return foodItems.filter((food) => {
      const matchesCategory =
        selectedCategory === 'All' || food.category === selectedCategory
      const matchesSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [foodItems, search, selectedCategory])

  const addToCart = (food) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === food.id)
      if (existing) {
        return current.map((item) =>
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }
      return [...current, { ...food, qty: 1 }]
    })
    setActiveView('Cart')
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="brand">
          <span className="brand-mark">🍔</span>
          <span>Food Delivery</span>
        </div>

        <nav className="nav-menu" aria-label="Main navigation">
          {['Home', 'Menu', 'Restaurants', 'Cart', 'Login'].map((item) => (
            <button
              key={item}
              type="button"
              className={activeView === item ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveView(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {activeView === 'Home' && (
        <main className="page-content">
          <section className="hero-panel">
            <div className="hero-text">
              <p className="mini-label">Fresh & Fast</p>
              <h1>Delicious food<br />delivered to you</h1>
              <button type="button" className="primary-btn" onClick={() => setActiveView('Menu')}>
                Order Now
              </button>
            </div>

            <div className="hero-visual" aria-label="Food illustration">
              <div className="burger-blob">🍔</div>
              <div className="status-pill top-pill">🔥 4.8 Rating</div>
              <div className="status-pill bottom-pill">🚚 30 min</div>
            </div>
          </section>

          <section className="category-panel">
            <h2>Popular Categories</h2>
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  className={selectedCategory === category.name ? 'category-pill active' : 'category-pill'}
                  onClick={() => {
                    setSelectedCategory(category.name)
                    setActiveView('Menu')
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </section>

          <section className="food-panel">
            <h2>Popular Food</h2>
            <div className="food-grid">
              {foodItems.map((food) => (
                <article key={food.id} className="food-card">
                  <div className="food-icon">{food.icon}</div>
                  <span className="food-tag">{food.tag}</span>
                  <h3>{food.name}</h3>
                  <button type="button" className="card-btn" onClick={() => {
                    setSelectedFood(food)
                    setActiveView('Menu')
                  }}>
                    View Details
                  </button>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeView === 'Menu' && (
        <main className="page-content menu-page">
          <section className="toolbar">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food..."
              aria-label="Search food"
            />
          </section>

          <section className="menu-layout">
            <div className="menu-left">
              <div className="category-grid menu-category-grid">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    className={selectedCategory === category.name ? 'category-pill active' : 'category-pill'}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="food-grid product-grid">
                {filteredFoods.map((food) => (
                  <article
                    key={food.id}
                    className={selectedFood?.id === food.id ? 'food-card selected' : 'food-card'}
                    onClick={() => setSelectedFood(food)}
                  >
                    <div className="food-icon">{food.icon}</div>
                    <span className="food-tag">{food.tag}</span>
                    <h3>{food.name}</h3>
                    <div className="card-meta">
                      <span>⭐ {food.rating}</span>
                      <span>${food.price}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="food-detail-card">
              {selectedFood && (
                <>
                  <div className="detail-icon">{selectedFood.icon}</div>
                  <span className="food-tag">{selectedFood.tag}</span>
                  <h3>{selectedFood.name}</h3>
                  <p>{selectedFood.desc}</p>
                  <div className="detail-meta">
                    <span>⏱ {selectedFood.time}</span>
                    <span>⭐ {selectedFood.rating}</span>
                  </div>
                  <div className="detail-price-row">
                    <strong>${selectedFood.price}</strong>
                    <button type="button" className="primary-btn detail-btn" onClick={() => addToCart(selectedFood)}>
                      Add to Cart
                    </button>
                  </div>
                </>
              )}
            </aside>
          </section>
        </main>
      )}

      {activeView === 'Cart' && (
        <main className="page-content cart-page">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty.</div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-icon">{item.icon}</div>
                    <div className="cart-info">
                      <h3>{item.name}</h3>
                      <p>${item.price} each</p>
                    </div>
                    <div className="cart-actions">
                      <span>Qty: {item.qty}</span>
                      <strong>${(item.price * item.qty).toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <strong>$4.99</strong>
                </div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <strong>${(cartTotal + 4.99).toFixed(2)}</strong>
                </div>
                <button type="button" className="primary-btn checkout-btn">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {activeView === 'Login' && (
        <main className="page-content auth-page">
          <div className="auth-card">
            <div className="auth-tabs">
              <button type="button" className="auth-tab active">Login</button>
              <button type="button" className="auth-tab">Register</button>
            </div>

            <form className="auth-form">
              <label>
                Email
                <input type="email" placeholder="you@example.com" />
              </label>
              <label>
                Password
                <input type="password" placeholder="Enter your password" />
              </label>
              <button type="submit" className="primary-btn auth-btn">Continue</button>
            </form>
          </div>
        </main>
      )}
    </div>
  )
}

export default App
