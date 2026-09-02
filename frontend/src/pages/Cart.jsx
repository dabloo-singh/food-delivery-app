import { Link } from "react-router-dom";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="page empty-cart">
        <h1>Your cart is empty 🛒</h1>
        <p>Add some delicious food and come back!</p>

        <Link to="/menu" className="continue-btn">
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header">
        <p className="eyebrow">YOUR ORDER</p>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <strong>₹{item.price}</strong>
              </div>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>
                  −
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQuantity(item.id)}>
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>
            <strong>₹{total}</strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>₹40</strong>
          </div>

          <hr />

          <div className="total">
            <span>Total</span>
            <strong>₹{total + 40}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={() =>
              alert("Checkout will be connected to the backend next!")
            }
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;