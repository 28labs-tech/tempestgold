import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black-primary flex flex-col lg:flex-row">
      {/* Left Panel — Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 order-2 lg:order-1">
        <div className="w-full max-w-md mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-light hover:text-gold-primary transition-colors text-sm mb-10"
          >
            <ArrowLeft size={16} />
            Back to Tempest Gold
          </Link>

          <div className="mb-8">
            <div className="w-12 h-12 bg-gold-primary rounded-sm flex items-center justify-center mb-6">
              <span className="font-serif font-bold text-black-primary text-2xl">
                T
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-white-accent mb-3">
              Admin Portal
            </h1>
            <p className="text-gray-light text-sm leading-relaxed">
              Authorized personnel only. This dashboard manages all Tempest Gold
              content, listings, and market data.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-6 flex items-center gap-2">
              <Shield size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-light block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tempestgold.com"
                className="w-full bg-transparent border border-gray-medium rounded-lg px-4 py-3.5 text-white-accent placeholder-gray-dark focus:outline-none focus:border-gold-primary transition-colors"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-light block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent border border-gray-medium rounded-lg px-4 py-3.5 pr-12 text-white-accent placeholder-gray-dark focus:outline-none focus:border-gold-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-light hover:text-gold-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-primary text-black-primary font-bold py-4 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 text-sm uppercase tracking-wider"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-medium">
            <p className="text-gray-medium text-xs mb-3">
              Not an administrator? Visit our public site.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gold-primary hover:text-gold-light transition-colors text-sm font-medium"
            >
              Explore Properties <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel — Hero Image (desktop only) */}
      <div className="hidden lg:flex flex-1 relative order-1 lg:order-2">
        <img
          src="/images/admin-hero.jpg"
          alt="Tempest Gold Admin"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black-primary via-black-primary/80 to-black-primary/30" />
        <div className="relative z-10 flex flex-col justify-end p-16 xl:p-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-px h-12 bg-gold-primary" />
            <div>
              <p className="text-gold-primary text-xs font-bold uppercase tracking-[0.2em]">
                Tempest Gold Property
              </p>
              <p className="text-gray-light text-sm">
                Content Management System
              </p>
            </div>
          </div>
          <h2 className="font-serif text-4xl xl:text-5xl text-white-accent leading-tight max-w-md">
            Property Expertise.
            <br />
            <span className="text-gold-primary">Practical Advice.</span>
          </h2>
          <p className="text-gray-light text-sm mt-6 max-w-sm leading-relaxed">
            Manage properties, research articles, market data, team profiles,
            and press releases — all from a single, secure dashboard.
          </p>
          <div className="flex gap-8 mt-10 text-xs text-gray-medium">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-gold-primary" />
              Token-based Access
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Content Management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
