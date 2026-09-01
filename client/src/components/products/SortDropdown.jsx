import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Better Discount', value: 'discount_desc' },
  { label: 'Customer Rating', value: 'rating_desc' },
  { label: 'What\'s New', value: 'newest' }
];

const SortDropdown = ({ currentSort = 'recommended', onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = sortOptions.find(o => o.value === currentSort)?.label || 'Recommended';

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-xs font-semibold text-myntra-dark hover:border-gray-400 bg-white cursor-pointer shadow-sm"
      >
        <span className="text-myntra-lightMuted font-normal">Sort by :</span>
        <span className="font-bold">{selectedLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-56 bg-white border border-gray-200 rounded shadow-dropdown z-30 py-1.5 animate-fadeIn">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSortChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                currentSort === opt.value
                  ? 'bg-myntra-pinkLight font-bold text-myntra-pink'
                  : 'text-myntra-dark hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
