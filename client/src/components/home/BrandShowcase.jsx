import React from 'react';
import { Link } from 'react-router-dom';

const brands = [
  { name: 'Roadster', tag: 'Rugged Casuals', offer: 'Flat 55% OFF', link: '/products?brand=Roadster', bg: 'from-amber-700 to-amber-900' },
  { name: 'HRX', tag: 'Activewear & Shoes', offer: '40-60% OFF', link: '/products?brand=HRX%20by%20Hrithik%20Roshan', bg: 'from-blue-700 to-blue-900' },
  { name: 'Libas', tag: 'Royal Ethnic Kurti Sets', offer: 'Up to 70% OFF', link: '/products?brand=Libas', bg: 'from-rose-700 to-rose-900' },
  { name: 'Puma', tag: 'Classics & Running', offer: 'Min 40% OFF', link: '/products?brand=Puma', bg: 'from-red-700 to-red-900' },
  { name: 'Levi\'s', tag: 'Iconic Denim & Tees', offer: 'Flat 50% OFF', link: '/products?brand=Levi%27s', bg: 'from-indigo-700 to-indigo-900' },
  { name: 'Carlton London', tag: 'Luxury Footwear', offer: 'Min 50% OFF', link: '/products?brand=Carlton%20London', bg: 'from-emerald-700 to-emerald-900' }
];

const BrandShowcase = () => {
  return (
    <section className="py-10 bg-gray-50/70 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-myntra-dark mb-6 text-center">
          Grand Global Brands
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((b) => (
            <Link
              key={b.name}
              to={b.link}
              className="group relative flex flex-col justify-between p-5 rounded-xl bg-gradient-to-br text-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${b.bg} opacity-95 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 block">
                  {b.tag}
                </span>
                <h3 className="text-lg font-extrabold tracking-wide">{b.name}</h3>
              </div>

              <div className="relative z-10 mt-6 pt-2 border-t border-white/20">
                <span className="text-xs font-black text-yellow-300 group-hover:underline">
                  {b.offer} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
