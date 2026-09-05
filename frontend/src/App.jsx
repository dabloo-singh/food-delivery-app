import { useEffect, useMemo, useState } from 'react'
import './App.css'

const cuisines = ['All', 'Indian', 'Pizza', 'Burgers', 'Chinese', 'Healthy', 'Desserts']
const starterFoods = [
  { id: 1, name: 'Butter Chicken Bowl', restaurant: 'The Curry Room', category: 'Indian', price: 289, rating: 4.8, reviews: 342, time: '28 min', tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80' },
  { id: 2, name: 'Truffle Mushroom Pizza', restaurant: 'Olive & Ember', category: 'Pizza', price: 449, rating: 4.9, reviews: 218, time: '32 min', tag: 'Top rated', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80' },
  { id: 3, name: 'Smash & Stack Burger', restaurant: 'Stacked', category: 'Burgers', price: 329, rating: 4.7, reviews: 189, time: '24 min', tag: '20% off', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80' },
  { id: 4, name: 'Chilli Garlic Noodles', restaurant: 'Wok Street', category: 'Chinese', price: 249, rating: 4.6, reviews: 156, time: '21 min', tag: 'Popular', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80' },
  { id: 5, name: 'Green Goddess Bowl', restaurant: 'Green Table', category: 'Healthy', price: 299, rating: 4.7, reviews: 94, time: '18 min', tag: 'Fresh pick', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80' },
  { id: 6, name: 'Mango Tres Leches', restaurant: 'Sugar Rush', category: 'Desserts', price: 199, rating: 4.8, reviews: 122, time: '15 min', tag: 'New', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80' },
]

function App() {
  const [foods, setFoods] = useState(starterFoods)
  const [activeView, setActiveView] = useState('Home')
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('Indiranagar, Bengaluru')
  const [wishlist, setWishlist] = useState([2])
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('food-delivery-cart') || '[]'))

  useEffect(() => localStorage.setItem('food-delivery-cart', JSON.stringify(cart)), [cart])
  useEffect(() => {
    fetch('/api/foods').then((response) => response.json()).then((data) => {
      if (Array.isArray(data) && data.length) setFoods(data.map((food, index) => ({ ...starterFoods[index % starterFoods.length], ...food, id: food._id || index })))
    }).catch(() => {})
  }, [])

  const filteredFoods = useMemo(() => foods.filter((food) => {
    const query = search.toLowerCase()
    return (selectedCuisine === 'All' || food.category === selectedCuisine) && (`${food.name} ${food.restaurant} ${food.category}`).toLowerCase().includes(query)
  }), [foods, search, selectedCuisine])
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0)
  const delivery = subtotal > 499 || appliedCoupon ? 0 : 39
  const total = subtotal + delivery - (appliedCoupon ? 100 : 0)
  const addToCart = (food) => setCart((current) => {
    const found = current.find((item) => item.id === food.id)
    return found ? current.map((item) => item.id === food.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...food, qty: 1 }]
  })
  const toggleWishlist = (id) => setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const goToMenu = (cuisine = 'All') => { setSelectedCuisine(cuisine); setActiveView('Menu') }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setActiveView('Home')}><span className="brand-mark">+</span><span>morsel<span className="brand-dot">.</span></span></button>
        <button className="location-picker" onClick={() => setLocation(location === 'Indiranagar, Bengaluru' ? 'Koramangala, Bengaluru' : 'Indiranagar, Bengaluru')}><span className="pin">⌖</span><span><small>DELIVERING TO</small>{location}</span><b>⌄</b></button>
        <nav className="nav-links" aria-label="Main navigation">{['Home', 'Menu', 'Orders', 'Admin'].map((item) => <button key={item} className={activeView === item ? 'active' : ''} onClick={() => setActiveView(item)}>{item}</button>)}</nav>
        <div className="top-actions"><button className="icon-button" aria-label="Wishlist" onClick={() => setActiveView('Wishlist')}>♡<span>{wishlist.length}</span></button><button className="cart-button" onClick={() => setActiveView('Cart')}>Bag <b>{cartCount}</b></button><button className="avatar" onClick={() => setActiveView('Login')}>AR</button></div>
      </header>

      {activeView === 'Home' && <main>
        <section className="welcome-row"><div><p className="kicker">THURSDAY, 12 SEPTEMBER</p><h1>Good food, <em>good mood.</em></h1><p className="welcome-copy">Curated comfort food from the best kitchens around you.</p></div><div className="weather-note"><span>☀</span><div><b>28°C</b><small>Perfect for a biryani</small></div></div></section>
        <section className="search-hero"><div className="search-wrap"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} onFocus={() => setActiveView('Menu')} placeholder="Search dishes, restaurants or cuisines" /><kbd>⌘ K</kbd></div><div className="trending"><span>Trending:</span>{['Biryani', 'Pizza', 'Burgers', 'Momos'].map((item) => <button key={item} onClick={() => { setSearch(item); setActiveView('Menu') }}>{item}</button>)}</div></section>
        <section className="section-block"><div className="section-heading"><div><p className="kicker">EXPLORE BY MOOD</p><h2>What are you craving?</h2></div><button className="text-button" onClick={() => goToMenu()}>See all <span>↗</span></button></div><div className="cuisine-row">{cuisines.slice(1).map((item, index) => <button key={item} className={`cuisine-card cuisine-${index}`} onClick={() => goToMenu(item)}><span className="cuisine-art">{['◒', '✦', '●', '≋', '✺', '◌'][index]}</span><b>{item}</b><small>{[42, 36, 28, 24, 31, 18][index]} places</small></button>)}</div></section>
        <section className="section-block"><div className="section-heading"><div><p className="kicker">HANDPICKED FOR YOU</p><h2>Popular near you</h2></div><button className="text-button" onClick={() => goToMenu()}>View all <span>↗</span></button></div><div className="food-grid">{filteredFoods.slice(0, 3).map((food) => <FoodCard key={food.id} food={food} wished={wishlist.includes(food.id)} onWish={toggleWishlist} onAdd={addToCart} />)}</div></section>
        <section className="promo-strip"><div><p className="kicker">WEEKEND SPECIAL</p><h2>₹100 off your next order</h2><p>Use code <b>FIRSTBITE</b> on orders above ₹499</p></div><button onClick={() => { setCoupon('FIRSTBITE'); setActiveView('Cart') }}>Claim offer <span>→</span></button></section>
      </main>}

      {activeView === 'Menu' && <main className="content-page"><div className="page-title"><div><p className="kicker">THE FULL MENU</p><h1>Find your next favourite.</h1></div><div className="filter-note">{filteredFoods.length} dishes · <span>Sorted by relevance</span></div></div><div className="menu-toolbar"><div className="search-wrap compact"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search everything" /></div><div className="filter-row">{cuisines.map((item) => <button key={item} className={selectedCuisine === item ? 'selected' : ''} onClick={() => setSelectedCuisine(item)}>{item}</button>)}</div></div><div className="menu-layout"><div className="food-grid menu-grid">{filteredFoods.map((food) => <FoodCard key={food.id} food={food} wished={wishlist.includes(food.id)} onWish={toggleWishlist} onAdd={addToCart} />)}</div><aside className="order-aside"><p className="kicker">YOUR ORDER</p><h3>{cartCount ? `${cartCount} items in your bag` : 'Your bag is waiting'}</h3>{cart.slice(0, 2).map((item) => <div className="mini-order" key={item.id}><span>{item.name}</span><b>₹{item.price * item.qty}</b></div>)}<button className="primary-button full" onClick={() => setActiveView('Cart')}>{cartCount ? `View bag · ₹${subtotal}` : 'Start an order'} <span>→</span></button></aside></div></main>}
      {activeView === 'Wishlist' && <main className="content-page"><div className="page-title"><div><p className="kicker">SAVED FOR LATER</p><h1>Your wishlist.</h1></div></div><div className="food-grid menu-grid">{foods.filter((food) => wishlist.includes(food.id)).map((food) => <FoodCard key={food.id} food={food} wished onWish={toggleWishlist} onAdd={addToCart} />)}</div></main>}
      {activeView === 'Cart' && <main className="content-page"><div className="page-title"><div><p className="kicker">CHECKOUT</p><h1>Almost yours.</h1></div><span className="secure-note">⌁ Secure checkout</span></div>{orderPlaced ? <Tracking /> : <div className="checkout-layout"><div className="cart-list">{cart.length ? cart.map((item) => <div className="cart-line" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.restaurant}</p></div><b>₹{item.price * item.qty}</b><button onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))}>×</button></div>) : <div className="empty-state"><span>＋</span><h2>Your bag is empty</h2><p>Something delicious is only a few clicks away.</p><button className="primary-button" onClick={() => setActiveView('Menu')}>Browse menu</button></div>}</div><aside className="summary-card"><div className="coupon-input"><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Have a coupon?" /><button onClick={() => coupon && setAppliedCoupon(true)}>Apply</button></div><div className="summary-row"><span>Subtotal</span><b>₹{subtotal}</b></div><div className="summary-row"><span>Delivery fee</span><b className={delivery === 0 ? 'green-text' : ''}>{delivery ? `₹${delivery}` : 'FREE'}</b></div>{appliedCoupon && <div className="summary-row green-text"><span>FIRSTBITE</span><b>-₹100</b></div>}<div className="summary-total"><span>Total</span><b>₹{Math.max(total, 0)}</b></div><button disabled={!cart.length} className="primary-button full" onClick={() => { setOrderPlaced(true); setCart([]) }}>Place order <span>→</span></button></aside></div>}</main>}
      {activeView === 'Orders' && <main className="content-page"><div className="page-title"><div><p className="kicker">YOUR ORDERS</p><h1>Follow the flavour.</h1></div></div><Tracking past /></main>}
      {activeView === 'Admin' && <AdminDashboard />}
      {activeView === 'Login' && <main className="content-page auth-page"><div className="auth-card"><span className="brand-mark">+</span><p className="kicker">WELCOME BACK</p><h1>Sign in to morsel.</h1><input placeholder="Email address" /><input placeholder="Password" type="password" /><button className="primary-button full">Continue <span>→</span></button></div></main>}
    </div>
  )
}

