import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check, ShoppingBag, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatINR } from '../utils/priceFormatter';

export default function FoodDetailsModal() {
  const { selectedProductForModal, closeProductModal, addItem } = useCartStore();
  const product = selectedProductForModal;

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize or reset when product opens
  React.useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0] : null);
      setSelectedAddons([]);
      setQuantity(1);
      setInstructions('');
      setIsAddedSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const basePrice = selectedVariant ? selectedVariant.price : product.price;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      addItem({
        ...product,
        selectedVariant,
        selectedAddons,
        quantity,
        instructions
      });

      setIsSubmitting(false);
      setIsAddedSuccess(true);
      setTimeout(() => {
        setIsAddedSuccess(false);
        closeProductModal();
      }, 600);
    }, 250);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProductModal}
          className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        />

        {/* Modal / Bottom Sheet Box */}
        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-lg md:max-w-xl bg-black border border-red-950/40 rounded-t-md md:rounded-md shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header image area */}
          <div className="relative h-52 sm:h-60 w-full flex-shrink-0 bg-black">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={closeProductModal}
              className="absolute top-3 right-3 w-8 h-8 rounded bg-black/80 text-white flex items-center justify-center hover:bg-[#B30000] transition-colors border border-white/20 backdrop-blur-md"
            >
              <X size={18} />
            </button>

            {/* Diet indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-xs border ${product.isVeg ? 'border-green-500 bg-black' : 'border-[#B30000] bg-black'}`}>
                <span className={`w-2.5 h-2.5 rounded-xs ${product.isVeg ? 'bg-green-500' : 'bg-[#B30000]'}`}></span>
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-xs bg-black/80 text-white backdrop-blur-md border border-white/10 uppercase tracking-wider">
                {product.isVeg ? 'Pure Veg' : 'Non-Veg'}
              </span>
            </div>

            {/* Product Title on Image */}
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
                {product.description}
              </p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1 bg-black text-white">
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {product.description}
            </p>

            {/* Variants / Size selection */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Choose Portion / Size <span className="text-[#B30000]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`flex items-center justify-between p-2.5 rounded border text-xs sm:text-sm font-medium transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-[#B30000] bg-[#B30000]/20 text-white'
                          : 'border-white/10 bg-black text-neutral-300 hover:border-white/30'
                      }`}
                    >
                      <span>{v.name}</span>
                      <span className="font-semibold text-white">{formatINR(v.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Addons / Customization */}
            {product.addons && product.addons.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Customize with Add-ons (Optional)
                </label>
                <div className="space-y-1.5">
                  {product.addons.map((addon) => {
                    const isChecked = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`flex items-center justify-between p-2.5 rounded border cursor-pointer transition-all ${
                          isChecked
                            ? 'border-[#829B32] bg-[#829B32]/15 text-white'
                            : 'border-white/10 bg-black text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-[#829B32] border-[#829B32] text-white' : 'border-white/30'
                          }`}>
                            {isChecked && <Check size={12} />}
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-white">{addon.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-[#829B32]">+ {formatINR(addon.price)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Cooking Instructions */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                Special Requests / Cooking Notes
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Less spicy, extra onions, no mayo..."
                rows={2}
                className="w-full bg-black border border-white/15 rounded p-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B30000] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Footer Bar with Quantity and Add Button */}
          <div className="p-3.5 sm:p-4 bg-black border-t border-white/10 flex items-center justify-between gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center bg-black border border-white/15 rounded p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-xs flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={15} />
              </button>
              <span className="w-8 text-center font-bold text-xs sm:text-sm text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-xs flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isSubmitting}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded font-extrabold text-xs sm:text-sm text-white transition-all transform active:scale-95 shadow-md disabled:opacity-75 ${
                isAddedSuccess
                  ? 'bg-[#829B32]'
                  : 'bg-[#B30000] hover:bg-[#8A0000]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Adding...</span>
                </>
              ) : isAddedSuccess ? (
                <>
                  <Check size={16} />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>Add to Order • {formatINR(totalPrice)}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
