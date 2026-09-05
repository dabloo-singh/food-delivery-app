import { useEffect, useMemo, useState } from "react";
import "./App.css";

/* =========================================================
   DEMO DATA
   Used automatically if the backend does not return data.
========================================================= */

const demoRestaurants = [
  {
    id: "spice-garden",
    name: "Spice Garden",
    description:
      "Authentic North Indian food prepared with fresh ingredients and traditional spices.",
    cuisine: ["North Indian", "Biryani"],
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",
    address: {
      street: "MG Road",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110001",
    },
    rating: 4.7,
    reviewCount: 1250,
    reviews: 1250,
    isOpen: true,
    deliveryTime: "25-30 mins",
    priceForTwo: 550,
    offer: "20% OFF up to ₹100",
  },
  {
    id: "pizza-hub",
    name: "Pizza Hub",
    description:
      "Wood-fired pizzas, creamy pastas and delicious Italian favourites.",
    cuisine: ["Pizza", "Italian", "Fast Food"],
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85",
    address: {
      street: "Mall Road",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110001",
    },
    rating: 4.4,
    reviewCount: 890,
    reviews: 890,
    isOpen: true,
    deliveryTime: "20-25 mins",
    priceForTwo: 650,
    offer: "20% OFF",
  },
  {
    id: "burger-point",
    name: "Burger Point",
    description:
      "Juicy burgers, crispy fries and refreshing drinks made fresh to order.",
    cuisine: ["Burgers", "Fast Food", "American"],
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
    address: {
      street: "Connaught Place",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110001",
    },
    rating: 4.3,
    reviewCount: 720,
    reviews: 720,
    isOpen: true,
    deliveryTime: "15-20 mins",
    priceForTwo: 450,
    offer: "30% OFF",
  },
  {
    id: "wok-express",
    name: "Wok Express",
    description:
      "Delicious Chinese noodles, fried rice and Asian street food.",
    cuisine: ["Chinese", "Asian"],
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=1000&q=85",
    address: {
      street: "Lajpat Nagar",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110024",
    },
    rating: 4.5,
    reviewCount: 650,
    reviews: 650,
    isOpen: true,
    deliveryTime: "25-35 mins",
    priceForTwo: 500,
    offer: "₹125 OFF",
  },
  {
    id: "biryani-house",
    name: "Biryani House",
    description:
      "Royal dum biryani prepared with fragrant basmati rice and authentic spices.",
    cuisine: ["Biryani", "North Indian"],
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=85",
    address: {
      street: "Karol Bagh",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110005",
    },
    rating: 4.8,
    reviewCount: 1450,
    reviews: 1450,
    isOpen: true,
    deliveryTime: "30-35 mins",
    priceForTwo: 600,
    offer: "25% OFF up to ₹150",
  },
  {
    id: "healthy-bowl",
    name: "Healthy Bowl",
    description:
      "Fresh salads, healthy bowls and nutritious meals for everyday eating.",
    cuisine: ["Healthy", "Salads"],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
    address: {
      street: "Hauz Khas",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110016",
    },
    rating: 4.6,
    reviewCount: 430,
    reviews: 430,
    isOpen: true,
    deliveryTime: "20-30 mins",
    priceForTwo: 500,
    offer: "15% OFF",
  },
];

const demoFoods = [
  {
    id: "food-1",
    name: "Butter Chicken",
    category: "North Indian",
    restaurant: "Spice Garden",
    restaurantId: "spice-garden",
    price: 349,
    rating: 4.8,
    reviews: 520,
    time: "25 mins",
    description: "Creamy tomato gravy with tender chicken pieces.",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=85",
    isVeg: false,
    tag: "Bestseller",
  },
  {
    id: "food-2",
    name: "Paneer Butter Masala",
    category: "North Indian",
    restaurant: "Spice Garden",
    restaurantId: "spice-garden",
    price: 299,
    rating: 4.7,
    reviews: 390,
    time: "20 mins",
    description: "Soft paneer cooked in a rich creamy tomato gravy.",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85",
    isVeg: true,
    tag: "Popular",
  },
  {
    id: "food-3",
    name: "Chicken Biryani",
    category: "Biryani",
    restaurant: "Biryani House",
    restaurantId: "biryani-house",
    price: 329,
    rating: 4.9,
    reviews: 810,
    time: "30 mins",
    description: "Aromatic basmati rice layered with spicy chicken.",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=85",
    isVeg: false,
    tag: "Bestseller",
  },
  {
    id: "food-4",
    name: "Margherita Pizza",
    category: "Pizza",
    restaurant: "Pizza Hub",
    restaurantId: "pizza-hub",
    price: 299,
    rating: 4.7,
    reviews: 460,
    time: "20 mins",
    description: "Classic tomato sauce, mozzarella and fresh basil.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85",
    isVeg: true,
    tag: "Bestseller",
  },
  {
    id: "food-5",
    name: "Farmhouse Pizza",
    category: "Pizza",
    restaurant: "Pizza Hub",
    restaurantId: "pizza-hub",
    price: 399,
    rating: 4.6,
    reviews: 310,
    time: "25 mins",
    description: "Loaded with onion, capsicum, tomato and mushrooms.",
    image:
      "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=800&q=85",
    isVeg: true,
    tag: "Popular",
  },
  {
    id: "food-6",
    name: "Classic Chicken Burger",
    category: "Burgers",
    restaurant: "Burger Point",
    restaurantId: "burger-point",
    price: 249,
    rating: 4.5,
    reviews: 340,
    time: "15 mins",
    description: "Crispy chicken patty, lettuce, cheese and signature sauce.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85",
    isVeg: false,
    tag: "Popular",
  },
  {
    id: "food-7",
    name: "Veg Hakka Noodles",
    category: "Chinese",
    restaurant: "Wok Express",
    restaurantId: "wok-express",
    price: 219,
    rating: 4.6,
    reviews: 280,
    time: "20 mins",
    description: "Wok tossed noodles with crunchy vegetables.",
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=85",
    isVeg: true,
    tag: "Bestseller",
  },
  {
    id: "food-8",
    name: "Healthy Buddha Bowl",
    category: "Healthy",
    restaurant: "Healthy Bowl",
    restaurantId: "healthy-bowl",
    price: 289,
    rating: 4.7,
    reviews: 190,
    time: "20 mins",
    description: "Fresh vegetables, quinoa, chickpeas and healthy dressing.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85",
    isVeg: true,
    tag: "Healthy",
  },
  {
    id: "food-9",
    name: "Gulab Jamun",
    category: "Desserts",
    restaurant: "Spice Garden",
    restaurantId: "spice-garden",
    price: 129,
    rating: 4.8,
    reviews: 220,
    time: "10 mins",
    description: "Soft warm gulab jamuns served with sugar syrup.",
    image:
      "https://images.unsplash.com/photo-1601303516534-6d1e6d4a1a8e?auto=format&fit=crop&w=800&q=85",
    isVeg: true,
    tag: "Sweet",
  },
];

