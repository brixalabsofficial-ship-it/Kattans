import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FoodCard from './FoodCard';

export default function FoodCarousel({ products }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group">
      {/* Navigation Arrows for Desktop */}
      <div className="hidden md:flex justify-end gap-2 mb-4 -mt-12">
        <button
          onClick={() => scroll('left')}
          className="w-9 h-9 rounded bg-black border border-white/10 flex items-center justify-center text-white hover:bg-[#B30000] hover:border-transparent transition-colors"
          aria-label="Previous dishes"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="w-9 h-9 rounded bg-black border border-white/10 flex items-center justify-center text-white hover:bg-[#B30000] hover:border-transparent transition-colors"
          aria-label="Next dishes"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[260px] sm:w-[280px] md:w-[300px] flex-shrink-0 snap-start"
          >
            <FoodCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
