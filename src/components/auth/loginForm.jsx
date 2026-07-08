import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const { login, state } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      return navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  useEffect(() => {
    if (state.isAuthenticated) {
      return navigate("/");
    }
  }, [state.isAuthenticated, navigate]);
  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-6 mt-16 p-6 border border-border rounded-lg shadow-sm"
      >
        <h2 className=" w-full text-center heading-card">Login</h2>
        <div className="w-full flex flex-col justify-between">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div className="w-full flex flex-col justify-between">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={state.isLoading}
            className="btn-primary btn-lg w-60"
          >
            {state.isLoading ? "Logging in..." : "Login"}
          </button>
        </div>

        {state.error && (
          <p className="text-sm text-state-error">{state.error}</p>
        )}
        {state.isAuthenticated && !state.error && (
          <p className="text-sm text-green-600">
            Logged in as {state.user?.email || state.user?.username || "user"}
          </p>
        )}
      </form>
    </div>
  );
}