/* =========================================================
   CONSTANTS
========================================================= */

const categories = [
  {
    name: "Biryani",
    emoji: "🍛",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Pizza",
    emoji: "🍕",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Burgers",
    emoji: "🍔",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Chinese",
    emoji: "🥡",
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "North Indian",
    emoji: "🥘",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Healthy",
    emoji: "🥗",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Desserts",
    emoji: "🍰",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Fast Food",
    emoji: "🍟",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80",
  },
];

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    text: "Amazing food and very fast delivery. Will definitely order again!",
    time: "2 days ago",
  },
  {
    name: "Priya Singh",
    rating: 4,
    text: "Food was fresh and delicious. Packaging was also very good.",
    time: "5 days ago",
  },
  {
    name: "Aman Verma",
    rating: 5,
    text: "One of my favourite restaurants. Highly recommended.",
    time: "1 week ago",
  },
];

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [restaurants, setRestaurants] = useState(demoRestaurants);
  const [foods, setFoods] = useState(demoFoods);

  const [activeView, setActiveView] = useState("Home");
  const [activeRestaurant, setActiveRestaurant] = useState(null);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Delhi");

  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [deliveryFilter, setDeliveryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [offerOnly, setOfferOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("foodie-wishlist") || "[]");
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("food-delivery-cart") || "[]");
    } catch {
      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [customizingFood, setCustomizingFood] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Regular");
  const [selectedSpice, setSelectedSpice] = useState("Medium");
  const [selectedExtras, setSelectedExtras] = useState([]);

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const [orderPlaced, setOrderPlaced] = useState(false);

  /* =======================================================
     LOAD API DATA
  ======================================================= */

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const response = await fetch("/api/restaurants");

        if (!response.ok) {
          throw new Error("Restaurant API unavailable");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setRestaurants(data);
        } else if (data?.restaurants?.length) {
          setRestaurants(data.restaurants);
        }
      } catch {
        console.log("Using demo restaurant data.");
      }
    };

    const loadFoods = async () => {
      try {
        const response = await fetch("/api/foods");

        if (!response.ok) {
          throw new Error("Food API unavailable");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setFoods(data);
        } else if (data?.foods?.length) {
          setFoods(data.foods);
        }
      } catch {
        console.log("Using demo food data.");
      }
    };

    loadRestaurants();
    loadFoods();
  }, []);

  /* =======================================================
     LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    localStorage.setItem("food-delivery-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("foodie-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* =======================================================
     HELPERS
  ======================================================= */

  const getRestaurantId = (restaurant) =>
    restaurant?._id || restaurant?.id || restaurant?.restaurantId;

  const getFoodId = (food) => food?._id || food?.id;

  const getRestaurantName = (restaurant) =>
    restaurant?.name || restaurant?.restaurantName || "Restaurant";

  const getFoodPrice = (food) => Number(food?.price || 0);

  const getDeliveryMinutes = (restaurant) => {
    const value = String(
      restaurant?.deliveryTime || restaurant?.delivery || "30"
    );

    const match = value.match(/\d+/);

    return match ? Number(match[0]) : 30;
  };

  /* =======================================================
     FILTER RESTAURANTS
  ======================================================= */

  const filteredRestaurants = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = restaurants.filter((restaurant) => {
      const restaurantName = getRestaurantName(restaurant).toLowerCase();

      const cuisines = Array.isArray(restaurant.cuisine)
        ? restaurant.cuisine.join(" ").toLowerCase()
        : String(restaurant.cuisine || "").toLowerCase();

      const description = String(
        restaurant.description || ""
      ).toLowerCase();

      const searchable = `${restaurantName} ${cuisines} ${description}`;

      const matchesSearch =
        !query || searchable.includes(query);

      const matchesCuisine =
        selectedCuisine === "All" ||
        cuisines.includes(selectedCuisine.toLowerCase());

      const rating = Number(
        restaurant.rating || restaurant.averageRating || 0
      );

      const matchesRating =
        ratingFilter === "all" ||
        (ratingFilter === "4.5" && rating >= 4.5) ||
        (ratingFilter === "4" && rating >= 4);

      const deliveryMinutes = getDeliveryMinutes(restaurant);

      const matchesDelivery =
        deliveryFilter === "all" ||
        (deliveryFilter === "under30" && deliveryMinutes <= 30) ||
        (deliveryFilter === "under20" && deliveryMinutes <= 20);

      const price = Number(
        restaurant.priceForTwo ||
          restaurant.averageCostForTwo ||
          500
      );

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "under300" && price < 300) ||
        (priceFilter === "300-600" &&
          price >= 300 &&
          price <= 600) ||
        (priceFilter === "600plus" && price > 600);

      const offer = String(restaurant.offer || "");

      const matchesOffer =
        !offerOnly || offer.trim().length > 0;

      return (
        matchesSearch &&
        matchesCuisine &&
        matchesRating &&
        matchesDelivery &&
        matchesPrice &&
        matchesOffer
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "rating") {
        return (
          Number(b.rating || 0) -
          Number(a.rating || 0)
        );
      }

      if (sortBy === "delivery") {
        return (
          getDeliveryMinutes(a) -
          getDeliveryMinutes(b)
        );
      }

      if (sortBy === "priceLow") {
        return (
          Number(a.priceForTwo || 0) -
          Number(b.priceForTwo || 0)
        );
      }

      if (sortBy === "priceHigh") {
        return (
          Number(b.priceForTwo || 0) -
          Number(a.priceForTwo || 0)
        );
      }

      return 0;
    });
  }, [
    restaurants,
    search,
    selectedCuisine,
    ratingFilter,
    deliveryFilter,
    priceFilter,
    offerOnly,
    sortBy,
  ]);

  /* =======================================================
     FILTER FOODS
  ======================================================= */

  const filteredFoods = useMemo(() => {
    const query = search.toLowerCase();

    return foods.filter((food) => {
      const searchable = `
        ${food.name || ""}
        ${food.restaurant || ""}
        ${food.category || ""}
        ${food.description || ""}
      `.toLowerCase();

      return !query || searchable.includes(query);
    });
  }, [foods, search]);

  /* =======================================================
     ACTIVE RESTAURANT FOOD
  ======================================================= */

  const restaurantFoods = useMemo(() => {
    if (!activeRestaurant) return [];

    const restaurantId = getRestaurantId(activeRestaurant);
    const restaurantName = getRestaurantName(activeRestaurant);

    return foods.filter(
      (food) =>
        String(food.restaurantId || "") === String(restaurantId) ||
        String(food.restaurant || "").toLowerCase() ===
          restaurantName.toLowerCase()
    );
  }, [foods, activeRestaurant]);

  /* =======================================================
     CART
  ======================================================= */

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const cartSubtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const deliveryFee = cartSubtotal === 0 ? 0 : cartSubtotal >= 499 ? 0 : 40;

  const discount = couponApplied
    ? Math.min(100, cartSubtotal * 0.2)
    : 0;

  const taxes = Math.round(
    Math.max(0, cartSubtotal - discount) * 0.05
  );

  const cartTotal =
    cartSubtotal +
    deliveryFee +
    taxes -
    discount;

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigate = (view) => {
    setActiveView(view);
    setShowProfile(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openRestaurant = (restaurant) => {
    setActiveRestaurant(restaurant);
    setActiveView("Restaurant");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* =======================================================
     WISHLIST
  ======================================================= */

  const toggleWishlist = (foodId) => {
    setWishlist((current) =>
      current.includes(foodId)
        ? current.filter((id) => id !== foodId)
        : [...current, foodId]
    );
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addSimpleFood = (food) => {
    setCart((current) => {
      const id = getFoodId(food);

      const existing = current.find(
        (item) =>
          item.foodId === id &&
          item.size === "Regular" &&
          item.spice === "Medium" &&
          (!item.extras || item.extras.length === 0)
      );

      if (existing) {
        return current.map((item) =>
          item === existing
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          foodId: id,
          name: food.name,
          restaurant: food.restaurant,
          image: food.image,
          price: getFoodPrice(food),
          basePrice: getFoodPrice(food),
          quantity: 1,
          size: "Regular",
          spice: "Medium",
          extras: [],
        },
      ];
    });

    setShowCart(true);
  };

  /* =======================================================
     CUSTOMIZATION
  ======================================================= */

  const openCustomization = (food) => {
    setCustomizingFood(food);
    setSelectedSize("Regular");
    setSelectedSpice("Medium");
    setSelectedExtras([]);
  };

  const extraOptions = [
    {
      name: "Extra Cheese",
      price: 50,
    },
    {
      name: "Jalapeno",
      price: 30,
    },
    {
      name: "Olives",
      price: 40,
    },
    {
      name: "Extra Sauce",
      price: 25,
    },
  ];

  const sizeOptions = {
    Regular: 0,
    Medium: 60,
    Large: 110,
  };

  const customizationTotal =
    getFoodPrice(customizingFood) +
    (sizeOptions[selectedSize] || 0) +
    selectedExtras.reduce(
      (sum, extra) => sum + extra.price,
      0
    );

  const toggleExtra = (extra) => {
    setSelectedExtras((current) =>
      current.some((item) => item.name === extra.name)
        ? current.filter((item) => item.name !== extra.name)
        : [...current, extra]
    );
  };

  const addCustomizedFood = () => {
    if (!customizingFood) return;

    const id = getFoodId(customizingFood);

    setCart((current) => [
      ...current,
      {
        foodId: id,
        name: customizingFood.name,
        restaurant: customizingFood.restaurant,
        image: customizingFood.image,
        price: customizationTotal,
        basePrice: getFoodPrice(customizingFood),
        quantity: 1,
        size: selectedSize,
        spice: selectedSpice,
        extras: selectedExtras,
      },
    ]);

    setCustomizingFood(null);
    setShowCart(true);
  };

  /* =======================================================
     CART QUANTITY
  ======================================================= */

  const increaseCartItem = (index) => {
    setCart((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseCartItem = (index) => {
    setCart((current) =>
      current
        .map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (index) => {
    setCart((current) =>
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  /* =======================================================
     COUPON
  ======================================================= */

  const applyCoupon = () => {
    if (
      coupon.trim().toUpperCase() === "FOODIE50" ||
      coupon.trim().toUpperCase() === "WELCOME"
    ) {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      alert("Try FOODIE50 or WELCOME");
    }
  };

  /* =======================================================
     CHECKOUT
  ======================================================= */

  const checkout = () => {
    if (!cart.length) return;

    setOrderPlaced(true);
    setCart([]);
    setCoupon("");
    setCouponApplied(false);
  };

  /* =======================================================
     RESTAURANT CARDS
  ======================================================= */

  const RestaurantCard = ({ restaurant }) => {
    const id = getRestaurantId(restaurant);
    const cuisines = Array.isArray(restaurant.cuisine)
      ? restaurant.cuisine
      : [restaurant.cuisine || "Multi Cuisine"];

    return (
      <article
        className="restaurant-card"
        onClick={() => openRestaurant(restaurant)}
      >
        <div className="restaurant-image-wrap">
          <img
            src={
              restaurant.image ||
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
            }
            alt={restaurant.name}
          />

          {restaurant.offer && (
            <span className="offer-badge">
              {restaurant.offer}
            </span>
          )}

          <button
            className="heart-button"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            ♡
          </button>

          {restaurant.isOpen === false && (
            <div className="closed-overlay">
              CLOSED
            </div>
          )}
        </div>

        <div className="restaurant-card-body">
          <div className="restaurant-title-row">
            <h3>{getRestaurantName(restaurant)}</h3>

            <span className="rating-pill">
              ★ {Number(restaurant.rating || 0).toFixed(1)}
            </span>
          </div>

          <p className="restaurant-cuisine">
            {cuisines.slice(0, 3).join(" • ")}
          </p>

          <div className="restaurant-meta">
            <span>
              🕐 {restaurant.deliveryTime || "30 mins"}
            </span>

            <span>
              ₹
              {restaurant.priceForTwo ||
                restaurant.averageCostForTwo ||
                500}{" "}
              for two
            </span>
          </div>

          <div className="restaurant-card-bottom">
            <span className="verified">
              ✓ Pure quality
            </span>

            <button
              className="view-menu-btn"
              onClick={(event) => {
                event.stopPropagation();
                openRestaurant(restaurant);
              }}
            >
              View Menu →
            </button>
          </div>
        </div>
      </article>
    );
  };

  /* =======================================================
     FOOD CARD
  ======================================================= */

  const FoodCard = ({ food }) => {
    const foodId = getFoodId(food);
    const wished = wishlist.includes(foodId);

    return (
      <article className="food-card">
        <div className="food-image-wrap">
          <img
            src={
              food.image ||
              "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
            }
            alt={food.name}
          />

          {food.tag && (
            <span className="food-tag">
              {food.tag}
            </span>
          )}

          <button
            className={`food-heart ${
              wished ? "active" : ""
            }`}
            onClick={() => toggleWishlist(foodId)}
          >
            {wished ? "♥" : "♡"}
          </button>
        </div>

        <div className="food-card-body">
          <div className="food-name-row">
            <h3>{food.name}</h3>

            <span className="small-rating">
              ★ {Number(food.rating || 0).toFixed(1)}
            </span>
          </div>

          <p className="food-description">
            {food.description}
          </p>

          <div className="food-card-footer">
            <strong>₹{getFoodPrice(food)}</strong>

            <button
              className="add-food-button"
              onClick={() => openCustomization(food)}
            >
              ADD
            </button>
          </div>

          <small>
            {food.reviews || 0} reviews •{" "}
            {food.time || "20 mins"}
          </small>
        </div>
      </article>
    );
  };

  /* =======================================================
     HOME
  ======================================================= */

  const HomePage = () => (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-label">
            #1 FOOD DELIVERY EXPERIENCE
          </div>

          <h1>
            Delicious food,
            <br />
            delivered to you.
          </h1>

          <p>
            Discover the best restaurants and dishes
            around you.
          </p>

          <div className="hero-search">
            <span>⌕</span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search for restaurants, food or cuisines"
            />

            <button
              onClick={() => navigate("Restaurants")}
            >
              Search
            </button>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="hero-food-circle">
            🍕
          </div>

          <div className="floating-food food-one">
            🍔
          </div>

          <div className="floating-food food-two">
            🍛
          </div>

          <div className="floating-food food-three">
            🍰
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionHeader
          title="What's on your mind?"
          subtitle="Order your favourite food"
        />

        <div className="category-row">
          {categories.map((category) => (
            <button
              className="category-card"
              key={category.name}
              onClick={() => {
                setSelectedCuisine(category.name);
                navigate("Restaurants");
              }}
            >
              <div className="category-image">
                <img
                  src={category.image}
                  alt={category.name}
                />
              </div>

              <strong>{category.name}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="page-section light-section">
        <SectionHeader
          title="Top restaurants near you"
          subtitle="Handpicked restaurants for you"
          action="View all"
          onAction={() => navigate("Restaurants")}
        />

        <div className="restaurant-grid">
          {restaurants
            .slice(0, 6)
            .map((restaurant) => (
              <RestaurantCard
                key={getRestaurantId(restaurant)}
                restaurant={restaurant}
              />
            ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeader
          title="Popular dishes"
          subtitle="Most ordered dishes around you"
          action="View all"
          onAction={() => navigate("Menu")}
        />

        <div className="food-grid">
          {foods.slice(0, 6).map((food) => (
            <FoodCard
              key={getFoodId(food)}
              food={food}
            />
          ))}
        </div>
      </section>

      <section className="promo-section">
        <div>
          <span>LIMITED TIME OFFER</span>
          <h2>Get 50% OFF on your first order</h2>
          <p>
            Use code <strong>FOODIE50</strong> at checkout.
          </p>

          <button
            onClick={() => {
              setCoupon("FOODIE50");
              setShowCart(true);
            }}
          >
            Order Now
          </button>
        </div>

        <div className="promo-emoji">
          🍔 🍕 🍛
        </div>
      </section>
    </>
  );

  /* =======================================================
     RESTAURANTS PAGE
  ======================================================= */

  const RestaurantsPage = () => (
    <main className="main-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            DISCOVER
          </span>

          <h1>Restaurants near you</h1>

          <p>
            {filteredRestaurants.length} restaurants
            available
          </p>
        </div>

        <button
          className="filter-mobile-button"
          onClick={() =>
            setShowFilters((value) => !value)
          }
        >
          ⚙ Filters
        </button>
      </div>

      <div
        className={`restaurant-toolbar ${
          showFilters ? "mobile-visible" : ""
        }`}
      >
        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value)
          }
        >
          <option value="rating">
            Top Rated
          </option>
          <option value="delivery">
            Fastest Delivery
          </option>
          <option value="priceLow">
            Price: Low to High
          </option>
          <option value="priceHigh">
            Price: High to Low
          </option>
        </select>

        <button
          className={
            ratingFilter === "4.5"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setRatingFilter(
              ratingFilter === "4.5"
                ? "all"
                : "4.5"
            )
          }
        >
          ⭐ 4.5+
        </button>

        <button
          className={
            deliveryFilter === "under30"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setDeliveryFilter(
              deliveryFilter === "under30"
                ? "all"
                : "under30"
            )
          }
        >
          🕐 Under 30 min
        </button>

        <button
          className={
            priceFilter === "under300"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setPriceFilter(
              priceFilter === "under300"
                ? "all"
                : "under300"
            )
          }
        >
          ₹ Under 300
        </button>

        <button
          className={offerOnly ? "active-filter" : ""}
          onClick={() =>
            setOfferOnly((value) => !value)
          }
        >
          🏷 Offers
        </button>
      </div>

      <div className="cuisine-filter">
        {["All", ...categories.map((item) => item.name)].map(
          (cuisine) => (
            <button
              key={cuisine}
              className={
                selectedCuisine === cuisine
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setSelectedCuisine(cuisine)
              }
            >
              {cuisine}
            </button>
          )
        )}
      </div>

      {filteredRestaurants.length === 0 ? (
        <div className="empty-results">
          <div>🔎</div>
          <h2>No restaurants found</h2>
          <p>
            Try changing your search or filters.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setSelectedCuisine("All");
              setRatingFilter("all");
              setDeliveryFilter("all");
              setPriceFilter("all");
              setOfferOnly(false);
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="restaurant-grid large-grid">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={getRestaurantId(restaurant)}
              restaurant={restaurant}
            />
          ))}
        </div>
      )}
    </main>
  );

  /* =======================================================
     RESTAURANT DETAIL PAGE
  ======================================================= */

  const RestaurantPage = () => {
    if (!activeRestaurant) {
      return null;
    }

    const restaurantName =
      getRestaurantName(activeRestaurant);

    const cuisines = Array.isArray(
      activeRestaurant.cuisine
    )
      ? activeRestaurant.cuisine
      : [];

    const restaurantMenu =
      restaurantFoods.length > 0
        ? restaurantFoods
        : foods.filter(
            (food) =>
              String(food.restaurant || "").toLowerCase() ===
              restaurantName.toLowerCase()
          );

    const groupedMenu = restaurantMenu.reduce(
      (groups, food) => {
        const category =
          food.category || "Recommended";

        if (!groups[category]) {
          groups[category] = [];
        }

        groups[category].push(food);

        return groups;
      },
      {}
    );

    return (
      <main className="restaurant-detail">
        <button
          className="back-button"
          onClick={() => navigate("Restaurants")}
        >
          ← Back to restaurants
        </button>

        <section className="restaurant-detail-header">
          <div className="restaurant-detail-image">
            <img
              src={activeRestaurant.image}
              alt={restaurantName}
            />
          </div>

          <div className="restaurant-detail-info">
            <span className="eyebrow">
              {cuisines.join(" • ").toUpperCase()}
            </span>

            <h1>{restaurantName}</h1>

            <p className="restaurant-description">
              {activeRestaurant.description ||
                "Delicious food prepared fresh for you."}
            </p>

            <div className="detail-stats">
              <div>
                <strong>
                  ★{" "}
                  {Number(
                    activeRestaurant.rating || 0
                  ).toFixed(1)}
                </strong>

                <span>
                  {activeRestaurant.reviewCount ||
                    activeRestaurant.reviews ||
                    0}{" "}
                  ratings
                </span>
              </div>

              <div>
                <strong>
                  🕐{" "}
                  {activeRestaurant.deliveryTime ||
                    "30 mins"}
                </strong>

                <span>Delivery time</span>
              </div>

              <div>
                <strong>
                  ₹
                  {activeRestaurant.priceForTwo ||
                    500}
                </strong>

                <span>for two</span>
              </div>
            </div>

            {activeRestaurant.offer && (
              <div className="detail-offer">
                🏷 {activeRestaurant.offer}
              </div>
            )}
          </div>
        </section>

        <div className="restaurant-detail-layout">
          <aside className="menu-sidebar">
            <h3>Menu</h3>

            {Object.keys(groupedMenu).map(
              (category) => (
                <a
                  href={`#${category}`}
                  key={category}
                >
                  {category}
                  <span>
                    {groupedMenu[category].length}
                  </span>
                </a>
              )
            )}
          </aside>

          <div className="menu-content">
            {Object.entries(groupedMenu).map(
              ([category, items]) => (
                <section
                  className="menu-category"
                  id={category}
                  key={category}
                >
                  <div className="menu-category-title">
                    <h2>{category}</h2>
                    <span>
                      {items.length} items
                    </span>
                  </div>

                  {items.map((food) => (
                    <div
                      className="menu-item"
                      key={getFoodId(food)}
                    >
                      <div className="menu-item-info">
                        <span
                          className={`veg-symbol ${
                            food.isVeg === false
                              ? "nonveg"
                              : ""
                          }`}
                        />

                        <h3>{food.name}</h3>

                        <strong>
                          ₹{getFoodPrice(food)}
                        </strong>

                        <span className="menu-rating">
                          ★{" "}
                          {Number(
                            food.rating || 0
                          ).toFixed(1)}
                        </span>

                        <p>
                          {food.description}
                        </p>

                        <small>
                          {food.reviews || 0} reviews
                        </small>
                      </div>

                      <div className="menu-item-image">
                        <img
                          src={
                            food.image ||
                            activeRestaurant.image
                          }
                          alt={food.name}
                        />

                        <button
                          className="menu-add-button"
                          onClick={() =>
                            openCustomization(food)
                          }
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
              )
            )}

            <section className="reviews-section">
              <div className="menu-category-title">
                <h2>Customer reviews</h2>
              </div>

              <div className="overall-rating">
                <strong>
                  ★{" "}
                  {Number(
                    activeRestaurant.rating || 4.5
                  ).toFixed(1)}
                </strong>

                <span>
                  Based on{" "}
                  {activeRestaurant.reviewCount ||
                    100}{" "}
                  ratings
                </span>
              </div>

              <div className="review-list">
                {reviews.map((review) => (
                  <div
                    className="review-card"
                    key={review.name}
                  >
                    <div className="review-top">
                      <strong>
                        {review.name}
                      </strong>

                      <span>
                        {"★".repeat(
                          review.rating
                        )}
                      </span>
                    </div>

                    <p>{review.text}</p>

                    <small>{review.time}</small>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  };

  /* =======================================================
     MENU PAGE
  ======================================================= */

  const MenuPage = () => (
    <main className="main-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            FOOD DISCOVERY
          </span>

          <h1>Explore delicious food</h1>

          <p>
            Find your favourite dishes from the best
            restaurants.
          </p>
        </div>
      </div>

      <div className="menu-search">
        <span>⌕</span>

        <input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search for dishes..."
        />
      </div>

      <div className="food-category-tabs">
        <button
          className={!selectedCuisine || selectedCuisine === "All" ? "active" : ""}
          onClick={() => setSelectedCuisine("All")}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.name}
            className={
              selectedCuisine === category.name
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedCuisine(category.name)
            }
          >
            {category.emoji} {category.name}
          </button>
        ))}
      </div>

      <div className="food-grid menu-food-grid">
        {filteredFoods
          .filter(
            (food) =>
              selectedCuisine === "All" ||
              food.category === selectedCuisine
          )
          .map((food) => (
            <FoodCard
              key={getFoodId(food)}
              food={food}
            />
          ))}
      </div>
    </main>
  );

  /* =======================================================
     PROFILE
  ======================================================= */

  const ProfilePage = () => (
    <main className="main-content profile-page">
      <span className="eyebrow">ACCOUNT</span>

      <h1>Your profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          👤
        </div>

        <div>
          <h2>Foodie User</h2>
          <p>Welcome to Foodie!</p>
        </div>
      </div>

      <div className="profile-options">
        <button>📦 My Orders</button>
        <button>❤️ Favourite Restaurants</button>
        <button>📍 Saved Addresses</button>
        <button>🎁 Offers & Coupons</button>
        <button>⚙ Settings</button>
      </div>
    </main>
  );

  /* =======================================================
     NAVBAR
  ======================================================= */

  const Navbar = () => (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          className="brand"
          onClick={() => navigate("Home")}
        >
          <span className="brand-icon">
            🍴
          </span>

          <span>
            <strong>Foodie</strong>
            <small>Food delivery</small>
          </span>
        </button>

        <button
          className="location-selector"
          onClick={() => {
            const newLocation = window.prompt(
              "Enter your location",
              location
            );

            if (newLocation) {
              setLocation(newLocation);
            }
          }}
        >
          <span>📍</span>

          <span>
            <small>Deliver to</small>
            <strong>{location}</strong>
          </span>

          <span>⌄</span>
        </button>

        <div className="nav-search">
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate("Restaurants");
              }
            }}
            placeholder="Search for restaurant, food or cuisine"
          />
        </div>

        <nav className="nav-links">
          <button
            onClick={() => navigate("Restaurants")}
          >
            Restaurants
          </button>

          <button
            onClick={() => navigate("Menu")}
          >
            Explore
          </button>

          <button className="offer-nav">
            🏷 Offers
          </button>

          <button
            className="profile-button"
            onClick={() =>
              setShowProfile((value) => !value)
            }
          >
            👤
            <span>Sign In</span>
          </button>

          <button
            className="cart-nav-button"
            onClick={() => setShowCart(true)}
          >
            🛒
            <span>Cart</span>

            {cartCount > 0 && (
              <b>{cartCount}</b>
            )}
          </button>
        </nav>
      </div>

      {showProfile && (
        <div className="profile-dropdown">
          <button
            onClick={() => {
              navigate("Profile");
              setShowProfile(false);
            }}
          >
            👤 My Profile
          </button>

          <button>📦 My Orders</button>
          <button>❤️ Favourites</button>
          <button>⚙ Settings</button>
        </div>
      )}
    </header>
  );

  /* =======================================================
     CART DRAWER
  ======================================================= */

  const CartDrawer = () => (
    <div
      className="cart-overlay"
      onClick={() => setShowCart(false)}
    >
      <aside
        className="cart-drawer"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="cart-header">
          <div>
            <span className="eyebrow">
              YOUR ORDER
            </span>

            <h2>Your cart</h2>
          </div>

          <button
            onClick={() => setShowCart(false)}
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div>🛒</div>
            <h3>Your cart is empty</h3>
            <p>
              Add delicious food to get started.
            </p>

            <button
              onClick={() => {
                setShowCart(false);
                navigate("Restaurants");
              }}
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div
                  className="cart-item"
                  key={`${item.foodId}-${index}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <p>
                      {item.size}
                      {item.spice &&
                        ` • ${item.spice}`}
                    </p>

                    {item.extras?.length > 0 && (
                      <small>
                        {item.extras
                          .map(
                            (extra) => extra.name
                          )
                          .join(", ")}
                      </small>
                    )}

                    <strong>
                      ₹
                      {Number(item.price || 0) *
                        Number(
                          item.quantity || 1
                        )}
                    </strong>
                  </div>

                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        decreaseCartItem(index)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseCartItem(index)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() =>
                      removeCartItem(index)
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="coupon-box">
              <input
                value={coupon}
                onChange={(event) =>
                  setCoupon(event.target.value)
                }
                placeholder="Enter coupon code"
              />

              <button onClick={applyCoupon}>
                Apply
              </button>
            </div>

            {couponApplied && (
              <div className="coupon-success">
                ✓ Coupon applied! You saved ₹
                {Math.round(discount)}
              </div>
            )}

            <div className="bill-details">
              <h3>Bill Details</h3>

              <div>
                <span>Item total</span>
                <strong>
                  ₹{Math.round(cartSubtotal)}
                </strong>
              </div>

              <div>
                <span>Delivery fee</span>
                <strong>
                  {deliveryFee === 0
                    ? "FREE"
                    : `₹${deliveryFee}`}
                </strong>
              </div>

              <div>
                <span>Taxes</span>
                <strong>₹{taxes}</strong>
              </div>

              {discount > 0 && (
                <div className="discount-row">
                  <span>Coupon discount</span>
                  <strong>
                    -₹{Math.round(discount)}
                  </strong>
                </div>
              )}

              <div className="total-row">
                <span>To Pay</span>
                <strong>
                  ₹{Math.round(cartTotal)}
                </strong>
              </div>
            </div>

            <button
              className="checkout-button"
              onClick={checkout}
            >
              Proceed to Checkout
              <span>
                ₹{Math.round(cartTotal)}
              </span>
            </button>
          </>
        )}
      </aside>
    </div>
  );

  /* =======================================================
     CUSTOMIZATION MODAL
  ======================================================= */

  const CustomizationModal = () => {
    if (!customizingFood) return null;

    return (
      <div
        className="modal-overlay"
        onClick={() =>
          setCustomizingFood(null)
        }
      >
        <div
          className="customization-modal"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          <button
            className="modal-close"
            onClick={() =>
              setCustomizingFood(null)
            }
          >
            ✕
          </button>

          <img
            className="custom-food-image"
            src={customizingFood.image}
            alt={customizingFood.name}
          />

          <div className="custom-food-content">
            <h2>{customizingFood.name}</h2>

            <p>
              {customizingFood.description}
            </p>

            <div className="custom-section">
              <div className="custom-section-heading">
                <h3>Choose Size</h3>
                <span>Required</span>
              </div>

              {Object.entries(sizeOptions).map(
                ([size, price]) => (
                  <label
                    className="radio-option"
                    key={size}
                  >
                    <input
                      type="radio"
                      checked={
                        selectedSize === size
                      }
                      onChange={() =>
                        setSelectedSize(size)
                      }
                    />

                    <span>{size}</span>

                    <strong>
                      {price > 0
                        ? `+ ₹${price}`
                        : "Included"}
                    </strong>
                  </label>
                )
              )}
            </div>

            <div className="custom-section">
              <div className="custom-section-heading">
                <h3>Spice Level</h3>
                <span>Optional</span>
              </div>

              {[
                "Mild",
                "Medium",
                "Spicy",
              ].map((spice) => (
                <label
                  className="radio-option"
                  key={spice}
                >
                  <input
                    type="radio"
                    checked={
                      selectedSpice === spice
                    }
                    onChange={() =>
                      setSelectedSpice(spice)
                    }
                  />

                  <span>{spice}</span>
                </label>
              ))}
            </div>

            <div className="custom-section">
              <div className="custom-section-heading">
                <h3>Add Extras</h3>
                <span>Optional</span>
              </div>

              {extraOptions.map((extra) => (
                <label
                  className="checkbox-option"
                  key={extra.name}
                >
                  <input
                    type="checkbox"
                    checked={selectedExtras.some(
                      (item) =>
                        item.name === extra.name
                    )}
                    onChange={() =>
                      toggleExtra(extra)
                    }
                  />

                  <span>{extra.name}</span>

                  <strong>
                    + ₹{extra.price}
                  </strong>
                </label>
              ))}
            </div>

            <button
              className="add-custom-button"
              onClick={addCustomizedFood}
            >
              Add Item
              <span>
                ₹{Math.round(customizationTotal)}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* =======================================================
     ORDER SUCCESS
  ======================================================= */

  const OrderSuccess = () => {
    if (!orderPlaced) return null;

    return (
      <div className="success-overlay">
        <div className="success-card">
          <div className="success-icon">
            ✓
          </div>

          <span className="eyebrow">
            ORDER CONFIRMED
          </span>

          <h2>Your order is on its way!</h2>

          <p>
            Your delicious food has been sent to
            the restaurant.
          </p>

          <div className="order-progress">
            <div className="progress-step active">
              <span>✓</span>
              <p>Order placed</p>
            </div>

            <div className="progress-line" />

            <div className="progress-step">
              <span>2</span>
              <p>Preparing</p>
            </div>

            <div className="progress-line" />

            <div className="progress-step">
              <span>3</span>
              <p>Delivery</p>
            </div>
          </div>

          <button
            onClick={() => {
              setOrderPlaced(false);
              navigate("Home");
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  };

  /* =======================================================
     APP RENDER
  ======================================================= */

  return (
    <div className="app">
      <Navbar />

      <div className="mobile-search">
        <span>⌕</span>

        <input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search restaurants and food"
        />

        <button
          onClick={() => navigate("Restaurants")}
        >
          Search
        </button>
      </div>

      {activeView === "Home" && <HomePage />}

      {activeView === "Restaurants" && (
        <RestaurantsPage />
      )}

      {activeView === "Restaurant" && (
        <RestaurantPage />
      )}

      {activeView === "Menu" && <MenuPage />}

      {activeView === "Profile" && (
        <ProfilePage />
      )}

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-icon">
                🍴
              </span>

              <span>
                <strong>Foodie</strong>
                <small>Food delivery</small>
              </span>
            </div>

            <p>
              Delicious food from your favourite
              restaurants, delivered to your door.
            </p>
          </div>

          <div>
            <h3>Company</h3>
            <a>About Us</a>
            <a>Careers</a>
            <a>Team</a>
            <a>Blog</a>
          </div>

          <div>
            <h3>Support</h3>
            <a>Help Centre</a>
            <a>Contact Us</a>
            <a>Terms</a>
            <a>Privacy</a>
          </div>

          <div>
            <h3>For Restaurants</h3>
            <a>Partner With Us</a>
            <a>Register Restaurant</a>
            <a>Business App</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Foodie. All rights reserved.
          </span>

          <span>
            Made with ❤️ for food lovers
          </span>
        </div>
      </footer>

      <div className="mobile-bottom-nav">
        <button
          className={
            activeView === "Home" ? "active" : ""
          }
          onClick={() => navigate("Home")}
        >
          <span>⌂</span>
          Home
        </button>

        <button
          className={
            activeView === "Restaurants"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("Restaurants")
          }
        >
          <span>🍽</span>
          Restaurants
        </button>

        <button
          className={
            activeView === "Menu" ? "active" : ""
          }
          onClick={() => navigate("Menu")}
        >
          <span>🔎</span>
          Explore
        </button>

        <button
          onClick={() => setShowCart(true)}
        >
          <span className="mobile-cart-icon">
            🛒
            {cartCount > 0 && (
              <b>{cartCount}</b>
            )}
          </span>
          Cart
        </button>
      </div>

      {showCart && <CartDrawer />}

      <CustomizationModal />

      <OrderSuccess />
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  subtitle,
  action,
  onAction,
}) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>

        {subtitle && <p>{subtitle}</p>}
      </div>

      {action && (
        <button onClick={onAction}>
          {action} →
        </button>
      )}
    </div>
  );
}