function FoodCard({ food, wished, onWish, onAdd }) {
  return <article className="food-card"><div className="food-image"><img src={food.image} alt={food.name} /><span className="food-tag">{food.tag}</span><button className={`wish-button ${wished ? 'wished' : ''}`} onClick={() => onWish(food.id)} aria-label="Save to wishlist">♡</button></div><div className="food-info"><div className="food-title"><h3>{food.name}</h3><span>★ {food.rating}</span></div><p>{food.restaurant} <i>·</i> {food.time}</p><div className="food-bottom"><strong>₹{food.price}</strong><button className="add-button" onClick={() => onAdd(food)}>+ Add</button></div><small className="review-count">{food.reviews} reviews</small></div></article>
}

function Tracking({ past = false }) {
  return <div className="tracking-layout"><div className="tracking-card"><div className="tracking-head"><div><p className="kicker">{past ? 'DELIVERED  ·  TODAY, 1:12 PM' : 'ORDER #MO-2841  ·  JUST NOW'}</p><h2>{past ? 'Delivered with care.' : 'Your order is on its way.'}</h2></div><span className="status-chip">{past ? 'Delivered' : '18 min left'}</span></div><div className="map-panel"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-dot start" /><div className="map-dot end">⌖</div><div className="delivery-pin">✦</div></div><div className="progress-steps"><div className="done"><span>✓</span><b>Confirmed</b><small>12:42 PM</small></div><div className="done"><span>✓</span><b>Preparing</b><small>12:48 PM</small></div><div className={!past ? 'current' : 'done'}><span>{past ? '✓' : '●'}</span><b>{past ? 'Delivered' : 'On the way'}</b><small>{past ? '1:12 PM' : 'Arriving soon'}</small></div></div></div><aside className="driver-card"><div className="driver-avatar">RK</div><div><p className="kicker">YOUR DELIVERY PARTNER</p><h3>Rakesh is on the way</h3><p>Royal Enfield · KA 05 MJ 2291</p></div><button className="call-button">☎</button></aside></div>
}

