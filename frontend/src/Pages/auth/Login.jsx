import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      return "Email and password are required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    // 🔹 Simulated API call (replace with real backend later)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Redirect after login
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border">

          {/* Alerts */}
          {(error || success) && (
            <div className="space-y-3 mb-6 animate-slide-down">
              {error && <Alert type="error" message={error} />}
              {success && <Alert type="success" message="Login successful! Redirecting..." />}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <InputField
              label="Email Address"
              type="email"
              value={email}
              setValue={setEmail}
              placeholder="Enter your email"
              icon="email"
            />

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <InputField
                type="password"
                value={password}
                setValue={setPassword}
                placeholder="Enter your password"
                icon="lock"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <Divider />

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <SocialButton label="Google" />
            <SocialButton label="Facebook" />
          </div>

          {/* Register */}
          <p className="mt-8 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function InputField({ label, type, value, setValue, placeholder, icon }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          {icon === "email" ? "@" : "🔒"}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );
}

function Alert({ type, message }) {
  return (
    <div
      className={`border-l-4 p-4 rounded ${
        type === "error"
          ? "bg-red-50 border-red-500 text-red-700"
          : "bg-green-50 border-green-500 text-green-700"
      }`}
    >
      {message}
    </div>
  );
}

function Divider() {
  return (
    <div className="my-8 relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t" />
      </div>
      <div className="relative text-center text-sm text-gray-500 bg-white px-4">
        Or continue with
      </div>
    </div>
  );
}

function SocialButton({ label }) {
  return (
    <button className="flex items-center justify-center gap-2 py-2.5 border rounded-xl hover:bg-gray-50 transition">
      {label}
    </button>
  );
}
