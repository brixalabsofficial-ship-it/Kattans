import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatINR } from '../utils/priceFormatter';

export default function FanFavouritesCarousel({ products }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openProductModal } = useCartStore();

  const count = products.length;

  // Auto slide every 3.5 seconds unless user hovers
  useEffect(() => {
    if (isPaused || count === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, count]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % count);
  };

  // Helper to compute circular relative offset (-2, -1, 0, 1, 2)
  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    return diff;
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto py-8 sm:py-12 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Controls */}
      <div className="flex items-center justify-between absolute inset-y-0 inset-x-2 sm:inset-x-6 z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded bg-black/80 hover:bg-[#B30000] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md shadow-2xl"
          aria-label="Previous Favourite"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded bg-black/80 hover:bg-[#B30000] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md shadow-2xl"
          aria-label="Next Favourite"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* 3D Carousel Stage */}
      <div className="relative h-[430px] sm:h-[460px] md:h-[490px] w-full flex items-center justify-center">
        {products.map((product, idx) => {
          const offset = getOffset(idx);
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // Horizontal spacing
          const translateX = offset * 260; // desktop offset step
          const scale = isCenter ? 1.08 : 0.85;
          const zIndex = isCenter ? 20 : 10 - Math.abs(offset);
          const opacity = isCenter ? 1 : 0.45;

          return (
            <motion.div
              key={product.id}
              initial={false}
              animate={{
                x: offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 190 : 270),
                scale: scale,
                zIndex: zIndex,
                opacity: opacity,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className={`absolute top-1/2 -translate-y-1/2 w-[270px] sm:w-[310px] md:w-[330px] rounded-md overflow-hidden transition-all duration-300 ${
                isCenter 
                  ? 'border-2 border-[#B30000] shadow-[0_10px_35px_rgba(215,25,48,0.35)] bg-black' 
                  : 'border border-white/10 grayscale filter brightness-75 hover:grayscale-0 hover:opacity-80 bg-black cursor-pointer'
              }`}
              onClick={() => {
                if (!isCenter) {
                  setActiveIndex(idx);
                }
              }}
            >
              {/* Product Image */}
              <div 
                className="relative aspect-[4/3] w-full overflow-hidden bg-black cursor-pointer"
                onClick={() => isCenter && openProductModal(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isCenter ? 'from-black via-black/30 to-transparent opacity-90' : 'from-black to-transparent opacity-80'}`} />

                {/* Diet Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded-xs border flex items-center justify-center backdrop-blur-md ${
                    product.isVeg ? 'border-green-500 bg-black' : 'border-[#B30000] bg-black'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-xs ${product.isVeg ? 'bg-green-500' : 'bg-[#B30000]'}`}></span>
                  </span>
                  {product.isSpecial && (
                    <span className="bg-[#B30000] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow">
                      Fan Favorite
                    </span>
                  )}
                </div>

                {/* Rating Badge */}
                {product.rating && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-xs border border-white/15 text-xs font-bold text-white">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 bg-black flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => isCenter && openProductModal(product)} 
                    className={`font-black text-white hover:text-[#B30000] transition-colors line-clamp-1 ${isCenter ? 'text-base sm:text-lg cursor-pointer' : 'text-sm'}`}
                  >
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price & Action Row */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Price</span>
                    <span className="text-base sm:text-lg font-black text-white">
                      {formatINR(product.price)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductModal(product);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md ${
                      isCenter 
                        ? 'bg-[#B30000] hover:bg-[#8A0000] text-white shadow-[#B30000]/40' 
                        : 'bg-white/10 text-neutral-300 hover:bg-[#B30000] hover:text-white'
                    }`}
                  >
                    <Plus size={14} />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 transition-all rounded-xs ${
              activeIndex === idx 
                ? 'w-7 bg-[#B30000]' 
                : 'w-2 bg-white/20 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
