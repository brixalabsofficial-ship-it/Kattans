import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoryCard({ category, isActive, onClick }) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center group cursor-pointer transition-all ${
        isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
      }`}
    >
      {/* Bigger circular/rounded category image container */}
      <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 border-2 transition-all shadow-xl ${
        isActive 
          ? 'border-[#B30000] shadow-[#B30000]/40 ring-2 ring-[#B30000]/30 scale-105' 
          : 'border-white/10 group-hover:border-[#B30000]/60 bg-black'
      }`}>
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-full" />
      </div>

      <span className={`mt-2.5 text-xs sm:text-sm font-bold tracking-tight text-center max-w-[95px] truncate transition-colors ${
        isActive ? 'text-[#B30000]' : 'text-neutral-300 group-hover:text-white'
      }`}>
        {category.name}
      </span>
    </motion.div>
  );

  if (onClick) {
    return (
      <div onClick={() => onClick(category.id)}>
        {content}
      </div>
    );
  }

  return (
    <Link to={`/menu?category=${category.id}`}>
      {content}
    </Link>
  );
}
