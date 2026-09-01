import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: 'male'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
        formData.gender
      );
      if (res.success) {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
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
            <Sparkles className="w-3.5 h-3.5" /> New Shopper Gift
          </span>
          <h2 className="text-2xl font-black tracking-wide">Create an Account</h2>
          <p className="text-xs text-pink-100 mt-1">
            Get Flat ₹200 OFF on your first purchase
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-myntra-dark mb-1">Full Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-myntra-pink text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-myntra-dark mb-1">Email Address *</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-myntra-pink text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-myntra-dark mb-1">Password *</label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-myntra-pink text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-myntra-dark mb-1">Mobile Number (Optional)</label>
              <input
                type="tel"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-myntra-pink text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-myntra-dark mb-1">Gender</label>
              <div className="flex gap-4">
                {['male', 'female', 'other'].map((g) => (
                  <label key={g} className="flex items-center gap-1.5 cursor-pointer capitalize">
                    <input
                      type="radio"
                      name="genderRadio"
                      checked={formData.gender === g}
                      onChange={() => setFormData({ ...formData, gender: g })}
                      className="text-myntra-pink focus:ring-myntra-pink accent-myntra-pink"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-myntra-pink hover:bg-myntra-pinkDark text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all mt-4"
            >
              {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-myntra-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-myntra-pink hover:underline">
                Login
              </Link>
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-myntra-lightMuted text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 inline" />
            Safe and encrypted user registration.
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
