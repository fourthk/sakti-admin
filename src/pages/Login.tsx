import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_BASE } from "@/lib/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await res.json();
      const token = result?.data?.token;
      const user = result?.data?.user;
      if (!token) throw new Error("Token not found");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful");
      navigate("/");
    } catch {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#384E66" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="flex justify-center mb-6">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#F5F5F5",
            }}
          >
            <span
              className="font-bold text-xl tracking-tight"
              style={{ color: "#384E66" }}
            >
              SAKTI
            </span>
          </div>
        </div>

        <h1
          className="text-2xl font-semibold text-center mb-8 italic"
          style={{ color: "#384E66" }}
        >
          Change & Configuration
          <br />
          Management
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#384E66" }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                borderColor: "#E5E7EB",
                backgroundColor: "#F9FAFB",
              }}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#384E66" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                borderColor: "#E5E7EB",
                backgroundColor: "#F9FAFB",
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            style={{
              backgroundColor: "#2D3E50",
              color: "#FFFFFF",
            }}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p
          className="text-center text-sm mt-6"
          style={{ color: "#6B7280" }}
        >
          © 2025 SAKTI – Pemerintah Kota • All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
