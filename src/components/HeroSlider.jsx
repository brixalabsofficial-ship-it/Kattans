import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { banners } from '../data/banners';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0.8
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0.8
  })
};

export default function HeroSlider() {
  // [page, direction] where direction > 0 means moving right-to-left
  const [[page, direction], setPage] = useState([0, 1]);

  const paginate = (newDirection) => {
    setPage(([prevPage]) => {
      let nextPage = prevPage + newDirection;
      if (nextPage < 0) nextPage = banners.length - 1;
      if (nextPage >= banners.length) nextPage = 0;
      return [nextPage, newDirection];
    });
  };

  // Auto transition moving right-to-left every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1); // direction 1 = new slide comes from right to left
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = banners[page];

  return (
    <section className="relative w-full bg-black select-none group pt-16 sm:pt-20 pb-4">
      {/* Full-width expansive hero container without restrictive max-w-6xl */}
      <div className="relative w-full max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative w-full overflow-hidden bg-black rounded-none shadow-2xl">
          <div className="relative w-full aspect-[2/1] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 260, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <img
                  src={current.image}
                  alt={current.alt}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating 'Order Now' Action Button */}
          <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-3 sm:left-6 md:left-10 z-20">
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-none bg-[#B30000] hover:bg-[#8A0000] text-white text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-all transform active:scale-95 shadow-xl shadow-black/80 border-0 cursor-pointer"
            >
              <ShoppingBag size={14} className="text-white" />
              <span>Order Now</span>
              <span className="text-white/80 font-normal">→</span>
            </Link>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex absolute inset-y-0 inset-x-3 md:inset-x-6 z-20 items-center justify-between pointer-events-none">
            <button
              onClick={() => paginate(-1)}
              className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-none bg-black/75 hover:bg-[#B30000] text-white flex items-center justify-center transition-all border-0 backdrop-blur-sm shadow-xl cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-none bg-black/75 hover:bg-[#B30000] text-white flex items-center justify-center transition-all border-0 backdrop-blur-sm shadow-xl cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 right-4 sm:right-10 md:right-14 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-none border border-white/10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const newDir = idx > page ? 1 : -1;
                  setPage([idx, newDir]);
                }}
                className={`h-1.5 sm:h-2 transition-all rounded-none cursor-pointer ${
                  page === idx 
                    ? 'w-6 sm:w-8 bg-[#B30000]' 
                    : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
