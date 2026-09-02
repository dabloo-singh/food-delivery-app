import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(`Login submitted for: ${email}`);
  };

  return (
    <main className="page login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-icon">🍽️</div>

        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login to FoodExpress</h1>

        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <strong>Create Account</strong>
        </p>
      </form>
    </main>
  );
}

export default Login;