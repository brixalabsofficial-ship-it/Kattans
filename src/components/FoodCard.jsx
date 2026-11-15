import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatINR } from '../utils/priceFormatter';

export default function FoodCard({ product }) {
  const { openProductModal } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    setIsLoading(true);
    setTimeout(() => {
      openProductModal(product);
      setIsLoading(false);
    }, 250);
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-black rounded-md overflow-hidden border border-white/10 hover:border-[#B30000] transition-all flex flex-col justify-between shadow-xl"
    >
      {/* Image Container */}
      <div 
        onClick={() => openProductModal(product)} 
        className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer bg-black"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />

        {/* Diet Indicator (Veg / Non-veg dot) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className={`w-4 h-4 rounded-xs border flex items-center justify-center backdrop-blur-md ${
            product.isVeg ? 'border-green-500 bg-black/80' : 'border-[#B30000] bg-black/80'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-xs ${product.isVeg ? 'bg-green-500' : 'bg-[#B30000]'}`}></span>
          </span>
          {product.isSpecial && (
            <span className="bg-[#B30000] text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs shadow">
              Special
            </span>
          )}
        </div>

        {/* Rating Badge */}
        {product.rating && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-xs border border-white/10 text-xs font-semibold text-white">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span>{product.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-black">
        <div>
          <h3 
            onClick={() => openProductModal(product)} 
            className="text-sm sm:text-base font-bold text-white hover:text-[#B30000] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom bar with price & customize / add button */}
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-neutral-400 block">Starting from</span>
            <span className="text-sm sm:text-base font-black text-white">
              {formatINR(product.price)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md shadow-[#B30000]/30 disabled:opacity-75"
          >
            {isLoading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
