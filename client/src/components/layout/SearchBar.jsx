import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, Sparkles } from 'lucide-react';
import api from '../../api/client';

const trendingKeywords = ['T-Shirts', 'Kurta Sets', 'Sneakers', 'Jeans', 'Lipstick', 'Puma', 'Roadster', 'Watches'];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced autocomplete fetch
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products?search=${encodeURIComponent(query.trim())}&limit=5`);
        if (res.data.success) {
          setSuggestions(res.data.products);
        }
      } catch (err) {
        console.error('Search autocomplete error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (searchVal) => {
    const finalVal = (searchVal || query).trim();
    if (!finalVal) return;
    setIsOpen(false);
    navigate(`/products?search=${encodeURIComponent(finalVal)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-lg mx-4">
      {/* Search Input Box */}
      <div className="flex items-center bg-[#f5f5f6] hover:bg-[#eaeaea] focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-300 rounded-md px-3.5 py-2.5 transition-all duration-200">
        <Search className="w-4 h-4 text-myntra-muted mr-3 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products, brands and more"
          className="w-full bg-transparent text-sm text-myntra-dark placeholder:text-myntra-lightMuted focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSuggestions([]);
            }}
            className="text-myntra-lightMuted hover:text-myntra-dark ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete & Trending Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-dropdown border border-gray-100 overflow-hidden z-50 animate-fadeIn">
          {/* If there are live suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2 border-b border-gray-100">
              <div className="text-[11px] font-bold uppercase text-myntra-lightMuted px-3 py-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-myntra-pink" />
                Matching Products
              </div>
              {suggestions.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/product/${p.id}`);
                  }}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-myntra-pinkLight cursor-pointer rounded-md transition-colors"
                >
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-9 h-11 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-myntra-dark truncate">{p.brand}</div>
                    <div className="text-xs text-myntra-muted truncate">{p.title}</div>
                  </div>
                  <div className="text-xs font-bold text-myntra-dark">₹{p.price}</div>
                </div>
              ))}
            </div>
          )}

          {/* Trending Searches */}
          <div className="p-3 bg-gray-50">
            <div className="text-[11px] font-bold uppercase text-myntra-lightMuted mb-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-myntra-pink" />
              Trending Searches
            </div>
            <div className="flex flex-wrap gap-1.5">
              {trendingKeywords.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSearchSubmit(tag)}
                  className="px-2.5 py-1 text-xs bg-white border border-gray-200 text-myntra-muted hover:border-myntra-pink hover:text-myntra-pink rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
