import React, { useMemo, useState } from "react";
import "./App.css";

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: ["North Indian", "Biryani", "Chinese"],
    rating: 4.6,
    reviews: 2400,
    deliveryTime: "25-30 mins",
    priceForTwo: 450,
    offer: "50% OFF up to ₹100",
    location: "Civil Lines",
    description:
      "Authentic Indian flavours, delicious biryanis and freshly prepared meals.",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80",
    menu: {
      "Recommended": [
        {
          id: 101,
          name: "Chicken Biryani",
          description: "Fragrant basmati rice with tender chicken and aromatic spices.",
          price: 249,
          rating: 4.7,
          image:
            "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=500&q=80",
          customizable: true,
          bestseller: true,
        },
        {
          id: 102,
          name: "Paneer Butter Masala",
          description: "Soft paneer cooked in a rich creamy tomato gravy.",
          price: 229,
          rating: 4.6,
          image:
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80",
          customizable: true,
        },
      ],
      "Starters": [
        {
          id: 103,
          name: "Chicken Tikka",
          description: "Juicy grilled chicken pieces marinated in Indian spices.",
          price: 219,
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",
          customizable: true,
        },
        {
          id: 104,
          name: "Paneer Tikka",
          description: "Grilled paneer with capsicum and onion.",
          price: 199,
          rating: 4.4,
          image:
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
        },
      ],
      "Main Course": [
        {
          id: 105,
          name: "Butter Chicken",
          description: "Classic creamy tomato-based chicken curry.",
          price: 279,
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
          customizable: true,
          bestseller: true,
        },
        {
          id: 106,
          name: "Dal Makhani",
          description: "Slow-cooked black lentils with butter and cream.",
          price: 179,
          rating: 4.6,
          image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
        },
      ],
      "Breads & Rice": [
        {
          id: 107,
          name: "Butter Naan",
          description: "Soft tandoori naan topped with butter.",
          price: 49,
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
        },
        {
          id: 108,
          name: "Jeera Rice",
          description: "Aromatic basmati rice with roasted cumin.",
          price: 129,
          rating: 4.4,
          image:
            "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=80",
        },
      ],
      "Desserts": [
        {
          id: 109,
          name: "Gulab Jamun",
          description: "Soft milk-solid dumplings soaked in sugar syrup.",
          price: 99,
          rating: 4.7,
          image:
            "https://images.unsplash.com/photo-1666190094762-9f3f7c1b3c0e?auto=format&fit=crop&w=500&q=80",
        },
        {
          id: 110,
          name: "Rasmalai",
          description: "Soft paneer dumplings in sweet saffron milk.",
          price: 129,
          rating: 4.6,
          image:
            "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80",
        },
      ],
    },
  },

  {
    id: 2,
    name: "Pizza Hub",
    cuisine: ["Pizza", "Italian", "Fast Food"],
    rating: 4.4,
    reviews: 1800,
    deliveryTime: "20-25 mins",
    priceForTwo: 550,
    offer: "20% OFF",
    location: "Mall Road",
    description:
      "Freshly baked pizzas, cheesy sides and delicious Italian favourites.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80",
    menu: {
      Recommended: [
        {
          id: 201,
          name: "Farmhouse Pizza",
          description: "Loaded with onion, capsicum, tomato and mushrooms.",
          price: 299,
          rating: 4.6,
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80",
          customizable: true,
          bestseller: true,
        },
        {
          id: 202,
          name: "Margherita Pizza",
          description: "Classic tomato sauce, mozzarella and fresh basil.",
          price: 249,
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=500&q=80",
          customizable: true,
        },
      ],
      "Sides": [
        {
          id: 203,
          name: "Garlic Bread",
          description: "Crispy bread topped with garlic butter.",
          price: 149,
          rating: 4.4,
          image:
            "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=80",
        },
        {
          id: 204,
          name: "Cheese Sticks",
          description: "Golden baked bread sticks with melted cheese.",
          price: 179,
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1619535860434-cf9b902a7a1d?auto=format&fit=crop&w=500&q=80",
        },
      ],
    },
  },

  {
    id: 3,
    name: "Burger Point",
    cuisine: ["Burgers", "Fast Food", "American"],
    rating: 4.3,
    reviews: 1200,
    deliveryTime: "15-20 mins",
    priceForTwo: 350,
    offer: "30% OFF",
    location: "Station Road",
    description:
      "Juicy burgers, crispy fries and refreshing drinks.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    menu: {
      Recommended: [
        {
          id: 301,
          name: "Classic Chicken Burger",
          description: "Crispy chicken patty with lettuce, cheese and sauce.",
          price: 199,
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
          customizable: true,
          bestseller: true,
        },
        {
          id: 302,
          name: "Veg Cheese Burger",
          description: "Crispy veg patty with cheese and fresh vegetables.",
          price: 169,
          rating: 4.4,
          image:
            "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=500&q=80",
          customizable: true,
        },
      ],
      "Sides": [
        {
          id: 303,
          name: "French Fries",
          description: "Crispy golden fries seasoned with salt.",
          price: 99,
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80",
        },
      ],
    },
  },
];

