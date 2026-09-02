import { useState } from "react";

function Menu({ foods, addToCart }) {
  const [search, setSearch] = useState("");

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page">
      <div className="page-header">
        <p className="eyebrow">OUR MENU</p>
        <h1>Choose your favorite food</h1>

        <input
          className="menu-search"
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="food-grid">
        {filteredFoods.map((food) => (
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
    </main>
  );
}

export default Menu;