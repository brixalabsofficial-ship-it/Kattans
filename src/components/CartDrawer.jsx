import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { formatINR } from '../utils/priceFormatter';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        />

        {/* Drawer Container */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="relative w-full max-w-md bg-black border-l border-red-950/40 shadow-2xl h-full flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#B30000]/15 border border-[#B30000]/30 flex items-center justify-center text-[#B30000]">
                <ShoppingBag size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Your Order</h3>
                <p className="text-[11px] text-neutral-400">{items.length} unique dish(es)</p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded bg-white/5 flex items-center justify-center text-neutral-400">
                  <UtensilsCrossed size={30} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Your cart is empty</h4>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                    Satisfy your cravings with our delicious biriyanis, shawarmas and combos.
                  </p>
                </div>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  Explore Menu
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded bg-black border border-white/10 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover flex-shrink-0 bg-black"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                          {item.name}
                        </h4>
                        {item.selectedVariant && (
                          <span className="text-[11px] text-neutral-400 block mt-0.5">
                            Portion: <span className="text-white">{item.selectedVariant.name}</span>
                          </span>
                        )}
                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <span className="text-[11px] text-[#829B32] block">
                            + {item.selectedAddons.map(a => a.name).join(', ')}
                          </span>
                        )}
                        {item.instructions && (
                          <span className="text-[11px] text-neutral-400 italic block">
                            Note: "{item.instructions}"
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-neutral-500 hover:text-[#B30000] transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Quantity & Price row */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center bg-black border border-white/10 rounded p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="w-6 h-6 rounded-xs flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center font-bold text-xs text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="w-6 h-6 rounded-xs flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-white">
                      {formatINR(item.totalPrice)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 bg-black border-t border-white/10 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-[#829B32] font-semibold">Calculated at Checkout</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-[11px] text-neutral-400 block">Estimated Total</span>
                  <span className="text-base font-black text-white">{formatINR(subtotal)}</span>
                </div>

                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#B30000]/30"
                >
                  <span>Proceed to Order</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