const reviews = [
  {
    name: "Rahul",
    rating: 5,
    text: "Amazing food and very fast delivery. Highly recommended!",
  },
  {
    name: "Priya",
    rating: 4,
    text: "Food was tasty and nicely packed.",
  },
  {
    name: "Aman",
    rating: 5,
    text: "The biryani was excellent. Will order again.",
  },
];

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const [cart, setCart] = useState([]);
  const [customizingItem, setCustomizingItem] = useState(null);

  const [customization, setCustomization] = useState({
    size: "Regular",
    spice: "Medium",
    extras: [],
  });

  const [showCart, setShowCart] = useState(false);

  const cuisines = [
    "All",
    "North Indian",
    "Biryani",
    "Chinese",
    "Pizza",
    "Italian",
    "Fast Food",
    "Burgers",
  ];

  const getDeliveryMinutes = (time) => {
    const match = time.match(/\d+/);
    return match ? Number(match[0]) : 999;
  };

  const filteredRestaurants = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = restaurants.filter((restaurant) => {
      const searchableText = [
        restaurant.name,
        ...restaurant.cuisine,
        restaurant.description,
        restaurant.location,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesCuisine =
        selectedCuisine === "All" ||
        restaurant.cuisine.some(
          (cuisine) =>
            cuisine.toLowerCase() === selectedCuisine.toLowerCase()
        );

      return matchesSearch && matchesCuisine;
    });

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "delivery") {
      result.sort(
        (a, b) =>
          getDeliveryMinutes(a.deliveryTime) -
          getDeliveryMinutes(b.deliveryTime)
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.priceForTwo - b.priceForTwo);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.priceForTwo - a.priceForTwo);
    }

    return result;
  }, [search, selectedCuisine, sortBy]);

  const addToCart = (item, options = null) => {
    const key = options
      ? `${item.id}-${options.size}-${options.spice}-${options.extras.join(",")}`
      : `${item.id}-default`;

    setCart((currentCart) => {
      const existing = currentCart.find(
        (cartItem) => cartItem.key === key
      );

      if (existing) {
        return currentCart.map((cartItem) =>
          cartItem.key === key
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          key,
          quantity: 1,
          options,
          restaurantId: selectedRestaurant.id,
        },
      ];
    });

    setCustomizingItem(null);
  };

  const changeQuantity = (key, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const getItemQuantity = (itemId) => {
    return cart
      .filter((item) => item.id === itemId)
      .reduce((total, item) => total + item.quantity, 0);
  };

  const openCustomization = (item) => {
    setCustomization({
      size: "Regular",
      spice: "Medium",
      extras: [],
    });

    setCustomizingItem(item);
  };

  const toggleExtra = (extra) => {
    setCustomization((current) => ({
      ...current,
      extras: current.extras.includes(extra)
        ? current.extras.filter((item) => item !== extra)
        : [...current.extras, extra],
    }));
  };

  if (selectedRestaurant) {
    return (
      <div className="app">
        <header className="navbar">
          <div
            className="logo"
            onClick={() => setSelectedRestaurant(null)}
          >
            <span>🍴</span> Foodie
          </div>

          <button
            className="back-btn"
            onClick={() => setSelectedRestaurant(null)}
          >
            ← Back
          </button>

          <button
            className="cart-button"
            onClick={() => setShowCart(true)}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </header>

        <main className="restaurant-page">
          <section className="restaurant-hero">
            <img
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
            />

            <div className="restaurant-overlay">
              <div>
                <span className="offer-badge">
                  {selectedRestaurant.offer}
                </span>

                <h1>{selectedRestaurant.name}</h1>

                <p>{selectedRestaurant.description}</p>

                <div className="restaurant-meta">
                  <span>⭐ {selectedRestaurant.rating}</span>
                  <span>
                    {selectedRestaurant.reviews.toLocaleString()}+ reviews
                  </span>
                  <span>🕒 {selectedRestaurant.deliveryTime}</span>
                  <span>₹{selectedRestaurant.priceForTwo} for two</span>
                </div>

                <p>📍 {selectedRestaurant.location}</p>

                <div className="cuisine-list">
                  {selectedRestaurant.cuisine.map((cuisine) => (
                    <span key={cuisine}>{cuisine}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="restaurant-content">
            <div className="menu-area">
              <div className="menu-heading">
                <div>
                  <h2>Menu</h2>
                  <p>
                    {Object.values(selectedRestaurant.menu).flat()
                      .length}{" "}
                    items
                  </p>
                </div>
              </div>

              {Object.entries(selectedRestaurant.menu).map(
                ([category, items]) => (
                  <section
                    className="menu-category"
                    key={category}
                  >
                    <h2>{category}</h2>

                    <div className="menu-items">
                      {items.map((item) => {
                        const quantity = getItemQuantity(item.id);

                        return (
                          <article
                            className="food-card"
                            key={item.id}
                          >
                            <div className="food-info">
                              {item.bestseller && (
                                <span className="bestseller">
                                  Bestseller
                                </span>
                              )}

                              <h3>{item.name}</h3>

                              <div className="food-rating">
                                ⭐ {item.rating}
                              </div>

                              <strong>₹{item.price}</strong>

                              <p>{item.description}</p>
                            </div>

                            <div className="food-image-wrapper">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="food-image"
                              />

                              {quantity === 0 ? (
                                <button
                                  className="add-button"
                                  onClick={() =>
                                    item.customizable
                                      ? openCustomization(item)
                                      : addToCart(item)
                                  }
                                >
                                  ADD
                                </button>
                              ) : (
                                <div className="quantity-control">
                                  <button
                                    onClick={() => {
                                      const cartItem = cart.find(
                                        (cartItem) =>
                                          cartItem.id === item.id
                                      );

                                      if (cartItem) {
                                        changeQuantity(
                                          cartItem.key,
                                          -1
                                        );
                                      }
                                    }}
                                  >
                                    −
                                  </button>

                                  <span>{quantity}</span>

                                  <button
                                    onClick={() =>
                                      item.customizable
                                        ? openCustomization(item)
                                        : addToCart(item)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                )
              )}

              <section className="reviews-section">
                <h2>Ratings & Reviews</h2>

                <div className="overall-rating">
                  <div className="big-rating">
                    <strong>{selectedRestaurant.rating}</strong>
                    <span>★★★★★</span>
                    <small>
                      {selectedRestaurant.reviews.toLocaleString()}+
                      ratings
                    </small>
                  </div>

                  <div className="rating-bars">
                    <div>
                      5 ⭐ <span className="bar">
                        <i style={{ width: "85%" }} />
                      </span>
                    </div>
                    <div>
                      4 ⭐ <span className="bar">
                        <i style={{ width: "65%" }} />
                      </span>
                    </div>
                    <div>
                      3 ⭐ <span className="bar">
                        <i style={{ width: "35%" }} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="review-list">
                  {reviews.map((review, index) => (
                    <div className="review" key={index}>
                      <div className="review-header">
                        <strong>{review.name}</strong>
                        <span>⭐ {review.rating}</span>
                      </div>

                      <p>{review.text}</p>

                      <small>Ordered recently</small>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="desktop-cart">
              <CartBox
                cart={cart}
                cartTotal={cartTotal}
                changeQuantity={changeQuantity}
              />
            </aside>
          </div>
        </main>

        {cartCount > 0 && (
          <button
            className="mobile-cart-button"
            onClick={() => setShowCart(true)}
          >
            <span>
              {cartCount} item{cartCount > 1 ? "s" : ""}
            </span>
            <strong>View Cart →</strong>
          </button>
        )}

        {customizingItem && (
          <CustomizationModal
            item={customizingItem}
            customization={customization}
            setCustomization={setCustomization}
            toggleExtra={toggleExtra}
            onClose={() => setCustomizingItem(null)}
            onAdd={() =>
              addToCart(customizingItem, customization)
            }
          />
        )}

        {showCart && (
          <div
            className="modal-background"
            onClick={() => setShowCart(false)}
          >
            <div
              className="cart-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Your Cart</h2>
                <button onClick={() => setShowCart(false)}>
                  ×
                </button>
              </div>

              <CartBox
                cart={cart}
                cartTotal={cartTotal}
                changeQuantity={changeQuantity}
              />

              {cart.length > 0 && (
                <button
                  className="checkout-button"
                  onClick={() =>
                    alert(
                      "Checkout page will be added in the next upgrade!"
                    )
                  }
                >
                  Proceed to Checkout • ₹{cartTotal}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span>🍴</span> Foodie
        </div>

        <div className="location">
          📍 Delhi
        </div>

        <button
          className="cart-button"
          onClick={() => {
            if (cart.length > 0) {
              setSelectedRestaurant(
                restaurants.find(
                  (restaurant) =>
                    restaurant.id === cart[0].restaurantId
                )
              );
              setShowCart(true);
            }
          }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
      </header>

      <main>
        <section className="home-hero">
          <div>
            <span className="hero-label">
              #1 FOOD DELIVERY EXPERIENCE
            </span>

            <h1>
              Delicious food,
              <br />
              delivered to you.
            </h1>

            <p>
              Discover the best restaurants and dishes around you.
            </p>

            <div className="search-box">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Search for restaurants or dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="main-container">
          <div className="section-title">
            <div>
              <h2>Restaurants near you</h2>
              <p>
                {filteredRestaurants.length} restaurants available
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Top Rated</option>
              <option value="delivery">Fast Delivery</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
            </select>
          </div>

          <div className="cuisine-filter">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                className={
                  selectedCuisine === cuisine ? "active" : ""
                }
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine}
              </button>
            ))}
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="empty-state">
              <div>🍽️</div>
              <h2>No restaurants found</h2>
              <p>
                Try another search or cuisine category.
              </p>
            </div>
          ) : (
            <div className="restaurant-grid">
              {filteredRestaurants.map((restaurant) => (
                <article
                  className="restaurant-card"
                  key={restaurant.id}
                  onClick={() =>
                    setSelectedRestaurant(restaurant)
                  }
                >
                  <div className="restaurant-card-image">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                    />

                    {restaurant.offer && (
                      <span className="card-offer">
                        {restaurant.offer}
                      </span>
                    )}

                    <span className="delivery-time">
                      {restaurant.deliveryTime}
                    </span>
                  </div>

                  <div className="restaurant-card-body">
                    <div className="card-title">
                      <h3>{restaurant.name}</h3>
                      <span className="card-rating">
                        ⭐ {restaurant.rating}
                      </span>
                    </div>

                    <p>
                      {restaurant.cuisine.join(" • ")}
                    </p>

                    <p className="restaurant-location">
                      📍 {restaurant.location}
                    </p>

                    <div className="card-bottom">
                      <span>
                        ₹{restaurant.priceForTwo} for two
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRestaurant(restaurant);
                        }}
                      >
                        View Menu →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function CartBox({
  cart,
  cartTotal,
  changeQuantity,
}) {
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div>🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add something delicious from the menu.</p>
      </div>
    );
  }

  return (
    <div className="cart-box">
      <h2>Cart</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.key}>
            <div>
              <h4>{item.name}</h4>

              {item.options && (
                <small>
                  {item.options.size} • {item.options.spice}
                  {item.options.extras.length > 0 &&
                    ` • ${item.options.extras.join(", ")}`}
                </small>
              )}

              <p>₹{item.price}</p>
            </div>

            <div className="cart-quantity">
              <button
                onClick={() => changeQuantity(item.key, -1)}
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => changeQuantity(item.key, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div>
          <span>Item total</span>
          <strong>₹{cartTotal}</strong>
        </div>

        <div>
          <span>Delivery fee</span>
          <span>₹40</span>
        </div>

        <div>
          <span>Taxes & charges</span>
          <span>₹25</span>
        </div>

        <hr />

        <div className="grand-total">
          <strong>To Pay</strong>
          <strong>₹{cartTotal + 65}</strong>
        </div>
      </div>
    </div>
  );
}

function CustomizationModal({
  item,
  customization,
  setCustomization,
  toggleExtra,
  onClose,
  onAdd,
}) {
  const extrasPrice = customization.extras.length * 30;

  return (
    <div
      className="modal-background"
      onClick={onClose}
    >
      <div
        className="customization-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="customization-image">
          <img src={item.image} alt={item.name} />
        </div>

        <div className="customization-content">
          <button className="close-button" onClick={onClose}>
            ×
          </button>

          <h2>{item.name}</h2>

          <p>{item.description}</p>

          <div className="custom-section">
            <h3>Choose Size</h3>

            {["Regular", "Large"].map((size) => (
              <label key={size} className="option">
                <input
                  type="radio"
                  name="size"
                  checked={customization.size === size}
                  onChange={() =>
                    setCustomization((current) => ({
                      ...current,
                      size,
                    }))
                  }
                />

                <span>{size}</span>

                <strong>
                  {size === "Large" ? "+₹50" : "Included"}
                </strong>
              </label>
            ))}
          </div>

          <div className="custom-section">
            <h3>Spice Level</h3>

            {["Mild", "Medium", "Spicy"].map((spice) => (
              <label key={spice} className="option">
                <input
                  type="radio"
                  name="spice"
                  checked={customization.spice === spice}
                  onChange={() =>
                    setCustomization((current) => ({
                      ...current,
                      spice,
                    }))
                  }
                />

                <span>{spice}</span>
              </label>
            ))}
          </div>

          <div className="custom-section">
            <h3>Extra Toppings</h3>

            {["Extra Cheese", "Onion", "Jalapeño"].map(
              (extra) => (
                <label key={extra} className="option">
                  <input
                    type="checkbox"
                    checked={customization.extras.includes(extra)}
                    onChange={() => toggleExtra(extra)}
                  />

                  <span>{extra}</span>
                  <strong>+₹30</strong>
                </label>
              )
            )}
          </div>

          <button className="add-custom-button" onClick={onAdd}>
            Add to Cart • ₹
            {item.price +
              (customization.size === "Large" ? 50 : 0) +
              extrasPrice}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;