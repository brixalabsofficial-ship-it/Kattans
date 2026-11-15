import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Star, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatINR } from '../utils/priceFormatter';

export default function FanFavouritesCarousel({ products }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const { openProductModal } = useCartStore();

  const handleOrder = (product, e) => {
    if (e) e.stopPropagation();
    setLoadingId(product.id);
    setTimeout(() => {
      openProductModal(product);
      setLoadingId(null);
    }, 250);
  };

  const count = products.length;

  // Auto slide every 4 seconds unless paused
  useEffect(() => {
    if (isPaused || count === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % count);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, count]);

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % count);
  };

  // Helper to compute circular relative offset (-2, -1, 0, 1, 2)
  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    return diff;
  };

  const currentProduct = products[activeIndex];

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto py-6 sm:py-12 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Controls */}
      <div className="flex items-center justify-between absolute inset-y-0 inset-x-2 sm:inset-x-6 z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-9 h-9 sm:w-12 sm:h-12 rounded bg-black/85 hover:bg-[#B30000] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md shadow-2xl active:scale-95"
          aria-label="Previous Favourite"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-9 h-9 sm:w-12 sm:h-12 rounded bg-black/85 hover:bg-[#B30000] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md shadow-2xl active:scale-95"
          aria-label="Next Favourite"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* MOBILE VIEW: Single smooth sliding card without multi-card overlap glitch */}
      <div className="block sm:hidden relative w-full h-[390px] overflow-hidden px-8">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentProduct.id}
            custom={direction}
            initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-[290px] mx-auto rounded-md overflow-hidden border-2 border-[#B30000] shadow-[0_10px_35px_rgba(179,0,0,0.35)] bg-black"
          >
            {/* Product Image */}
            <div 
              className="relative aspect-[4/3] w-full overflow-hidden bg-black cursor-pointer"
              onClick={() => openProductModal(currentProduct)}
            >
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />

              {/* Diet Tag */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-xs border flex items-center justify-center backdrop-blur-md ${
                  currentProduct.isVeg ? 'border-green-500 bg-black' : 'border-[#B30000] bg-black'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-xs ${currentProduct.isVeg ? 'bg-green-500' : 'bg-[#B30000]'}`}></span>
                </span>
                {currentProduct.isSpecial && (
                  <span className="bg-[#B30000] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow">
                    Fan Favorite
                  </span>
                )}
              </div>

              {/* Rating Badge */}
              {currentProduct.rating && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-xs border border-white/15 text-xs font-bold text-white">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span>{currentProduct.rating}</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3.5 bg-black flex flex-col justify-between">
              <div>
                <h3 
                  onClick={() => openProductModal(currentProduct)} 
                  className="font-black text-white hover:text-[#B30000] transition-colors line-clamp-1 text-base cursor-pointer"
                >
                  {currentProduct.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {currentProduct.description}
                </p>
              </div>

              {/* Price & Action Row */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Price</span>
                  <span className="text-base font-black text-white">
                    {formatINR(currentProduct.price)}
                  </span>
                </div>

                <button
                  onClick={(e) => handleOrder(currentProduct, e)}
                  disabled={loadingId === currentProduct.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all active:scale-95 cursor-pointer bg-[#B30000] hover:bg-[#8A0000] text-white shadow-md shadow-[#B30000]/40 disabled:opacity-75"
                >
                  {loadingId === currentProduct.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Plus size={14} />
                  )}
                  <span>Order</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TABLET & DESKTOP VIEW: Smooth 3D Flanking Multi-Card Carousel */}
      <div className="hidden sm:flex relative h-[440px] md:h-[490px] w-full items-center justify-center">
        {products.map((product, idx) => {
          const offset = getOffset(idx);
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          const scale = isCenter ? 1.08 : 0.85;
          const zIndex = isCenter ? 20 : 10 - Math.abs(offset);
          const opacity = isCenter ? 1 : 0.4;

          return (
            <motion.div
              key={product.id}
              initial={false}
              animate={{
                x: offset * 270,
                scale: scale,
                zIndex: zIndex,
                opacity: opacity,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className={`absolute top-1/2 -translate-y-1/2 w-[290px] md:w-[330px] rounded-md overflow-hidden transition-all duration-300 ${
                isCenter 
                  ? 'border-2 border-[#B30000] shadow-[0_10px_35px_rgba(179,0,0,0.35)] bg-black' 
                  : 'border border-white/10 grayscale filter brightness-75 hover:grayscale-0 hover:opacity-80 bg-black cursor-pointer'
              }`}
              onClick={() => {
                if (!isCenter) {
                  setDirection(offset > 0 ? 1 : -1);
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
                    onClick={(e) => handleOrder(product, e)}
                    disabled={loadingId === product.id}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md disabled:opacity-75 ${
                      isCenter 
                        ? 'bg-[#B30000] hover:bg-[#8A0000] text-white shadow-[#B30000]/40' 
                        : 'bg-white/10 text-neutral-300 hover:bg-[#B30000] hover:text-white'
                    }`}
                  >
                    {loadingId === product.id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Plus size={14} />
                    )}
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
            onClick={() => {
              setDirection(idx > activeIndex ? 1 : -1);
              setActiveIndex(idx);
            }}
            className={`h-1.5 transition-all rounded-xs cursor-pointer ${
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
