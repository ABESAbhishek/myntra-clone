const bcrypt = require('bcryptjs');
const db = require('./database');

const seedData = async () => {
  console.log('Seeding Myntra database...');

  // 1. Categories
  const categories = [
    { id: 1, name: 'Men Topwear', slug: 'men-topwear', gender: 'men', parent: 'Clothing', icon: 'Shirt' },
    { id: 2, name: 'Men Bottomwear', slug: 'men-bottomwear', gender: 'men', parent: 'Clothing', icon: 'Layers' },
    { id: 3, name: 'Men Footwear', slug: 'men-footwear', gender: 'men', parent: 'Footwear', icon: 'Footprints' },
    { id: 4, name: 'Men Watches & Accessories', slug: 'men-accessories', gender: 'men', parent: 'Accessories', icon: 'Watch' },
    
    { id: 5, name: 'Women Indian & Fusion', slug: 'women-ethnic', gender: 'women', parent: 'Clothing', icon: 'Sparkles' },
    { id: 6, name: 'Women Western Wear', slug: 'women-western', gender: 'women', parent: 'Clothing', icon: 'Sparkles' },
    { id: 7, name: 'Women Footwear', slug: 'women-footwear', gender: 'women', parent: 'Footwear', icon: 'Footprints' },
    { id: 8, name: 'Women Handbags & Accessories', slug: 'women-accessories', gender: 'women', parent: 'Accessories', icon: 'ShoppingBag' },
    
    { id: 9, name: 'Kids Boys Clothing', slug: 'kids-boys', gender: 'kids', parent: 'Clothing', icon: 'Smile' },
    { id: 10, name: 'Kids Girls Clothing', slug: 'kids-girls', gender: 'kids', parent: 'Clothing', icon: 'Heart' },
    { id: 11, name: 'Beauty & Personal Care', slug: 'beauty', gender: 'unisex', parent: 'Beauty', icon: 'Sparkles' },
    { id: 12, name: 'Home & Living', slug: 'home-living', gender: 'unisex', parent: 'Home', icon: 'Home' }
  ];

  // 2. Comprehensive Products Dataset
  const products = [
    // --- MEN TOPWEAR ---
    {
      id: 1,
      title: 'Men Pure Cotton Slim Fit Casual Shirt',
      brand: 'Roadster',
      category_id: 1,
      category_name: 'Men Topwear',
      gender: 'men',
      price: 699,
      mrp: 1499,
      discount_percent: 53,
      rating: 4.2,
      rating_count: 1420,
      description: 'Navy blue solid casual shirt, has a spread collar, button placket, 1 curved patch pocket, long regular sleeves, curved hem.',
      images: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'S', stock: 12 },
        { size: 'M', stock: 25 },
        { size: 'L', stock: 18 },
        { size: 'XL', stock: 4 },
        { size: 'XXL', stock: 0 }
      ],
      colors: ['Navy Blue', 'Black', 'Olive'],
      primary_color: 'Navy Blue',
      specifications: {
        'Fabric': '100% Cotton',
        'Fit': 'Slim Fit',
        'Pattern': 'Solid',
        'Collar': 'Spread Collar',
        'Sleeve Length': 'Long Sleeves',
        'Care Instructions': 'Machine Wash',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: true
    },
    {
      id: 2,
      title: 'Men Graphic Printed Regular Fit Round Neck T-shirt',
      brand: 'HRX by Hrithik Roshan',
      category_id: 1,
      category_name: 'Men Topwear',
      gender: 'men',
      price: 499,
      mrp: 1199,
      discount_percent: 58,
      rating: 4.4,
      rating_count: 3890,
      description: 'Mustard yellow printed T-shirt with Rapid-Dry tech, has a round neck, short regular sleeves for active performance and everyday comfort.',
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'S', stock: 15 },
        { size: 'M', stock: 30 },
        { size: 'L', stock: 22 },
        { size: 'XL', stock: 10 }
      ],
      colors: ['Yellow', 'Black', 'White'],
      primary_color: 'Yellow',
      specifications: {
        'Fabric': 'Polyester Blend with Rapid Dry',
        'Fit': 'Regular Fit',
        'Pattern': 'Graphic Print',
        'Neck': 'Round Neck',
        'Sleeve Length': 'Short Sleeves',
        'Care Instructions': 'Hand Wash',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: false
    },
    {
      id: 3,
      title: 'Men Maroon Solid Polo Collar T-Shirt',
      brand: 'US Polo Assn',
      category_id: 1,
      category_name: 'Men Topwear',
      gender: 'men',
      price: 989,
      mrp: 2199,
      discount_percent: 55,
      rating: 4.5,
      rating_count: 890,
      description: 'Maroon solid polo collar t-shirt, has short sleeves, button placket, and ribbed collar detailing with signature embroidered pony emblem.',
      images: [
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'M', stock: 14 },
        { size: 'L', stock: 20 },
        { size: 'XL', stock: 8 },
        { size: 'XXL', stock: 5 }
      ],
      colors: ['Maroon', 'Navy Blue', 'White'],
      primary_color: 'Maroon',
      specifications: {
        'Fabric': '100% Pique Cotton',
        'Fit': 'Regular Fit',
        'Pattern': 'Solid',
        'Collar': 'Polo Collar',
        'Sleeve Length': 'Short Sleeves',
        'Care Instructions': 'Machine Wash Cold',
        'Origin': 'India'
      },
      is_featured: false,
      is_deal_of_day: false
    },
    {
      id: 4,
      title: 'Men Black Checked Tailored Casual Shirt',
      brand: 'Highlander',
      category_id: 1,
      category_name: 'Men Topwear',
      gender: 'men',
      price: 549,
      mrp: 1299,
      discount_percent: 57,
      rating: 4.1,
      rating_count: 2100,
      description: 'Black and grey checked casual shirt, spread collar, full button placket, long sleeves, and a patch pocket.',
      images: [
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'S', stock: 5 },
        { size: 'M', stock: 12 },
        { size: 'L', stock: 15 },
        { size: 'XL', stock: 6 }
      ],
      colors: ['Black', 'Grey'],
      primary_color: 'Black',
      specifications: {
        'Fabric': 'Cotton Blend',
        'Fit': 'Slim Fit',
        'Pattern': 'Tartan Checks',
        'Collar': 'Spread Collar',
        'Sleeve Length': 'Long Sleeves',
        'Care Instructions': 'Machine Wash',
        'Origin': 'India'
      },
      is_featured: false,
      is_deal_of_day: true
    },
    {
      id: 5,
      title: 'Men Olive Green Relaxed Hooded Sweatshirt',
      brand: 'WROGN',
      category_id: 1,
      category_name: 'Men Topwear',
      gender: 'men',
      price: 1199,
      mrp: 2999,
      discount_percent: 60,
      rating: 4.6,
      rating_count: 750,
      description: 'Olive green solid hooded sweatshirt with fleece lining, kangaroo pocket, ribbed hem and long raglan sleeves.',
      images: [
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'M', stock: 8 },
        { size: 'L', stock: 15 },
        { size: 'XL', stock: 12 },
        { size: 'XXL', stock: 2 }
      ],
      colors: ['Olive', 'Black', 'Charcoal'],
      primary_color: 'Olive',
      specifications: {
        'Fabric': 'Cotton Fleece',
        'Fit': 'Relaxed Fit',
        'Pattern': 'Solid',
        'Neck': 'Hooded',
        'Sleeve Length': 'Long Sleeves',
        'Care Instructions': 'Machine Wash Gentle',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: false
    },

    // --- MEN BOTTOMWEAR ---
    {
      id: 6,
      title: 'Men 511 Mid-Rise Slim Fit Stretch Jeans',
      brand: 'Levi\'s',
      category_id: 2,
      category_name: 'Men Bottomwear',
      gender: 'men',
      price: 1899,
      mrp: 3799,
      discount_percent: 50,
      rating: 4.5,
      rating_count: 5320,
      description: 'Dark blue light fade 5-pocket mid-rise jeans, clean look with light distress wash, button and zip fly closure.',
      images: [
        'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: '30', stock: 10 },
        { size: '32', stock: 24 },
        { size: '34', stock: 18 },
        { size: '36', stock: 6 }
      ],
      colors: ['Blue', 'Dark Navy'],
      primary_color: 'Blue',
      specifications: {
        'Fabric': '98% Cotton 2% Elastane',
        'Fit': 'Slim Fit',
        'Waist Rise': 'Mid-Rise',
        'Closure': 'Button & Zip Fly',
        'Stretch': 'Stretchable',
        'Care Instructions': 'Machine Wash Separately',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: false
    },
    {
      id: 7,
      title: 'Men Charcoal Grey Tapered Fit Cargo Trousers',
      brand: 'Roadster',
      category_id: 2,
      category_name: 'Men Bottomwear',
      gender: 'men',
      price: 899,
      mrp: 2299,
      discount_percent: 60,
      rating: 4.3,
      rating_count: 1650,
      description: 'Charcoal grey solid mid-rise cargo trousers, has 6 utility pockets, button and zip closure, elasticated drawstring waistband.',
      images: [
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: '30', stock: 8 },
        { size: '32', stock: 15 },
        { size: '34', stock: 12 },
        { size: '36', stock: 4 }
      ],
      colors: ['Grey', 'Khaki', 'Black'],
      primary_color: 'Grey',
      specifications: {
        'Fabric': '100% Cotton Twill',
        'Fit': 'Tapered Fit',
        'Waist Rise': 'Mid-Rise',
        'Pockets': '6 Utility Pockets',
        'Care Instructions': 'Machine Wash',
        'Origin': 'India'
      },
      is_featured: false,
      is_deal_of_day: true
    },

    // --- MEN FOOTWEAR ---
    {
      id: 8,
      title: 'Men Smash v2 Leather Casual Sneakers',
      brand: 'Puma',
      category_id: 3,
      category_name: 'Men Footwear',
      gender: 'men',
      price: 2199,
      mrp: 4499,
      discount_percent: 51,
      rating: 4.4,
      rating_count: 4210,
      description: 'White and black classic leather sneakers with durable rubber cupsole and SoftFoam+ sockliner for superior cushioning.',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'UK 6', stock: 5 },
        { size: 'UK 7', stock: 12 },
        { size: 'UK 8', stock: 20 },
        { size: 'UK 9', stock: 15 },
        { size: 'UK 10', stock: 8 }
      ],
      colors: ['White', 'Black'],
      primary_color: 'White',
      specifications: {
        'Upper Material': 'Synthetic Leather',
        'Sole Material': 'Rubber',
        'Fastening': 'Lace-Up',
        'Toe Shape': 'Round Toe',
        'Care Instructions': 'Wipe with a clean, dry cloth',
        'Origin': 'Vietnam'
      },
      is_featured: true,
      is_deal_of_day: true
    },
    {
      id: 9,
      title: 'Men Revolution 6 Next Nature Running Shoes',
      brand: 'Nike',
      category_id: 3,
      category_name: 'Men Footwear',
      gender: 'men',
      price: 2799,
      mrp: 3995,
      discount_percent: 30,
      rating: 4.6,
      rating_count: 6780,
      description: 'Black engineered mesh running shoes with foam midsole for a softer ride and computer-generated outsole traction design.',
      images: [
        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'UK 7', stock: 8 },
        { size: 'UK 8', stock: 18 },
        { size: 'UK 9', stock: 14 },
        { size: 'UK 10', stock: 6 }
      ],
      colors: ['Black', 'Grey', 'Navy Blue'],
      primary_color: 'Black',
      specifications: {
        'Upper Material': 'Mesh Breathable',
        'Sole Material': 'Phylon & Rubber',
        'Fastening': 'Lace-Up',
        'Ideal For': 'Running & Gym',
        'Care Instructions': 'Clean with soft brush',
        'Origin': 'Indonesia'
      },
      is_featured: true,
      is_deal_of_day: false
    },

    // --- MEN ACCESSORIES ---
    {
      id: 10,
      title: 'Men Chronograph Black Dial Leather Strap Watch',
      brand: 'Fossil',
      category_id: 4,
      category_name: 'Men Watches & Accessories',
      gender: 'men',
      price: 4999,
      mrp: 9995,
      discount_percent: 50,
      rating: 4.7,
      rating_count: 1280,
      description: 'Black round stainless steel dial with genuine brown leather strap, 5 ATM water resistance, and built-in stopwatch sub-dials.',
      images: [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'Onesize', stock: 10 }
      ],
      colors: ['Brown', 'Black'],
      primary_color: 'Brown',
      specifications: {
        'Dial Shape': 'Round',
        'Strap Material': 'Genuine Leather',
        'Movement': 'Quartz Chronograph',
        'Water Resistance': '50 m',
        'Warranty': '2 Years Manufacturer Warranty',
        'Origin': 'Hong Kong'
      },
      is_featured: true,
      is_deal_of_day: false
    },

    // --- WOMEN ETHNIC & FUSION ---
    {
      id: 11,
      title: 'Women Mustard Yellow Floral Embroidered Kurta with Trousers & Dupatta',
      brand: 'Libas',
      category_id: 5,
      category_name: 'Women Indian & Fusion',
      gender: 'women',
      price: 1399,
      mrp: 3999,
      discount_percent: 65,
      rating: 4.5,
      rating_count: 4890,
      description: 'Mustard yellow ethnic printed straight calf-length kurta, keyhole neck with embroidered yoke, trousers with partially elasticated waistband and chiffon dupatta.',
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'S', stock: 10 },
        { size: 'M', stock: 25 },
        { size: 'L', stock: 20 },
        { size: 'XL', stock: 12 },
        { size: 'XXL', stock: 6 }
      ],
      colors: ['Mustard', 'Pink', 'Teal'],
      primary_color: 'Mustard',
      specifications: {
        'Kurta Fabric': 'Pure Chanderi Silk Blend',
        'Bottom Fabric': 'Silk Blend',
        'Dupatta Fabric': 'Chiffon',
        'Pattern': 'Floral Embroidery',
        'Neck': 'Keyhole Neck',
        'Sleeve Length': 'Three-Quarter Sleeves',
        'Care Instructions': 'Dry Clean Recommended',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: true
    },
    {
      id: 12,
      title: 'Women Teal Blue & Gold-Toned Foil Printed Anarkali Kurta',
      brand: 'Anouk',
      category_id: 5,
      category_name: 'Women Indian & Fusion',
      gender: 'women',
      price: 899,
      mrp: 2499,
      discount_percent: 64,
      rating: 4.3,
      rating_count: 3200,
      description: 'Teal blue foil printed Anarkali gown-style kurta, mandarin collar, flared hem, side slits, three-quarter regular sleeves.',
      images: [
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'XS', stock: 4 },
        { size: 'S', stock: 14 },
        { size: 'M', stock: 18 },
        { size: 'L', stock: 12 },
        { size: 'XL', stock: 5 }
      ],
      colors: ['Teal', 'Maroon'],
      primary_color: 'Teal',
      specifications: {
        'Fabric': '100% Viscose Rayon',
        'Fit': 'Flared Anarkali',
        'Pattern': 'Ethnic Gold Foil Motif',
        'Collar': 'Mandarin Collar',
        'Sleeve Length': 'Three-Quarter Sleeves',
        'Care Instructions': 'Hand Wash Separately',
        'Origin': 'India'
      },
      is_featured: false,
      is_deal_of_day: false
    },
    {
      id: 13,
      title: 'Women Pink & Silver Zari Woven Kanjeevaram Saree',
      brand: 'Mitera',
      category_id: 5,
      category_name: 'Women Indian & Fusion',
      gender: 'women',
      price: 1999,
      mrp: 6499,
      discount_percent: 69,
      rating: 4.6,
      rating_count: 2100,
      description: 'Pink and silver-toned traditional zari woven design saree, with rich contrast pallu border and unstitched blouse piece.',
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'Free Size', stock: 30 }
      ],
      colors: ['Pink', 'Red', 'Royal Blue'],
      primary_color: 'Pink',
      specifications: {
        'Saree Fabric': 'Art Silk Blend',
        'Blouse Fabric': 'Art Silk',
        'Border': 'Zari Woven Border',
        'Length': '5.5m Saree + 0.8m Blouse',
        'Care Instructions': 'Dry Clean Only',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: false
    },

    // --- WOMEN WESTERN WEAR ---
    {
      id: 14,
      title: 'Women Red Polka Dot Tiered Fit & Flare Midi Dress',
      brand: 'Forever 21',
      category_id: 6,
      category_name: 'Women Western Wear',
      gender: 'women',
      price: 1199,
      mrp: 2399,
      discount_percent: 50,
      rating: 4.4,
      rating_count: 1870,
      description: 'Red and white polka dot tiered fit and flare dress, has a sweetheart neckline, puff sleeves, smocked back, and flared midi hem.',
      images: [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'XS', stock: 6 },
        { size: 'S', stock: 15 },
        { size: 'M', stock: 20 },
        { size: 'L', stock: 8 }
      ],
      colors: ['Red', 'Black', 'Emerald'],
      primary_color: 'Red',
      specifications: {
        'Fabric': '100% Georgette',
        'Fit': 'Fit and Flare',
        'Length': 'Midi',
        'Neck': 'Sweetheart Neck',
        'Sleeve Length': 'Short Puff Sleeves',
        'Care Instructions': 'Machine Wash Gentle',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: true
    },
    {
      id: 15,
      title: 'Women High-Rise Wide Leg Clean Look Jeans',
      brand: 'Mango',
      category_id: 6,
      category_name: 'Women Western Wear',
      gender: 'women',
      price: 2490,
      mrp: 4990,
      discount_percent: 50,
      rating: 4.6,
      rating_count: 940,
      description: 'Light blue high-rise wide leg jeans with vintage wash, clean 5-pocket styling, and relaxed drape throughout.',
      images: [
        'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: '26', stock: 6 },
        { size: '28', stock: 14 },
        { size: '30', stock: 16 },
        { size: '32', stock: 8 }
      ],
      colors: ['Light Blue', 'Off White'],
      primary_color: 'Light Blue',
      specifications: {
        'Fabric': '100% Organic Cotton',
        'Fit': 'Wide Leg',
        'Waist Rise': 'High-Rise',
        'Length': 'Full Length',
        'Care Instructions': 'Machine Wash Inside Out',
        'Origin': 'Turkey'
      },
      is_featured: false,
      is_deal_of_day: false
    },
    {
      id: 16,
      title: 'Women Off-White Ribbed Knit Crop Top',
      brand: 'H&M',
      category_id: 6,
      category_name: 'Women Western Wear',
      gender: 'women',
      price: 499,
      mrp: 999,
      discount_percent: 50,
      rating: 4.3,
      rating_count: 3100,
      description: 'Off-white ribbed crop top, square neck, short cap sleeves, stretchable cotton knit fabric.',
      images: [
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'XS', stock: 8 },
        { size: 'S', stock: 20 },
        { size: 'M', stock: 25 },
        { size: 'L', stock: 10 }
      ],
      colors: ['Off-White', 'Black', 'Lilac'],
      primary_color: 'Off-White',
      specifications: {
        'Fabric': '95% Cotton 5% Elastane',
        'Fit': 'Fitted Crop',
        'Neck': 'Square Neck',
        'Length': 'Crop',
        'Care Instructions': 'Machine Wash',
        'Origin': 'Bangladesh'
      },
      is_featured: false,
      is_deal_of_day: false
    },

    // --- WOMEN FOOTWEAR & BAGS ---
    {
      id: 17,
      title: 'Women Solid Pointed Toe Block Heel Pumps',
      brand: 'Carlton London',
      category_id: 7,
      category_name: 'Women Footwear',
      gender: 'women',
      price: 1499,
      mrp: 3295,
      discount_percent: 55,
      rating: 4.4,
      rating_count: 1420,
      description: 'Nude-toned pointed toe classic pumps with sturdy 2.5-inch block heel, cushioned insole for all-day comfort.',
      images: [
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'UK 4', stock: 6 },
        { size: 'UK 5', stock: 12 },
        { size: 'UK 6', stock: 15 },
        { size: 'UK 7', stock: 8 }
      ],
      colors: ['Nude', 'Black'],
      primary_color: 'Nude',
      specifications: {
        'Upper Material': 'Synthetic Patent Leather',
        'Sole Material': 'TPR',
        'Heel Height': '2.5 inches',
        'Heel Type': 'Block Heel',
        'Care Instructions': 'Wipe with damp cloth',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: false
    },
    {
      id: 18,
      title: 'Women Structured Shoulder Handbag with Detachable Sling',
      brand: 'Lavie',
      category_id: 8,
      category_name: 'Women Handbags & Accessories',
      gender: 'women',
      price: 1299,
      mrp: 3999,
      discount_percent: 68,
      rating: 4.5,
      rating_count: 2750,
      description: 'Blush pink textured structured satchel bag, 2 main zippered compartments, interior organiser pockets, and gold-tone metallic hardware.',
      images: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'Onesize', stock: 18 }
      ],
      colors: ['Blush Pink', 'Tan Brown', 'Black'],
      primary_color: 'Blush Pink',
      specifications: {
        'Material': 'PU Faux Leather',
        'Closure': 'Zipper',
        'Compartments': '2 Main + 3 Inner Pockets',
        'Dimensions': '32cm x 24cm x 12cm',
        'Care Instructions': 'Wipe with soft clean cloth',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: true
    },

    // --- KIDS ---
    {
      id: 19,
      title: 'Boys Pack of 3 Pure Cotton Graphic Printed T-Shirts',
      brand: 'H&M Kids',
      category_id: 9,
      category_name: 'Kids Boys Clothing',
      gender: 'kids',
      price: 799,
      mrp: 1499,
      discount_percent: 47,
      rating: 4.6,
      rating_count: 1800,
      description: 'Pack of 3 multi-colored regular fit soft jersey t-shirts with vibrant superhero and dinosaur graphics.',
      images: [
        'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: '4-5Y', stock: 10 },
        { size: '6-7Y', stock: 15 },
        { size: '8-9Y', stock: 12 },
        { size: '10-11Y', stock: 8 }
      ],
      colors: ['Multi', 'Blue', 'Yellow'],
      primary_color: 'Multi',
      specifications: {
        'Fabric': '100% Organic Cotton',
        'Fit': 'Regular Fit',
        'Neck': 'Round Neck',
        'Care Instructions': 'Machine Wash',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: false
    },
    {
      id: 20,
      title: 'Girls Pink Floral Net Fit & Flare Party Dress',
      brand: 'Cutecumber',
      category_id: 10,
      category_name: 'Kids Girls Clothing',
      gender: 'kids',
      price: 999,
      mrp: 2499,
      discount_percent: 60,
      rating: 4.7,
      rating_count: 980,
      description: 'Baby pink sleeveless tiered tulle party dress with satin bow waistband and soft cotton inner lining.',
      images: [
        'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: '3-4Y', stock: 8 },
        { size: '5-6Y', stock: 12 },
        { size: '7-8Y', stock: 10 },
        { size: '9-10Y', stock: 6 }
      ],
      colors: ['Pink', 'Peach'],
      primary_color: 'Pink',
      specifications: {
        'Fabric': 'Polyester Net with Cotton Lining',
        'Fit': 'Fit & Flare',
        'Closure': 'Back Zipper',
        'Care Instructions': 'Dry Clean Recommended',
        'Origin': 'India'
      },
      is_featured: false,
      is_deal_of_day: true
    },

    // --- BEAUTY & PERSONAL CARE ---
    {
      id: 21,
      title: '10% Niacinamide Face Serum with Zinc 30ml',
      brand: 'Minimalist',
      category_id: 11,
      category_name: 'Beauty & Personal Care',
      gender: 'unisex',
      price: 599,
      mrp: 699,
      discount_percent: 14,
      rating: 4.8,
      rating_count: 9240,
      description: 'Nourishing daily face serum formulated with pure 10% Niacinamide and 1% Zinc PCA to reduce blemishes, control oil, and improve skin barrier.',
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1608248597359-009961605f63?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: '30ml', stock: 50 },
        { size: '50ml', stock: 25 }
      ],
      colors: ['Clear'],
      primary_color: 'White',
      specifications: {
        'Skin Type': 'All Skin Types / Acne Prone',
        'Formulation': 'Lightweight Serum',
        'Key Actives': '10% Niacinamide, 1% Zinc PCA, Aloe Leaf Juice',
        'Cruelty Free': 'Yes',
        'Volume': '30ml',
        'Origin': 'India'
      },
      is_featured: true,
      is_deal_of_day: true
    },
    {
      id: 22,
      title: 'Matte As Hell Crayon Lipstick - 01 Scarlett O\'Hara',
      brand: 'SUGAR Cosmetics',
      category_id: 11,
      category_name: 'Beauty & Personal Care',
      gender: 'women',
      price: 679,
      mrp: 849,
      discount_percent: 20,
      rating: 4.6,
      rating_count: 6120,
      description: 'Super matte high-pigment red crayon lipstick that glides smoothly and stays up to 12 hours without drying lips. Comes with free sharpener.',
      images: [
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: '2.8g', stock: 35 }
      ],
      colors: ['Red', 'Nude', 'Plum'],
      primary_color: 'Red',
      specifications: {
        'Finish': 'Velvety Matte',
        'Duration': '12 Hours Long Stay',
        'Weight': '2.8 g',
        'Includes': 'High-Grade Sharpener',
        'Origin': 'Germany'
      },
      is_featured: false,
      is_deal_of_day: false
    },
    {
      id: 23,
      title: 'Men All-in-One Multi Grooming Trimmer Kit',
      brand: 'Philips',
      category_id: 11,
      category_name: 'Beauty & Personal Care',
      gender: 'men',
      price: 1699,
      mrp: 2495,
      discount_percent: 32,
      rating: 4.5,
      rating_count: 8300,
      description: '9-in-1 face, hair and body grooming trimmer with self-sharpening stainless steel blades and 60 mins cordless runtime.',
      images: [
        'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'Kit', stock: 20 }
      ],
      colors: ['Black'],
      primary_color: 'Black',
      specifications: {
        'Blade Material': 'Self-sharpening Stainless Steel',
        'Runtime': 'Up to 60 minutes',
        'Attachments': '9 Tools for Beard, Hair & Body',
        'Warranty': '2 Years Worldwide Warranty',
        'Origin': 'Indonesia'
      },
      is_featured: true,
      is_deal_of_day: false
    },
    {
      id: 24,
      title: 'Men Navy Blue Solid Track Pants',
      brand: 'HRX by Hrithik Roshan',
      category_id: 2,
      category_name: 'Men Bottomwear',
      gender: 'men',
      price: 749,
      mrp: 1799,
      discount_percent: 58,
      rating: 4.3,
      rating_count: 2400,
      description: 'Navy blue active track pants with Rapid Dry technology, 2 zipper pockets, and elasticated drawstring waist.',
      images: [
        'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: [
        { size: 'M', stock: 16 },
        { size: 'L', stock: 24 },
        { size: 'XL', stock: 14 }
      ],
      colors: ['Navy Blue', 'Black', 'Grey'],
      primary_color: 'Navy Blue',
      specifications: {
        'Fabric': '100% Polyester with Moisture Wicking',
        'Fit': 'Slim Fit',
        'Waistband': 'Elasticated with Drawstring',
        'Care Instructions': 'Machine Wash',
        'Origin': 'India'
      },
      is_featured: false,
      is_deal_of_day: true
    }
  ];

  // 3. Active Discount Coupons
  const coupons = [
    {
      id: 1,
      code: 'MYNTRA200',
      discount_type: 'fixed',
      discount_value: 200,
      min_order_amount: 999,
      description: 'Flat ₹200 OFF on orders above ₹999'
    },
    {
      id: 2,
      code: 'FASHION50',
      discount_type: 'percent',
      discount_value: 50,
      max_discount: 600,
      min_order_amount: 1499,
      description: '50% OFF up to ₹600 on orders above ₹1499'
    },
    {
      id: 3,
      code: 'WELCOME100',
      discount_type: 'fixed',
      discount_value: 100,
      min_order_amount: 499,
      description: 'Flat ₹100 OFF on your first purchase'
    },
    {
      id: 4,
      code: 'FESTIVE15',
      discount_type: 'percent',
      discount_value: 15,
      max_discount: 1000,
      min_order_amount: 1999,
      description: '15% Extra OFF on festive season styles'
    }
  ];

  // 4. Default Demo User
  const passwordHash = await bcrypt.hash('password123', 10);
  const demoUser = {
    id: 1,
    name: 'Aarav Sharma',
    email: 'demo@myntra.com',
    password_hash: passwordHash,
    phone: '9876543210',
    gender: 'male',
    created_at: new Date().toISOString()
  };

  // 5. Default Saved Addresses for Demo User
  const addresses = [
    {
      id: 1,
      user_id: 1,
      name: 'Aarav Sharma',
      phone: '9876543210',
      pincode: '560034',
      address_line: 'Flat 402, Sunshine Heights, 4th Cross, Koramangala 5th Block',
      locality: 'Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      type: 'Home',
      is_default: true
    },
    {
      id: 2,
      user_id: 1,
      name: 'Aarav Sharma',
      phone: '9876543210',
      pincode: '560103',
      address_line: 'Tech Park Tower 3, Outer Ring Road, Bellandur',
      locality: 'Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      type: 'Work',
      is_default: false
    }
  ];

  // 6. Pre-populated Cart & Wishlist for Demo User
  const cart = [
    {
      id: 1,
      user_id: 1,
      product_id: 1,
      size: 'M',
      quantity: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      user_id: 1,
      product_id: 8,
      size: 'UK 8',
      quantity: 1,
      created_at: new Date().toISOString()
    }
  ];

  const wishlist = [
    {
      id: 1,
      user_id: 1,
      product_id: 11,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      user_id: 1,
      product_id: 6,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      user_id: 1,
      product_id: 10,
      created_at: new Date().toISOString()
    }
  ];

  // 7. Sample Orders for Demo User
  const orders = [
    {
      id: 1,
      order_number: 'MYN-2026-89412',
      user_id: 1,
      address: addresses[0],
      total_mrp: 3799,
      discount_amount: 1900,
      coupon_discount: 200,
      coupon_code: 'MYNTRA200',
      final_amount: 1699,
      payment_method: 'UPI',
      payment_status: 'Paid',
      order_status: 'Delivered',
      delivery_date: 'Delivered on 28 Aug 2026',
      items: [
        {
          product_id: 6,
          title: 'Men 511 Mid-Rise Slim Fit Stretch Jeans',
          brand: 'Levi\'s',
          image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
          size: '32',
          price: 1899,
          quantity: 1
        }
      ],
      created_at: '2026-08-25T10:30:00.000Z'
    },
    {
      id: 2,
      order_number: 'MYN-2026-92044',
      user_id: 1,
      address: addresses[0],
      total_mrp: 3999,
      discount_amount: 2600,
      coupon_discount: 0,
      coupon_code: null,
      final_amount: 1399,
      payment_method: 'Credit Card',
      payment_status: 'Paid',
      order_status: 'Shipped',
      delivery_date: 'Expected delivery by Friday, 4 Sep',
      items: [
        {
          product_id: 11,
          title: 'Women Mustard Yellow Floral Embroidered Kurta with Trousers & Dupatta',
          brand: 'Libas',
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
          size: 'M',
          price: 1399,
          quantity: 1
        }
      ],
      created_at: new Date().toISOString()
    }
  ];

  // 8. Sample Reviews
  const reviews = [
    {
      id: 1,
      product_id: 1,
      user_name: 'Rohan K.',
      rating: 5,
      headline: 'Excellent fabric and fit!',
      comment: 'The cotton fabric is super breathable and perfect for office or casual wear. Size M fits true to size.',
      created_at: '2026-08-10T14:20:00.000Z'
    },
    {
      id: 2,
      product_id: 1,
      user_name: 'Vikas M.',
      rating: 4,
      headline: 'Good value for money',
      comment: 'Color is slightly darker than the photo, but quality is top notch for under ₹700.',
      created_at: '2026-08-18T09:15:00.000Z'
    },
    {
      id: 3,
      product_id: 8,
      user_name: 'Priya S.',
      rating: 5,
      headline: 'Super comfy sneakers',
      comment: 'Got these as a gift for my brother. SoftFoam cushioning is super comfortable for all-day walking.',
      created_at: '2026-08-22T16:45:00.000Z'
    }
  ];

  // Save to DB
  db.data.categories = categories;
  db.data.products = products;
  db.data.coupons = coupons;
  db.data.users = [demoUser];
  db.data.addresses = addresses;
  db.data.cart = cart;
  db.data.wishlist = wishlist;
  db.data.orders = orders;
  db.data.reviews = reviews;
  db.data.counters = {
    categories: categories.length,
    products: products.length,
    coupons: coupons.length,
    users: 1,
    addresses: addresses.length,
    cart: cart.length,
    wishlist: wishlist.length,
    orders: orders.length,
    reviews: reviews.length
  };

  db.save();
  console.log('Database seeded successfully with', products.length, 'products,', categories.length, 'categories!');
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
