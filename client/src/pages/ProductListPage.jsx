import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import api from '../api/client';
import ProductCard from '../components/products/ProductCard';
import FilterSidebar from '../components/products/FilterSidebar';
import SortDropdown from '../components/products/SortDropdown';

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [facets, setFacets] = useState({});
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract filter values from URL params
  const search = searchParams.get('search') || '';
  const gender = searchParams.get('gender') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const color = searchParams.get('color') || '';
  const discount = searchParams.get('discount') || '';
  const rating = searchParams.get('rating') || '';
  const sort = searchParams.get('sort') || 'recommended';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(searchParams);
      const res = await api.get(`/products?${queryParams.toString()}`);
      if (res.data.success) {
        setProducts(res.data.products);
        setFacets(res.data.facets || {});
        setPagination(res.data.pagination || { total: 0, page: 1, limit: 12, totalPages: 1 });
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchProducts]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to page 1
    setSearchParams(newParams);
  };

  const handleSortChange = (newSort) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newSort);
    setSearchParams(newParams);
  };

  const handleClearAll = () => {
    setSearchParams(new URLSearchParams());
  };

  // Collect active filters for pill badges
  const activeFilters = [];
  if (category) category.split(',').forEach(c => activeFilters.push({ key: 'category', value: c, label: c }));
  if (brand) brand.split(',').forEach(b => activeFilters.push({ key: 'brand', value: b, label: b }));
  if (color) color.split(',').forEach(c => activeFilters.push({ key: 'color', value: c, label: c }));
  if (discount) activeFilters.push({ key: 'discount', value: discount, label: `${discount}%+ Off` });
  if (rating) activeFilters.push({ key: 'rating', value: rating, label: `${rating}★ & Above` });
  if (gender) activeFilters.push({ key: 'gender', value: gender, label: `Gender: ${gender}` });

  const removeSingleFilter = (filterKey, filterVal) => {
    const currentParam = searchParams.get(filterKey);
    if (!currentParam) return;

    const values = currentParam.split(',');
    const updated = values.filter(v => v.toLowerCase() !== filterVal.toLowerCase());
    handleFilterChange(filterKey, updated.join(','));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-myntra-muted mb-4">
        <Link to="/" className="hover:text-myntra-dark">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-myntra-dark capitalize">
          {gender ? `${gender}'s Fashion` : 'All Products'}
        </span>
        {search && (
          <>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-myntra-muted">"{search}"</span>
          </>
        )}
      </nav>

      {/* Page Title & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-myntra-border mb-6">
        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-myntra-dark tracking-wide uppercase">
            {search ? `Search results for "${search}"` : gender ? `${gender}'s Apparel & Lifestyle` : 'Fashion Collection'}
          </h1>
          <p className="text-xs text-myntra-muted mt-0.5">
            - <span className="font-bold text-myntra-dark">{pagination.total}</span> items found
          </p>
        </div>

        {/* Mobile Filter Toggle & Sort Dropdown */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded text-xs font-bold text-myntra-dark hover:border-myntra-pink"
          >
            <Filter className="w-3.5 h-3.5" />
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>

          <SortDropdown currentSort={sort} onSortChange={handleSortChange} />
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-bold text-myntra-lightMuted uppercase">Active Filters:</span>
          {activeFilters.map((f, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-myntra-dark text-xs font-semibold rounded-full border border-gray-300 transition-colors"
            >
              {f.label}
              <button
                onClick={() => removeSingleFilter(f.key, f.value)}
                className="text-gray-500 hover:text-red-500 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={handleClearAll}
            className="text-xs font-extrabold text-myntra-pink hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content: Sidebar + Products Grid */}
      <div className="flex gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block sticky top-24">
          <FilterSidebar
            filters={{ category, brand, color, discount, rating }}
            facets={facets}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Mobile Drawer Filters */}
        {isMobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileFilterOpen(false)}>
            <div
              className="w-4/5 max-w-sm h-full bg-white p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-sm uppercase">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <FilterSidebar
                filters={{ category, brand, color, discount, rating }}
                facets={facets}
                onFilterChange={(k, v) => {
                  handleFilterChange(k, v);
                }}
                onClearAll={handleClearAll}
              />
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-8 h-8 text-myntra-pink animate-spin" />
              <p className="text-xs font-bold text-myntra-muted">Loading fresh fashion styles...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center">
              <Sparkles className="w-12 h-12 text-myntra-lightMuted mb-3" />
              <h3 className="text-base font-extrabold text-myntra-dark mb-1">
                We couldn't find any matches!
              </h3>
              <p className="text-xs text-myntra-muted max-w-md mb-6">
                Please check your spelling or try clearing some filters to explore more apparel and lifestyle products.
              </p>
              <button
                onClick={handleClearAll}
                className="px-6 py-2.5 bg-myntra-pink text-white text-xs font-bold rounded uppercase tracking-wider hover:bg-myntra-pinkDark transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
