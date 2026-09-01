import React from 'react';
import { Link } from 'react-router-dom';

const menuData = {
  MEN: {
    columns: [
      {
        title: 'Topwear',
        color: 'text-myntra-pink',
        items: [
          { label: 'T-Shirts', link: '/products?gender=men&category=Men%20Topwear&search=t-shirt' },
          { label: 'Casual Shirts', link: '/products?gender=men&category=Men%20Topwear&search=shirt' },
          { label: 'Polo T-Shirts', link: '/products?gender=men&category=Men%20Topwear&search=polo' },
          { label: 'Sweatshirts & Hoodies', link: '/products?gender=men&category=Men%20Topwear&search=sweatshirt' },
          { label: 'Jackets', link: '/products?gender=men&category=Men%20Topwear&search=jacket' }
        ]
      },
      {
        title: 'Bottomwear',
        color: 'text-myntra-pink',
        items: [
          { label: 'Jeans', link: '/products?gender=men&category=Men%20Bottomwear&search=jeans' },
          { label: 'Casual Trousers', link: '/products?gender=men&category=Men%20Bottomwear&search=trousers' },
          { label: 'Cargo Pants', link: '/products?gender=men&category=Men%20Bottomwear&search=cargo' },
          { label: 'Track Pants & Joggers', link: '/products?gender=men&category=Men%20Bottomwear&search=track' }
        ]
      },
      {
        title: 'Footwear',
        color: 'text-myntra-pink',
        items: [
          { label: 'Casual Sneakers', link: '/products?gender=men&category=Men%20Footwear&search=sneakers' },
          { label: 'Sports & Running Shoes', link: '/products?gender=men&category=Men%20Footwear&search=running' },
          { label: 'Formal Shoes', link: '/products?gender=men&category=Men%20Footwear' }
        ]
      },
      {
        title: 'Watches & Accessories',
        color: 'text-myntra-pink',
        items: [
          { label: 'Chronograph Watches', link: '/products?gender=men&search=watch' },
          { label: 'Grooming & Trimmers', link: '/products?search=trimmer' },
          { label: 'Backpacks & Wallets', link: '/products?gender=men' }
        ]
      }
    ]
  },
  WOMEN: {
    columns: [
      {
        title: 'Indian & Fusion Wear',
        color: 'text-myntra-pink',
        items: [
          { label: 'Kurtas & Kurti Sets', link: '/products?gender=women&category=Women%20Indian%20%26%20Fusion&search=kurta' },
          { label: 'Anarkali Suits', link: '/products?gender=women&category=Women%20Indian%20%26%20Fusion&search=anarkali' },
          { label: 'Sarees & Blouse', link: '/products?gender=women&category=Women%20Indian%20%26%20Fusion&search=saree' },
          { label: 'Ethnic Trousers', link: '/products?gender=women&category=Women%20Indian%20%26%20Fusion' }
        ]
      },
      {
        title: 'Western Wear',
        color: 'text-myntra-pink',
        items: [
          { label: 'Dresses & Jumpsuits', link: '/products?gender=women&category=Women%20Western%20Wear&search=dress' },
          { label: 'Tops & Tees', link: '/products?gender=women&category=Women%20Western%20Wear&search=top' },
          { label: 'Jeans & Jeggings', link: '/products?gender=women&category=Women%20Western%20Wear&search=jeans' },
          { label: 'Crop Tops', link: '/products?gender=women&category=Women%20Western%20Wear&search=crop' }
        ]
      },
      {
        title: 'Footwear & Bags',
        color: 'text-myntra-pink',
        items: [
          { label: 'Heels & Pumps', link: '/products?gender=women&search=pumps' },
          { label: 'Shoulder Handbags', link: '/products?gender=women&search=handbag' },
          { label: 'Flats & Sandals', link: '/products?gender=women&category=Women%20Footwear' }
        ]
      },
      {
        title: 'Beauty & Skincare',
        color: 'text-myntra-pink',
        items: [
          { label: 'Lipsticks & Lip Care', link: '/products?search=lipstick' },
          { label: 'Face Serums', link: '/products?search=serum' },
          { label: 'Fragrances & Perfumes', link: '/products?category=Beauty%20%26%20Personal%20Care' }
        ]
      }
    ]
  },
  KIDS: {
    columns: [
      {
        title: 'Boys Clothing',
        color: 'text-myntra-pink',
        items: [
          { label: 'T-Shirts & Polos', link: '/products?gender=kids&category=Kids%20Boys%20Clothing' },
          { label: 'Shirts & Denim', link: '/products?gender=kids&category=Kids%20Boys%20Clothing' },
          { label: 'Pack of T-Shirts', link: '/products?gender=kids&search=pack' }
        ]
      },
      {
        title: 'Girls Clothing',
        color: 'text-myntra-pink',
        items: [
          { label: 'Party Dresses', link: '/products?gender=kids&category=Kids%20Girls%20Clothing&search=dress' },
          { label: 'Tops & Skirts', link: '/products?gender=kids&category=Kids%20Girls%20Clothing' },
          { label: 'Tulle Frocks', link: '/products?gender=kids&category=Kids%20Girls%20Clothing' }
        ]
      },
      {
        title: 'Footwear & Toys',
        color: 'text-myntra-pink',
        items: [
          { label: 'Casual Shoes', link: '/products?gender=kids' },
          { label: 'Sandals & Slippers', link: '/products?gender=kids' },
          { label: 'School Accessories', link: '/products?gender=kids' }
        ]
      }
    ]
  },
  BEAUTY: {
    columns: [
      {
        title: 'Skincare',
        color: 'text-myntra-pink',
        items: [
          { label: 'Face Serums & Actives', link: '/products?category=Beauty%20%26%20Personal%20Care&search=serum' },
          { label: 'Moisturizers & Creams', link: '/products?category=Beauty%20%26%20Personal%20Care' },
          { label: 'Sunscreens', link: '/products?category=Beauty%20%26%20Personal%20Care' }
        ]
      },
      {
        title: 'Makeup',
        color: 'text-myntra-pink',
        items: [
          { label: 'Matte Lipsticks', link: '/products?category=Beauty%20%26%20Personal%20Care&search=lipstick' },
          { label: 'Eyeliners & Kajal', link: '/products?category=Beauty%20%26%20Personal%20Care' },
          { label: 'Foundations & Powders', link: '/products?category=Beauty%20%26%20Personal%20Care' }
        ]
      },
      {
        title: 'Men Grooming',
        color: 'text-myntra-pink',
        items: [
          { label: 'Trimmers & Shavers', link: '/products?search=trimmer' },
          { label: 'Beard Care & Oils', link: '/products?gender=men&category=Beauty%20%26%20Personal%20Care' },
          { label: 'Deodorants & Perfumes', link: '/products?category=Beauty%20%26%20Personal%20Care' }
        ]
      }
    ]
  }
};

const MegaMenu = ({ activeCategory, onClose }) => {
  if (!activeCategory || !menuData[activeCategory]) return null;
  const current = menuData[activeCategory];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-t border-b border-myntra-border shadow-dropdown z-40 py-8 px-12 transition-all duration-200 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
        {current.columns.map((col, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${col.color || 'text-myntra-pink'} pb-1 border-b border-gray-100`}>
              {col.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {col.items.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    onClick={onClose}
                    className="text-myntra-muted hover:text-myntra-dark hover:font-semibold transition-colors duration-150 block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
