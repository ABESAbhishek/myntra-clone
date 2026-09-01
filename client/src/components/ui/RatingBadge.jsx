import React from 'react';
import { Star } from 'lucide-react';

const RatingBadge = ({ rating = 0, count = null, size = 'sm' }) => {
  if (!rating) return null;

  return (
    <div className={`inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded font-bold text-myntra-dark border border-gray-100 shadow-sm ${
      size === 'lg' ? 'text-sm' : 'text-[11px]'
    }`}>
      <span>{rating.toFixed ? rating.toFixed(1) : rating}</span>
      <Star className="w-3 h-3 fill-teal-600 text-teal-600 inline" />
      {count !== null && (
        <span className="text-gray-400 font-normal pl-1 border-l border-gray-300">
          {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
        </span>
      )}
    </div>
  );
};

export default RatingBadge;
