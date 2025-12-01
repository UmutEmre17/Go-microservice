import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="backdrop-blur-xl bg-white/30 shadow-xl border border-white/40 rounded-2xl p-8 w-[380px]">
        
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin}>
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none bg-white/70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-1 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 outline-none bg-white/70"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>

            <Link
              to="/register"
              className="w-full text-center bg-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
