import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const res = await login(email, password);
      if (res.success) {
        navigate(redirectPath);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await demoLogin();
      if (res.success) {
        navigate(redirectPath);
      }
    } catch (err) {
      setError('Demo login failed. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-pink-50/40 select-none">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#ff3f6c] via-[#ff527b] to-[#ff905a] p-6 text-white text-center">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-yellow-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Welcome Back
          </span>
          <h2 className="text-2xl font-black tracking-wide">Login to Myntra</h2>
          <p className="text-xs text-pink-100 mt-1">
            Access your Wishlist, Bag, and Track Orders
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {/* 1-Click Demo Login Box */}
          <div className="p-4 bg-gray-900 text-white rounded-xl space-y-2 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Quick Test Account
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white font-mono">
                demo@myntra.com
              </span>
            </div>
            <p className="text-[11px] text-gray-300">
              One-click instant login preloaded with cart items, wishlist, and orders.
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-gray-950 text-xs font-black uppercase tracking-wider rounded-lg shadow transition-all"
            >
              {loading ? 'Logging in...' : '1-Click Demo Login'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-bold text-gray-400 uppercase">Or with Email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-myntra-dark mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-myntra-pink text-sm"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-myntra-dark">Password</label>
                <span className="text-[11px] text-myntra-pink hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-myntra-pink text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-myntra-pink hover:bg-myntra-pinkDark text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all"
            >
              {loading ? 'Please wait...' : 'CONTINUE'}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-myntra-muted">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-myntra-pink hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-myntra-lightMuted text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 inline" />
            By continuing, you agree to Myntra's Terms of Use & Privacy Policy.
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
