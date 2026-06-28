import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Fill all fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        username,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-amber-400 text-4xl font-bold tracking-tight">
            AlphaHunt
          </div>
          <div className="text-gray-500 text-sm mt-2">
            Hunt words, one letter at a time
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col gap-4">
          <div className="text-white font-semibold text-xl">Create account</div>
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-white outline-0 focus:border-amber-400 transition-colors placeholder-gray-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-white outline-0 focus:border-amber-400 transition-colors placeholder-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          />
          {error && (
            <div className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-amber-400 text-gray-950 font-bold rounded-xl p-3 hover:bg-amber-300 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
          <div className="text-gray-500 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-400 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
