import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { icon: "🍕", name: "Pizza" },
  { icon: "🍔", name: "Burgers" },
  { icon: "🍜", name: "Noodles" },
  { icon: "🍛", name: "Indian" },
  { icon: "🌮", name: "Mexican" },
  { icon: "🍰", name: "Desserts" },
];

function Home({ foods, addToCart }) {
  const [search, setSearch] = useState("");

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="delivery-badge">
            ⚡ Fast delivery in your area
          </div>

          <h1>
            Delicious food,
            <br />
            <span>delivered to you.</span>
          </h1>

          <p>
            Discover the best restaurants and enjoy your favorite meals
            delivered fresh and fast to your doorstep.
          </p>

          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search for pizza, burger, biryani..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <Link to="/menu">
              <button>View Menu</button>
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
            alt="Delicious food"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORE</p>
            <h2>What are you craving?</h2>
          </div>
        </div>

        <div className="categories">
          {categories.map((category) => (
            <div className="category-card" key={category.name}>
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>Explore now</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section popular-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TOP PICKS</p>
            <h2>
              {search
                ? `Search results for "${search}"`
                : "Popular near you"}
            </h2>
          </div>

          <Link to="/menu" className="view-all">
            View all →
          </Link>
        </div>

        {filteredFoods.length === 0 ? (
          <p className="no-results">No food found.</p>
        ) : (
          <div className="food-grid">
            {filteredFoods.slice(0, 4).map((food) => (
              <article className="food-card" key={food.id}>
                <div className="food-image">
                  <img src={food.image} alt={food.name} />
                </div>

                <div className="food-info">
                  <div className="food-title">
                    <h3>{food.name}</h3>
                    <span>⭐ {food.rating}</span>
                  </div>

                  <p>{food.category}</p>

                  <div className="food-bottom">
                    <strong>₹{food.price}</strong>

                    <button
                      className="add-btn"
                      onClick={() => addToCart(food)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;