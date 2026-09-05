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
  const [authMode, setAuthMode] = useState('login')
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('food-delivery-user') || 'null'))
  const [token, setToken] = useState(() => localStorage.getItem('food-delivery-token') || '')
  const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem('food-delivery-addresses') || '[]'))
  const [newAddress, setNewAddress] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => localStorage.setItem('food-delivery-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('food-delivery-user', JSON.stringify(user)), [user])
  useEffect(() => localStorage.setItem('food-delivery-addresses', JSON.stringify(addresses)), [addresses])
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
  const navigate = (view) => { setActiveView(view); setMobileMenuOpen(false) }
  const placeOrder = async () => {
    if (token) {
      try {
        const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ items: cart.map((item) => ({ foodId: item.id, quantity: item.qty })), deliveryAddress: addresses[0] || { street: location, city: 'Bengaluru' }, paymentMethod: 'cash' }) })
        if (!response.ok) throw new Error('Order request failed')
      } catch (error) { console.error(error) }
    }
    setOrderPlaced(true)
    setCart([])
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => navigate('Home')}><span className="brand-mark">+</span><span>morsel<span className="brand-dot">.</span></span></button>
        <nav className="nav-links" aria-label="Main navigation">{['Home', 'Menu', 'Orders', 'Admin'].map((item) => <button key={item} className={activeView === item ? 'active' : ''} onClick={() => navigate(item)}>{item}</button>)}</nav>
        <div className="top-actions"><button className="icon-button" aria-label="Wishlist" onClick={() => navigate('Wishlist')}>♡<span>{wishlist.length}</span></button><button className="cart-button" onClick={() => navigate('Cart')}>Bag <b>{cartCount}</b></button><button className="avatar" onClick={() => navigate(user ? 'Profile' : 'Login')}>{user?.initials || 'AR'}</button><button className="menu-toggle" aria-label="Open navigation menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>☰</button></div>
      </header>
      <button className="location-picker" onClick={() => setLocation(location === 'Indiranagar, Bengaluru' ? 'Koramangala, Bengaluru' : 'Indiranagar, Bengaluru')}><span className="pin">⌖</span><span><small>DELIVERING TO</small>{location}</span><b>⌄</b></button>
      {mobileMenuOpen && <nav className="mobile-menu" aria-label="Mobile navigation">{['Home', 'Menu', 'Orders', 'Wishlist', 'Admin'].map((item) => <button key={item} className={activeView === item ? 'active' : ''} onClick={() => navigate(item)}>{item}</button>)}<button onClick={() => navigate(user ? 'Profile' : 'Login')}>{user ? 'Profile' : 'Sign in'}</button></nav>}

      {activeView === 'Home' && <main>
        <section className="welcome-row"><div><p className="kicker">THURSDAY, 12 SEPTEMBER</p><h1>Good food, <em>good mood.</em></h1><p className="welcome-copy">Curated comfort food from the best kitchens around you.</p></div><div className="weather-note"><span>☀</span><div><b>28°C</b><small>Perfect for a biryani</small></div></div></section>
        <section className="search-hero"><div className="search-wrap"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} onFocus={() => setActiveView('Menu')} placeholder="Search dishes, restaurants or cuisines" /><kbd>⌘ K</kbd></div><div className="trending"><span>Trending:</span>{['Biryani', 'Pizza', 'Burgers', 'Momos'].map((item) => <button key={item} onClick={() => { setSearch(item); setActiveView('Menu') }}>{item}</button>)}</div></section>
        <section className="section-block"><div className="section-heading"><div><p className="kicker">EXPLORE BY MOOD</p><h2>What are you craving?</h2></div><button className="text-button" onClick={() => goToMenu()}>See all <span>↗</span></button></div><div className="cuisine-row">{cuisines.slice(1).map((item, index) => <button key={item} className={`cuisine-card cuisine-${index}`} onClick={() => goToMenu(item)}><span className="cuisine-art">{['◒', '✦', '●', '≋', '✺', '◌'][index]}</span><b>{item}</b><small>{[42, 36, 28, 24, 31, 18][index]} places</small></button>)}</div></section>
        <section className="section-block"><div className="section-heading"><div><p className="kicker">HANDPICKED FOR YOU</p><h2>Popular near you</h2></div><button className="text-button" onClick={() => goToMenu()}>View all <span>↗</span></button></div><div className="food-grid">{filteredFoods.slice(0, 3).map((food) => <FoodCard key={food.id} food={food} wished={wishlist.includes(food.id)} onWish={toggleWishlist} onAdd={addToCart} />)}</div></section>
        <section className="promo-strip"><div><p className="kicker">WEEKEND SPECIAL</p><h2>₹100 off your next order</h2><p>Use code <b>FIRSTBITE</b> on orders above ₹499</p></div><button onClick={() => { setCoupon('FIRSTBITE'); setActiveView('Cart') }}>Claim offer <span>→</span></button></section>
      </main>}

      {activeView === 'Menu' && <main className="content-page"><div className="page-title"><div><p className="kicker">THE FULL MENU</p><h1>Find your next favourite.</h1></div><div className="filter-note">{filteredFoods.length} dishes · <span>Sorted by relevance</span></div></div><div className="menu-toolbar"><div className="search-wrap compact"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search everything" /></div><div className="filter-row">{cuisines.map((item) => <button key={item} className={selectedCuisine === item ? 'selected' : ''} onClick={() => setSelectedCuisine(item)}>{item}</button>)}</div></div><div className="menu-layout"><div className="food-grid menu-grid">{filteredFoods.map((food) => <FoodCard key={food.id} food={food} wished={wishlist.includes(food.id)} onWish={toggleWishlist} onAdd={addToCart} />)}</div><aside className="order-aside"><p className="kicker">YOUR ORDER</p><h3>{cartCount ? `${cartCount} items in your bag` : 'Your bag is waiting'}</h3>{cart.slice(0, 2).map((item) => <div className="mini-order" key={item.id}><span>{item.name}</span><b>₹{item.price * item.qty}</b></div>)}<button className="primary-button full" onClick={() => setActiveView('Cart')}>{cartCount ? `View bag · ₹${subtotal}` : 'Start an order'} <span>→</span></button></aside></div></main>}
      {activeView === 'Wishlist' && <main className="content-page"><div className="page-title"><div><p className="kicker">SAVED FOR LATER</p><h1>Your wishlist.</h1></div></div><div className="food-grid menu-grid">{foods.filter((food) => wishlist.includes(food.id)).map((food) => <FoodCard key={food.id} food={food} wished onWish={toggleWishlist} onAdd={addToCart} />)}</div></main>}
      {activeView === 'Cart' && <main className="content-page"><div className="page-title"><div><p className="kicker">CHECKOUT</p><h1>Almost yours.</h1></div><span className="secure-note">⌁ Secure checkout</span></div>{orderPlaced ? <Tracking /> : <div className="checkout-layout"><div className="cart-list">{cart.length ? cart.map((item) => <div className="cart-line" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.restaurant}</p></div><b>₹{item.price * item.qty}</b><button onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))}>×</button></div>) : <div className="empty-state"><span>＋</span><h2>Your bag is empty</h2><p>Something delicious is only a few clicks away.</p><button className="primary-button" onClick={() => setActiveView('Menu')}>Browse menu</button></div>}</div><aside className="summary-card"><div className="coupon-input"><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Have a coupon?" /><button onClick={() => coupon && setAppliedCoupon(true)}>Apply</button></div><div className="summary-row"><span>Subtotal</span><b>₹{subtotal}</b></div><div className="summary-row"><span>Delivery fee</span><b className={delivery === 0 ? 'green-text' : ''}>{delivery ? `₹${delivery}` : 'FREE'}</b></div>{appliedCoupon && <div className="summary-row green-text"><span>FIRSTBITE</span><b>-₹100</b></div>}<div className="summary-total"><span>Total</span><b>₹{Math.max(total, 0)}</b></div><button disabled={!cart.length} className="primary-button full" onClick={placeOrder}>Place order <span>→</span></button></aside></div>}</main>}
      {activeView === 'Orders' && <main className="content-page"><div className="page-title"><div><p className="kicker">YOUR ORDERS</p><h1>Follow the flavour.</h1></div></div><Tracking past /></main>}
      {activeView === 'Admin' && <AdminDashboard />}
      {activeView === 'Login' && <AuthView mode={authMode} setMode={setAuthMode} onSubmit={(account, accountToken) => { setUser({ ...account, initials: account.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }); setToken(accountToken); localStorage.setItem('food-delivery-token', accountToken); setActiveView('Profile') }} />}
      {activeView === 'Profile' && <AccountView user={user} addresses={addresses} newAddress={newAddress} setNewAddress={setNewAddress} onAddAddress={() => { if (newAddress.trim()) { setAddresses((current) => [...current, { id: Date.now(), label: current.length ? 'Other' : 'Home', text: newAddress.trim() }]); setNewAddress('') } }} onRemoveAddress={(id) => setAddresses((current) => current.filter((address) => address.id !== id))} onLogout={() => { setUser(null); setActiveView('Login') }} onNavigate={setActiveView} />}
      {cartCount > 0 && activeView !== 'Cart' && <button className="mobile-cart-fab" onClick={() => navigate('Cart')}><span>Bag</span><b>{cartCount} · ₹{subtotal}</b><span>→</span></button>}
      <nav className="bottom-nav" aria-label="Mobile navigation"><button className={activeView === 'Home' ? 'active' : ''} onClick={() => navigate('Home')}><span>⌂</span>Home</button><button className={activeView === 'Menu' ? 'active' : ''} onClick={() => navigate('Menu')}><span>⌕</span>Menu</button><button className={activeView === 'Orders' ? 'active' : ''} onClick={() => navigate('Orders')}><span>◷</span>Orders</button><button className={activeView === 'Cart' ? 'active' : ''} onClick={() => navigate('Cart')}><span>▱</span>Bag</button></nav>
    </div>
  )
}

