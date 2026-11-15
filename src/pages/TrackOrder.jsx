import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Package, Clock, CheckCircle2, ChevronRight, Phone, MessageSquare, 
  MapPin, AlertCircle, ShoppingBag, ArrowLeft, RefreshCw, ChefHat, Bike
} from 'lucide-react';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';
import { formatINR } from '../utils/priceFormatter';
import { RESTAURANT_INFO } from '../utils/whatsappCheckout';

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const queryOrderId = searchParams.get('id') || '';

  const { orders, getOrderById } = useOrderStore();
  const { user, openAuthModal } = useAuthStore();

  const [inputOrderId, setInputOrderId] = useState(queryOrderId);
  const [searchedOrder, setSearchedOrder] = useState(() => {
    if (queryOrderId) return getOrderById(queryOrderId);
    return orders.length > 0 ? orders[0] : null;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputOrderId.trim()) return;
    const found = getOrderById(inputOrderId.trim().toUpperCase());
    setSearchedOrder(found || 'NOT_FOUND');
  };

  const activeOrder = searchedOrder && searchedOrder !== 'NOT_FOUND' ? searchedOrder : null;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors mb-3">
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#B30000]/15 text-[#B30000] border border-[#B30000]/30 mb-2">
                Live Kitchen & Delivery Status
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                TRACK YOUR ORDER
              </h1>
            </div>

            {/* Quick WhatsApp Support */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20CKB%20Kattans,%20I%20would%20like%20to%20check%20my%20order%20status.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition-all self-start"
            >
              <MessageSquare size={14} className="text-[#829B32]" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Search Order Bar */}
        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <div className="relative flex-1">
            <Package size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
              placeholder="Enter your Order ID (e.g. CKB-482910)..."
              className="w-full bg-black border border-white/20 rounded pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B30000] uppercase tracking-wider"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-extrabold uppercase tracking-wider transition-all"
          >
            Track
          </button>
        </form>

        {/* Not Found State */}
        {searchedOrder === 'NOT_FOUND' && (
          <div className="p-6 bg-black border border-white/10 text-center mb-8 space-y-3">
            <AlertCircle size={28} className="text-[#B30000] mx-auto" />
            <h3 className="text-base font-bold text-white">Order Not Found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              We couldn't locate an order with ID "{inputOrderId}". Please check your order reference number or verify the ID.
            </p>
          </div>
        )}

        {/* Active Order Card & Timeline */}
        {activeOrder ? (
          <div className="space-y-6">
            {/* Top Order Overview Banner */}
            <div className="p-5 sm:p-6 bg-black border border-white/15 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[11px] text-neutral-400 block">Order Reference</span>
                  <span className="text-lg sm:text-xl font-black text-[#B30000] tracking-wide">
                    {activeOrder.id}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#829B32]/15 border border-[#829B32]/40 text-[#829B32] text-xs font-extrabold uppercase tracking-wider">
                    ● Order Active
                  </span>
                </div>
              </div>

              {/* Estimated Delivery Time Callout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#B30000]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Estimated Time</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{activeOrder.estimatedTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#829B32]">
                    <ChefHat size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Kitchen</span>
                    <span className="text-xs sm:text-sm font-bold text-white">Feroke Live Kitchen</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                    <Bike size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Order Type</span>
                    <span className="text-xs sm:text-sm font-bold text-white capitalize">{activeOrder.orderType || 'Home Delivery'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Progress Timeline */}
            <div className="p-5 sm:p-6 bg-black border border-white/15 space-y-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
                Live Status Timeline
              </h3>

              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
                {activeOrder.statusHistory.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center ${
                      step.done 
                        ? 'bg-[#B30000] text-white shadow-[0_0_10px_rgba(179,0,0,0.8)]' 
                        : 'bg-black border border-white/20 text-neutral-500'
                    }`}>
                      {step.done ? <CheckCircle2 size={15} /> : <div className="w-2 h-2 rounded-full bg-white/30" />}
                    </div>
                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold ${step.done ? 'text-white' : 'text-neutral-400'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items & Breakdown */}
            <div className="p-5 sm:p-6 bg-black border border-white/15 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
                Order Summary ({activeOrder.items?.length || 0} items)
              </h3>

              <div className="divide-y divide-white/5">
                {activeOrder.items?.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white">
                        {item.name} <span className="text-[#B30000]">x {item.quantity}</span>
                      </span>
                      {item.selectedVariant && (
                        <span className="text-[11px] text-neutral-400 block">
                          Size: {item.selectedVariant.name}
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-white">
                      {formatINR(item.totalPrice || item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm font-extrabold">
                <span className="text-white">Total Paid / COD</span>
                <span className="text-[#B30000] text-base font-black">
                  {formatINR(activeOrder.total)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Empty / No Order Selected State */
          <div className="p-8 sm:p-12 bg-black border border-white/10 text-center space-y-4">
            <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
              <Package size={26} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
              No Active Order Found
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              Place your favourite dum biriyani, charcoal alfaham or burger order, and your live tracking reference will appear here automatically.
            </p>
            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                <ShoppingBag size={14} />
                <span>Browse Menu & Order</span>
              </Link>
            </div>
          </div>
        )}

        {/* Previous Orders for Signed-in User */}
        {user && orders.length > 0 && (
          <div className="mt-10 pt-8 border-t border-white/10 space-y-4">
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-400">
              Recent Orders ({orders.length})
            </h3>
            <div className="space-y-2.5">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => {
                    setInputOrderId(ord.id);
                    setSearchedOrder(ord);
                  }}
                  className={`p-3.5 bg-black border transition-all cursor-pointer flex items-center justify-between ${
                    activeOrder?.id === ord.id 
                      ? 'border-[#B30000] bg-white/[0.02]' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div>
                    <span className="font-extrabold text-white text-xs sm:text-sm block">
                      {ord.id}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {new Date(ord.date).toLocaleDateString()} • {ord.items?.length || 0} items
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#B30000]">
                      {formatINR(ord.total)}
                    </span>
                    <ChevronRight size={15} className="text-neutral-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
