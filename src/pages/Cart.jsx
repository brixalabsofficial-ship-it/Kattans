import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Trash2, Plus, Minus, Send, MapPin, 
  User, Phone, MessageSquare, AlertCircle, ArrowLeft, CheckCircle2, Lock, Gift, Sparkles 
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { formatINR } from '../utils/priceFormatter';
import { generateWhatsAppOrderUrl } from '../utils/whatsappCheckout';

export default function Cart() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCartStore();
  const { user, openAuthModal } = useAuthStore();

  const [orderType, setOrderType] = useState('delivery');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state if user logs in
  useEffect(() => {
    if (user) {
      setCustomerName(user.name);
      setCustomerPhone(user.phone);
    }
  }, [user]);

  const subtotal = getSubtotal();
  // Member discount if logged in
  const memberDiscount = user ? Math.round(subtotal * 0.1) : 0; // 10% instant member discount
  const deliveryCharge = orderType === 'delivery' ? (subtotal > 450 || user ? 0 : 40) : 0;
  const total = Math.max(0, subtotal - memberDiscount + deliveryCharge);

  const validate = () => {
    const err = {};
    if (!customerName.trim()) err.name = "Please enter your name";
    if (!customerPhone.trim() || customerPhone.length < 10) err.phone = "Enter a valid 10-digit mobile number";
    if (orderType === 'delivery' && !deliveryAddress.trim()) err.address = "Please provide your delivery address";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleConfirmOrder = () => {
    // If not logged in, enforce sign-in gate
    if (!user) {
      openAuthModal();
      return;
    }

    if (!validate()) {
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const whatsappUrl = generateWhatsAppOrderUrl({
      customer: {
        name: customerName,
        phone: customerPhone,
        address: deliveryAddress,
        landmark: landmark
      },
      items,
      subtotal,
      deliveryCharge,
      total,
      orderType,
      specialNotes: specialNotes + (user ? ' [Verified Member: 10% Off Applied]' : '')
    });

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 300);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-black text-white pt-28">
        <div className="w-20 h-20 rounded bg-black border border-white/10 flex items-center justify-center text-neutral-400 mb-5">
          <ShoppingBag size={34} className="text-[#B30000]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
          Your Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-md">
          Explore our signature Malabar biriyanis, charcoal grills, crispy burgers and refreshing Sulaimani tea.
        </p>
        <Link
          to="/menu"
          className="mt-6 px-6 py-2.5 rounded-none bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#B30000]/30"
        >
          Explore Food Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Menu
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Order Review & Checkout
            </h1>
          </div>
        </div>

        {/* PROMINENT SIGN IN TO ORDER & GET OFFERS BANNER */}
        {!user ? (
          <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-[#B30000]/25 via-black to-[#B30000]/15 border-2 border-[#B30000]/60 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B30000] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <Gift size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                    Sign In Required to Place Order
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-[#B30000] text-white rounded">
                    10% Off + Free Delivery
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
                  Sign in or create your account in 30 seconds with OTP to verify your number, unlock an instant <strong>10% member discount</strong>, and place your order!
                </p>
              </div>
            </div>

            <button
              onClick={openAuthModal}
              className="px-6 py-2.5 rounded-none bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-extrabold uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-[#B30000]/40 flex-shrink-0 flex items-center justify-center gap-2"
            >
              <span>Sign In & Unlock Offers</span>
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="mb-6 p-3.5 bg-black border border-[#829B32]/40 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-[#829B32]" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block">
                  Logged in as {user.name} ({user.phone})
                </span>
                <span className="text-[11px] text-[#829B32] font-semibold">
                  ✓ Exclusive Member 10% Discount & Free Delivery Activated
                </span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-[#829B32] uppercase px-2 py-1 bg-[#829B32]/10 rounded border border-[#829B32]/30">
              Verified Member
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Customer & Delivery Details Form */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 1. Order Type Selection */}
            <div className="bg-black p-4 sm:p-5 rounded border border-white/10 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                1. Select Order Type
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-3.5 rounded border flex flex-col items-center justify-center text-center transition-all ${
                    orderType === 'delivery'
                      ? 'border-[#B30000] bg-[#B30000]/20 text-white shadow-md'
                      : 'border-white/10 bg-black text-neutral-400 hover:border-white/30'
                  }`}
                >
                  <span className="text-xl mb-1">🛵</span>
                  <span className="text-xs sm:text-sm font-bold">Home Delivery</span>
                  <span className="text-[10px] text-neutral-400 mt-0.5">Direct to your doorstep</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`p-3.5 rounded border flex flex-col items-center justify-center text-center transition-all ${
                    orderType === 'takeaway'
                      ? 'border-[#B30000] bg-[#B30000]/20 text-white shadow-md'
                      : 'border-white/10 bg-black text-neutral-400 hover:border-white/30'
                  }`}
                >
                  <span className="text-xl mb-1">🥡</span>
                  <span className="text-xs sm:text-sm font-bold">Takeaway / Pickup</span>
                  <span className="text-[10px] text-neutral-400 mt-0.5">Collect at restaurant counter</span>
                </button>
              </div>
            </div>

            {/* 2. Customer Contact & Location Information */}
            <div className="bg-black p-4 sm:p-5 rounded border border-white/10 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                2. Contact & Delivery Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1">
                    Your Full Name <span className="text-[#B30000]">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full bg-black border rounded pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                        errors.name ? 'border-[#B30000]' : 'border-white/20 focus:border-[#B30000]'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-[#B30000] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1">
                    WhatsApp Mobile Number <span className="text-[#B30000]">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className={`w-full bg-black border rounded pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors ${
                        errors.phone ? 'border-[#B30000]' : 'border-white/20 focus:border-[#B30000]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-[#B30000] mt-1">{errors.phone}</p>}
                </div>
              </div>

              {orderType === 'delivery' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1">
                      Delivery Address (House/Flat No, Street, Area) <span className="text-[#B30000]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-2.5 text-neutral-400" />
                      <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. Flat 302, Palm Heights, Near Stadium Road..."
                        rows={2}
                        className={`w-full bg-black border rounded pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none resize-none transition-colors ${
                          errors.address ? 'border-[#B30000]' : 'border-white/20 focus:border-[#B30000]'
                        }`}
                      />
                    </div>
                    {errors.address && <p className="text-[10px] text-[#B30000] mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1">
                      Nearby Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Opposite City Hospital"
                      className="w-full bg-black border border-white/20 rounded px-3 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B30000]"
                    />
                  </div>
                </div>
              )}

              {/* Special Order Notes */}
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1">
                  General Order Notes / Preferences
                </label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3 top-2.5 text-neutral-400" />
                  <textarea
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Ring the bell twice, pack extra napkins..."
                    rows={2}
                    className="w-full bg-black border border-white/20 rounded pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B30000] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Mode Notice */}
            <div className="bg-black p-4 sm:p-5 rounded border border-white/10 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                3. Payment Method
              </h3>
              <div className="p-3 rounded bg-black border border-[#829B32]/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#829B32]" />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {orderType === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay at Restaurant Counter'}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {orderType === 'delivery' ? 'Pay delivery agent via cash or UPI scanner' : 'Pay when picking up your food parcel'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#829B32] uppercase px-2 py-0.5 rounded bg-[#829B32]/10">
                  Ready
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-black p-4 sm:p-5 rounded border border-white/10 space-y-4 sticky top-24">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Order Summary
                </h3>
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-[#B30000] transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-2.5 rounded bg-black border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white leading-tight">{item.name}</span>
                      <span className="text-xs font-bold text-white whitespace-nowrap">
                        {formatINR(item.totalPrice)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-neutral-400">
                      {item.selectedVariant && <span>• {item.selectedVariant.name}</span>}
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <span className="text-[#829B32]">• {item.selectedAddons.map(a => a.name).join(', ')}</span>
                      )}
                    </div>

                    {/* Quantity row */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
                      <div className="flex items-center bg-black rounded p-0.5 border border-white/15">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="w-5 h-5 flex items-center justify-center text-white hover:bg-white/10 rounded-xs"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="w-5 h-5 flex items-center justify-center text-white hover:bg-white/10 rounded-xs"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-neutral-500 hover:text-[#B30000] text-xs p-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation Details */}
              <div className="space-y-1.5 pt-2.5 border-t border-white/10 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatINR(subtotal)}</span>
                </div>

                {/* Member discount line if active */}
                {user ? (
                  <div className="flex justify-between text-[#829B32] font-semibold">
                    <span>Member Discount (10% Off)</span>
                    <span>- {formatINR(memberDiscount)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-neutral-500 text-[11px]">
                    <span>Member Discount</span>
                    <button onClick={openAuthModal} className="text-[#B30000] hover:underline font-bold">
                      Sign in to get 10% Off
                    </button>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Order Type</span>
                  <span className="text-white capitalize">{orderType}</span>
                </div>

                {orderType === 'delivery' && (
                  <div className="flex justify-between items-center">
                    <span>Delivery Charge</span>
                    <span className={deliveryCharge === 0 ? "text-[#829B32] font-bold" : "text-white"}>
                      {deliveryCharge === 0 ? "FREE" : formatINR(deliveryCharge)}
                    </span>
                  </div>
                )}

                <div className="pt-2.5 border-t border-white/10 flex justify-between items-center text-sm sm:text-base">
                  <span className="font-extrabold text-white">Grand Total</span>
                  <span className="font-black text-[#B30000]">{formatINR(total)}</span>
                </div>
              </div>

              {/* Checkout CTA Button with Sign-In Gate */}
              {user ? (
                <button
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-none bg-[#B30000] hover:bg-[#8A0000] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#B30000]/30 cursor-pointer disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>Confirm Order on WhatsApp</span>
                </button>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-none bg-[#B30000] hover:bg-[#8A0000] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-[#B30000]/40 cursor-pointer animate-pulse"
                >
                  <Lock size={15} />
                  <span>Sign In to Complete Order (Get 10% Off)</span>
                </button>
              )}

              {/* WhatsApp confirmation note */}
              <div className="p-2.5 rounded bg-black border border-white/10 text-[10px] text-neutral-400 flex items-start gap-2">
                <AlertCircle size={14} className="text-[#829B32] flex-shrink-0 mt-0.5" />
                <p>
                  {user 
                    ? "Clicking will open WhatsApp with your formatted order summary and 10% member discount applied."
                    : "Please sign in with your mobile number to verify your identity, unlock member benefits, and place your order."}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
