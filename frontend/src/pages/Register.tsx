import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Registration failed");
      return;
    }

    alert("Account created successfully! You can log in now.");
    window.location.href = "/";
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="backdrop-blur-xl bg-white/30 shadow-xl border border-white/40 rounded-2xl p-8 w-[420px]">
        
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <label className="block mb-1 text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none bg-white/70"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none bg-white/70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label className="block mb-1 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 outline-none bg-white/70"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-semibold underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
