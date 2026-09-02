import { Link, NavLink } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        🍽️ Food<span>Express</span>
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
      </nav>

      <div className="nav-actions">
        <Link to="/cart" className="cart-btn">
          🛒
          {cartCount > 0 && <span>{cartCount}</span>}
        </Link>

        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </header>
  );
}

export default Navbar;