function FoodCard({ food, wished, onWish, onAdd }) {
  return <article className="food-card"><div className="food-image"><img src={food.image} alt={food.name} /><span className="food-tag">{food.tag}</span><button className={`wish-button ${wished ? 'wished' : ''}`} onClick={() => onWish(food.id)} aria-label="Save to wishlist">♡</button></div><div className="food-info"><div className="food-title"><h3>{food.name}</h3><span>★ {food.rating}</span></div><p>{food.restaurant} <i>·</i> {food.time}</p><div className="food-bottom"><strong>₹{food.price}</strong><button className="add-button" onClick={() => onAdd(food)}>+ Add</button></div><small className="review-count">{food.reviews} reviews</small></div></article>
}

function Tracking({ past = false }) {
  return <div className="tracking-layout"><div className="tracking-card"><div className="tracking-head"><div><p className="kicker">{past ? 'DELIVERED  ·  TODAY, 1:12 PM' : 'ORDER #MO-2841  ·  JUST NOW'}</p><h2>{past ? 'Delivered with care.' : 'Your order is on its way.'}</h2></div><span className="status-chip">{past ? 'Delivered' : '18 min left'}</span></div><div className="map-panel"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-dot start" /><div className="map-dot end">⌖</div><div className="delivery-pin">✦</div></div><div className="progress-steps"><div className="done"><span>✓</span><b>Confirmed</b><small>12:42 PM</small></div><div className="done"><span>✓</span><b>Preparing</b><small>12:48 PM</small></div><div className={!past ? 'current' : 'done'}><span>{past ? '✓' : '●'}</span><b>{past ? 'Delivered' : 'On the way'}</b><small>{past ? '1:12 PM' : 'Arriving soon'}</small></div></div></div><aside className="driver-card"><div className="driver-avatar">RK</div><div><p className="kicker">YOUR DELIVERY PARTNER</p><h3>Rakesh is on the way</h3><p>Royal Enfield · KA 05 MJ 2291</p></div><button className="call-button">☎</button></aside></div>
}

