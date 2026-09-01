import React from 'react';
import { Link } from 'react-router-dom';

const categoryTiles = [
  {
    name: 'Men\'s Shirts & Tops',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
    link: '/products?gender=men&category=Men%20Topwear',
    discount: '40-70% OFF'
  },
  {
    name: 'Kurtas & Ethnic Sets',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    link: '/products?gender=women&category=Women%20Indian%20%26%20Fusion',
    discount: '50-80% OFF'
  },
  {
    name: 'Western Dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80',
    link: '/products?gender=women&category=Women%20Western%20Wear',
    discount: 'Up to 60% OFF'
  },
  {
    name: 'Sneakers & Sports',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
    link: '/products?category=Men%20Footwear',
    discount: 'Min 40% OFF'
  },
  {
    name: 'Jeans & Trousers',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=400&q=80',
    link: '/products?category=Men%20Bottomwear',
    discount: '40-60% OFF'
  },
  {
    name: 'Beauty & Skincare',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    link: '/products?category=Beauty%20%26%20Personal%20Care',
    discount: 'Up to 50% OFF'
  }
];

const CategoryPills = () => {
  return (
    <section className="py-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-myntra-dark mb-6 text-center">
          Categories To Bag
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categoryTiles.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group flex flex-col items-center text-center bg-white rounded-xl p-3 border border-gray-100 hover:border-myntra-pink shadow-sm hover:shadow-dropdown transition-all duration-300"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 bg-gray-100 ring-2 ring-gray-100 group-hover:ring-myntra-pink transition-all">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="font-extrabold text-xs text-myntra-dark group-hover:text-myntra-pink transition-colors truncate w-full">
                {cat.name}
              </h3>

              <span className="text-[11px] font-bold text-teal-700 mt-0.5">
                {cat.discount}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPills;
