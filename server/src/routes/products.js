const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/products - Full faceted search & filtering
router.get('/', (req, res) => {
  try {
    const {
      search,
      category,
      gender,
      brand,
      min_price,
      max_price,
      color,
      discount,
      rating,
      sort = 'recommended',
      page = 1,
      limit = 12
    } = req.query;

    let items = db.findAll('products');

    // 1. Text Search (title, brand, description, category_name)
    if (search) {
      const q = search.toLowerCase().trim();
      items = items.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q) ||
        (p.primary_color && p.primary_color.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Gender Filter
    if (gender && gender !== 'all') {
      const genders = Array.isArray(gender) ? gender : gender.split(',').map(g => g.toLowerCase());
      items = items.filter(p => genders.includes(p.gender) || p.gender === 'unisex');
    }

    // 3. Category Filter
    if (category && category !== 'all') {
      const cats = Array.isArray(category) ? category : category.split(',');
      items = items.filter(p => 
        cats.includes(String(p.category_id)) || 
        cats.some(c => p.category_name.toLowerCase().includes(c.toLowerCase()))
      );
    }

    // 4. Brand Filter
    if (brand) {
      const brands = Array.isArray(brand) ? brand : brand.split(',').map(b => b.toLowerCase());
      items = items.filter(p => brands.includes(p.brand.toLowerCase()));
    }

    // 5. Price Filter
    if (min_price) {
      items = items.filter(p => p.price >= Number(min_price));
    }
    if (max_price) {
      items = items.filter(p => p.price <= Number(max_price));
    }

    // 6. Color Filter
    if (color) {
      const colors = Array.isArray(color) ? color : color.split(',').map(c => c.toLowerCase());
      items = items.filter(p => 
        (p.primary_color && colors.includes(p.primary_color.toLowerCase())) ||
        (p.colors && p.colors.some(c => colors.includes(c.toLowerCase())))
      );
    }

    // 7. Discount Filter (e.g. 10%, 30%, 50%, 70% and above)
    if (discount) {
      items = items.filter(p => p.discount_percent >= Number(discount));
    }

    // 8. Rating Filter
    if (rating) {
      items = items.filter(p => p.rating >= Number(rating));
    }

    // Calculate Facets on the filtered set (or overall) for rich dynamic filters
    const allProducts = db.findAll('products');
    
    // Brand facets with count
    const brandCounts = {};
    allProducts.forEach(p => {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    });
    const brandFacets = Object.entries(brandCounts).map(([name, count]) => ({ name, count }));

    // Color facets with count
    const colorCounts = {};
    allProducts.forEach(p => {
      if (p.primary_color) {
        colorCounts[p.primary_color] = (colorCounts[p.primary_color] || 0) + 1;
      }
    });
    const colorFacets = Object.entries(colorCounts).map(([name, count]) => ({ name, count }));

    // Category facets
    const categoryCounts = {};
    allProducts.forEach(p => {
      categoryCounts[p.category_name] = (categoryCounts[p.category_name] || 0) + 1;
    });
    const categoryFacets = Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));

    // 9. Sorting
    switch (sort) {
      case 'price_asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'discount_desc':
        items.sort((a, b) => b.discount_percent - a.discount_percent);
        break;
      case 'rating_desc':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        items.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        break;
      case 'recommended':
      default:
        // Featured first, then rating
        items.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0) || b.rating - a.rating);
        break;
    }

    // 10. Pagination
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const total = items.length;
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedItems = items.slice(startIndex, startIndex + limitNum);

    return res.json({
      success: true,
      products: paginatedItems,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages
      },
      facets: {
        brands: brandFacets,
        colors: colorFacets,
        categories: categoryFacets,
        priceMin: Math.min(...allProducts.map(p => p.price)),
        priceMax: Math.max(...allProducts.map(p => p.price))
      }
    });
  } catch (err) {
    console.error('Fetch products error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching products.' });
  }
});

// GET /api/products/deal-of-the-day
router.get('/deal-of-the-day', (req, res) => {
  const deals = db.findAll('products', p => p.is_deal_of_day);
  return res.json({
    success: true,
    products: deals
  });
});

// GET /api/products/featured
router.get('/featured', (req, res) => {
  const featured = db.findAll('products', p => p.is_featured);
  return res.json({
    success: true,
    products: featured
  });
});

// GET /api/products/categories
router.get('/categories', (req, res) => {
  const categories = db.findAll('categories');
  return res.json({
    success: true,
    categories
  });
});

// GET /api/products/brands
router.get('/brands', (req, res) => {
  const products = db.findAll('products');
  const brands = Array.from(new Set(products.map(p => p.brand))).sort();
  return res.json({
    success: true,
    brands
  });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = db.findById('products', req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  // Fetch reviews for this product
  const reviews = db.findAll('reviews', { product_id: product.id });

  // Fetch similar products in same category or gender
  const similar = db.findAll('products', p => 
    p.id !== product.id && (p.category_id === product.category_id || p.gender === product.gender)
  ).slice(0, 6);

  return res.json({
    success: true,
    product,
    reviews,
    similar
  });
});

// GET /api/products/:id/similar
router.get('/:id/similar', (req, res) => {
  const product = db.findById('products', req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  const similar = db.findAll('products', p => 
    p.id !== product.id && (p.category_id === product.category_id || p.brand === product.brand)
  ).slice(0, 8);

  return res.json({
    success: true,
    products: similar
  });
});

module.exports = router;