function AdminDashboard() {
  return <main className="content-page admin-page"><div className="page-title"><div><p className="kicker">OPERATIONS / OVERVIEW</p><h1>Good morning, Ananya.</h1></div><button className="export-button">↓ Export report</button></div><div className="stats-grid">{[['₹84,290', '+18.4%', 'Gross revenue'], ['1,248', '+12.8%', 'Orders today'], ['4.82', '+0.12', 'Avg. rating'], ['86%', '+6.2%', 'On-time delivery']].map(([value, change, label]) => <div className="stat-card" key={label}><p>{label}</p><strong>{value}</strong><span>{change} vs last week</span></div>)}</div><div className="analytics-grid"><section className="chart-card"><div className="chart-heading"><div><p className="kicker">REVENUE</p><h2>Weekly performance</h2></div><select><option>Last 7 days</option></select></div><div className="chart"><div className="chart-fill" /><svg viewBox="0 0 700 180" preserveAspectRatio="none"><polyline points="0,145 90,128 180,145 270,88 360,110 450,48 540,67 700,22" fill="none" stroke="currentColor" strokeWidth="4" /></svg><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></section><section className="chart-card"><p className="kicker">TOP CATEGORIES</p><h2>What people order</h2><div className="bar-row"><span>Indian</span><div><i style={{ width: '82%' }} /></div><b>32%</b></div><div className="bar-row"><span>Pizza</span><div><i style={{ width: '64%' }} /></div><b>24%</b></div><div className="bar-row"><span>Burgers</span><div><i style={{ width: '48%' }} /></div><b>18%</b></div><div className="bar-row"><span>Chinese</span><div><i style={{ width: '36%' }} /></div><b>14%</b></div></section></div></main>
}

export default App