function AuthView({ mode, setMode, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const submit = async (event) => {
    event.preventDefault()
    const payload = mode === 'login' ? { email, password } : { name, email, password }
    try {
      const response = await fetch(`/api/auth/${mode === 'login' ? 'login' : 'register'}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to continue')
      onSubmit(data.user, data.token)
    } catch (requestError) {
      setError(requestError.message)
      if (requestError.message === 'Failed to fetch') onSubmit({ name: name || 'Ananya Rao', email: email || 'ananya@example.com' }, '')
    }
  }
  return <main className="content-page auth-page"><form className="auth-card" onSubmit={submit}><span className="brand-mark">+</span><p className="kicker">{mode === 'login' ? 'WELCOME BACK' : 'JOIN MORSEL'}</p><h1>{mode === 'login' ? 'Sign in to morsel.' : 'Make every meal yours.'}</h1>{mode === 'signup' && <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" required /> }<input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" type="email" required /><input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" required />{error && <p className="auth-error">{error}</p>}<button className="primary-button full" type="submit">{mode === 'login' ? 'Continue' : 'Create account'} <span>→</span></button><button className="auth-switch" type="button" onClick={() => { setError(''); setMode(mode === 'login' ? 'signup' : 'login') }}>{mode === 'login' ? 'New to morsel? Create an account' : 'Already have an account? Sign in'}</button></form></main>
}

function AccountView({ user, addresses, newAddress, setNewAddress, onAddAddress, onRemoveAddress, onLogout, onNavigate }) {
  return <main className="content-page account-page"><div className="page-title"><div><p className="kicker">YOUR MORSEL ACCOUNT</p><h1>Made for you.</h1></div><button className="text-button" onClick={onLogout}>Sign out</button></div><div className="account-layout"><aside className="profile-card"><div className="profile-avatar">{user?.initials || 'AR'}</div><h2>{user?.name || 'Ananya Rao'}</h2><p>{user?.email || 'ananya@example.com'}</p><button className="primary-button full" onClick={() => onNavigate('Orders')}>View order history <span>→</span></button></aside><section className="account-main"><div className="account-section"><div className="account-heading"><div><p className="kicker">SAVED PLACES</p><h2>Delivery addresses</h2></div><span>{addresses.length} saved</span></div><div className="address-list">{addresses.map((address) => <div className="address-row" key={address.id}><span className="address-icon">⌖</span><div><b>{address.label}</b><p>{address.text}</p></div><button onClick={() => onRemoveAddress(address.id)} aria-label={`Remove ${address.label} address`}>×</button></div>)}{!addresses.length && <p className="muted-copy">Add a home, work, or favourite delivery spot.</p>}</div><div className="address-form"><input value={newAddress} onChange={(event) => setNewAddress(event.target.value)} placeholder="Add an address, landmark or area" /><button className="add-button" onClick={onAddAddress}>+ Save address</button></div></div><div className="account-quick"><button onClick={() => onNavigate('Wishlist')}><span>♡</span><div><b>Favorites</b><small>Your saved dishes</small></div><strong>→</strong></button><button onClick={() => onNavigate('Orders')}><span>◷</span><div><b>Order history</b><small>Track past deliveries</small></div><strong>→</strong></button><button onClick={() => onNavigate('Cart')}><span>▱</span><div><b>Your cart</b><small>Ready when you are</small></div><strong>→</strong></button></div></section></div></main>
}

function AdminDashboard() {
  return <main className="content-page admin-page"><div className="page-title"><div><p className="kicker">OPERATIONS / OVERVIEW</p><h1>Good morning, Ananya.</h1></div><button className="export-button">↓ Export report</button></div><div className="stats-grid">{[['₹84,290', '+18.4%', 'Gross revenue'], ['1,248', '+12.8%', 'Orders today'], ['4.82', '+0.12', 'Avg. rating'], ['86%', '+6.2%', 'On-time delivery']].map(([value, change, label]) => <div className="stat-card" key={label}><p>{label}</p><strong>{value}</strong><span>{change} vs last week</span></div>)}</div><div className="analytics-grid"><section className="chart-card"><div className="chart-heading"><div><p className="kicker">REVENUE</p><h2>Weekly performance</h2></div><select><option>Last 7 days</option></select></div><div className="chart"><div className="chart-fill" /><svg viewBox="0 0 700 180" preserveAspectRatio="none"><polyline points="0,145 90,128 180,145 270,88 360,110 450,48 540,67 700,22" fill="none" stroke="currentColor" strokeWidth="4" /></svg><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></section><section className="chart-card"><p className="kicker">TOP CATEGORIES</p><h2>What people order</h2><div className="bar-row"><span>Indian</span><div><i style={{ width: '82%' }} /></div><b>32%</b></div><div className="bar-row"><span>Pizza</span><div><i style={{ width: '64%' }} /></div><b>24%</b></div><div className="bar-row"><span>Burgers</span><div><i style={{ width: '48%' }} /></div><b>18%</b></div><div className="bar-row"><span>Chinese</span><div><i style={{ width: '36%' }} /></div><b>14%</b></div></section></div></main>
}

export default App
