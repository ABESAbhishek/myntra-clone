import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const discountOptions = [
  { label: '10% and above', value: '10' },
  { label: '30% and above', value: '30' },
  { label: '50% and above', value: '50' },
  { label: '70% and above', value: '70' }
];

const ratingOptions = [
  { label: '4★ & above', value: '4' },
  { label: '3★ & above', value: '3' }
];

const colorMap = {
  'Navy Blue': '#001f3f',
  'Black': '#111111',
  'White': '#ffffff',
  'Yellow': '#ffdc00',
  'Maroon': '#85144b',
  'Grey': '#aaaaaa',
  'Olive': '#3d9970',
  'Blue': '#0074d9',
  'Light Blue': '#7fdbff',
  'Pink': '#f012be',
  'Red': '#ff4136',
  'Teal': '#39cccc',
  'Mustard': '#e3a857',
  'Blush Pink': '#f7cac9',
  'Brown': '#8b5a2b',
  'Off-White': '#fdfbf7',
  'Charcoal': '#333333'
};

const FilterSidebar = ({ filters, facets = {}, onFilterChange, onClearAll }) => {
  const [brandSearch, setBrandSearch] = useState('');
  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    price: true,
    colors: true,
    discount: true,
    rating: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (filterKey, value) => {
    const currentValues = filters[filterKey] ? filters[filterKey].split(',') : [];
    let updated;
    if (currentValues.includes(value)) {
      updated = currentValues.filter(v => v !== value);
    } else {
      updated = [...currentValues, value];
    }
    onFilterChange(filterKey, updated.join(','));
  };

  const filteredBrands = (facets.brands || []).filter(b =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const activeFilterCount = Object.keys(filters).filter(k => filters[k] && k !== 'sort' && k !== 'page').length;

  return (
    <aside className="w-64 bg-white border-r border-myntra-border pr-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-myntra-border">
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-myntra-dark flex items-center gap-2">
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </h3>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-bold text-myntra-pink hover:text-myntra-pinkDark flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            CLEAR ALL
          </button>
        )}
      </div>

      {/* 1. Categories Filter */}
      {facets.categories && facets.categories.length > 0 && (
        <div className="pb-4 mb-4 border-b border-myntra-border">
          <button
            onClick={() => toggleSection('categories')}
            className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-myntra-dark mb-2.5"
          >
            <span>Categories</span>
            {openSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {openSections.categories && (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {facets.categories.map((c) => {
                const selected = (filters.category || '').split(',').includes(c.name);
                return (
                  <label key={c.name} className="flex items-center justify-between text-xs text-myntra-muted hover:text-myntra-dark cursor-pointer group">
                    <div className="flex items-center gap-2.5 truncate">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleCheckboxChange('category', c.name)}
                        className="rounded border-gray-300 text-myntra-pink focus:ring-myntra-pink accent-myntra-pink cursor-pointer"
                      />
                      <span className="truncate group-hover:font-medium">{c.name}</span>
                    </div>
                    <span className="text-[10px] text-myntra-lightMuted">({c.count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. Brand Filter with Search */}
      {facets.brands && facets.brands.length > 0 && (
        <div className="pb-4 mb-4 border-b border-myntra-border">
          <button
            onClick={() => toggleSection('brands')}
            className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-myntra-dark mb-2.5"
          >
            <span>Brand</span>
            {openSections.brands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {openSections.brands && (
            <div className="space-y-2">
              {/* Search Inside Brands */}
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1 mb-2">
                <Search className="w-3 h-3 text-gray-400 mr-1.5" />
                <input
                  type="text"
                  placeholder="Search brand"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="bg-transparent text-xs text-myntra-dark placeholder:text-gray-400 focus:outline-none w-full"
                />
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {filteredBrands.map((b) => {
                  const selected = (filters.brand || '').split(',').map(v => v.toLowerCase()).includes(b.name.toLowerCase());
                  return (
                    <label key={b.name} className="flex items-center justify-between text-xs text-myntra-muted hover:text-myntra-dark cursor-pointer group">
                      <div className="flex items-center gap-2.5 truncate">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => handleCheckboxChange('brand', b.name)}
                          className="rounded border-gray-300 text-myntra-pink focus:ring-myntra-pink accent-myntra-pink cursor-pointer"
                        />
                        <span className="truncate group-hover:font-medium">{b.name}</span>
                      </div>
                      <span className="text-[10px] text-myntra-lightMuted">({b.count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Color Filter */}
      {facets.colors && facets.colors.length > 0 && (
        <div className="pb-4 mb-4 border-b border-myntra-border">
          <button
            onClick={() => toggleSection('colors')}
            className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-myntra-dark mb-2.5"
          >
            <span>Color</span>
            {openSections.colors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {openSections.colors && (
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {facets.colors.map((col) => {
                const selected = (filters.color || '').split(',').map(c => c.toLowerCase()).includes(col.name.toLowerCase());
                const hex = colorMap[col.name] || '#888888';
                return (
                  <label key={col.name} className="flex items-center justify-between text-xs text-myntra-muted hover:text-myntra-dark cursor-pointer group">
                    <div className="flex items-center gap-2.5 truncate">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleCheckboxChange('color', col.name)}
                        className="rounded border-gray-300 text-myntra-pink focus:ring-myntra-pink accent-myntra-pink cursor-pointer"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block flex-shrink-0"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="truncate group-hover:font-medium">{col.name}</span>
                    </div>
                    <span className="text-[10px] text-myntra-lightMuted">({col.count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. Discount Filter */}
      <div className="pb-4 mb-4 border-b border-myntra-border">
        <button
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-myntra-dark mb-2.5"
        >
          <span>Discount Range</span>
          {openSections.discount ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.discount && (
          <div className="space-y-2">
            {discountOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-xs text-myntra-muted hover:text-myntra-dark cursor-pointer">
                <input
                  type="radio"
                  name="discount"
                  checked={filters.discount === opt.value}
                  onChange={() => onFilterChange('discount', filters.discount === opt.value ? '' : opt.value)}
                  className="text-myntra-pink focus:ring-myntra-pink accent-myntra-pink"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. Rating Filter */}
      <div className="pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-myntra-dark mb-2.5"
        >
          <span>Customer Rating</span>
          {openSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.rating && (
          <div className="space-y-2">
            {ratingOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-xs text-myntra-muted hover:text-myntra-dark cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === opt.value}
                  onChange={() => onFilterChange('rating', filters.rating === opt.value ? '' : opt.value)}
                  className="text-myntra-pink focus:ring-myntra-pink accent-myntra-pink"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
