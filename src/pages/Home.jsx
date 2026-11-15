import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, HeartHandshake, ShieldCheck, Flame, ArrowRight, Clock, MapPin, Phone } from 'lucide-react';

import HeroSlider from '../components/HeroSlider';
import CategoryNavigation from '../components/CategoryNavigation';
import FanFavouritesCarousel from '../components/FanFavouritesCarousel';
import FoodCard from '../components/FoodCard';
import SectionHeading from '../components/SectionHeading';
import { FoodCardSkeleton, CategorySkeleton } from '../components/Skeleton';

import { categories } from '../data/categories';
import { products } from '../data/products';
import { RESTAURANT_INFO } from '../utils/whatsappCheckout';
import { useCartStore } from '../store/cartStore';

export default function Home() {
  const { openProductModal } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const fanFavourites = products.filter(p => p.isPopular);
  const recommendedDishes = products.filter(p => p.isRecommended).slice(0, 4);
  const specialDishes = products.filter(p => p.isSpecial).slice(0, 2);
  const comboDishes = products.filter(p => p.category === 'combos').slice(0, 4);

  return (
    <div className="min-w-full bg-black text-white">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Explore Categories */}
      <section className="py-10 sm:py-14 border-b border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Top Flavours"
            title="Explore Categories"
            subtitle="Browse through our curated menu categories for your daily cravings"
            align="left"
          />
          <CategoryNavigation categories={categories} />
        </div>
      </section>

      {/* 3. Fan Favourites */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black">
        <SectionHeading
          badge="Most Loved"
          title="FAN FAVOURITES"
          subtitle="The dishes everyone keeps coming back for, slow-cooked and packed with signature flavour"
          actionText="View Full Menu"
          onActionClick={() => window.location.href = '/menu'}
        />
        <FanFavouritesCarousel products={fanFavourites} />
      </section>

      {/* 4. Today's Specials - Clean, editorial restaurant layout without fake badge pills */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black">
        <div className="border border-white/10 bg-black p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#B30000] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#B30000] inline-block"></span>
                Chef's Daily Special
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                Authentic Thalassery Dum & Smoky Alfaham
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg">
                Crafted fresh every evening over glowing charcoal. Experience real Malabar culinary artistry simmered with home-ground spice pastes and rich coconut undertones.
              </p>
              <div className="pt-2">
                <Link
                  to="/menu?category=starters"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Taste Today's Specials</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Special highlight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specialDishes.map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => openProductModal(dish)}
                  className="bg-black border border-white/10 hover:border-[#B30000] transition-all cursor-pointer group p-3"
                >
                  <div className="relative aspect-video overflow-hidden mb-2.5 bg-black">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/90 text-white text-[11px] font-bold">
                      ₹{dish.price}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#B30000] transition-colors line-clamp-1">
                    {dish.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                    {dish.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Recommended for You */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black">
        <SectionHeading
          badge="Curated Picks"
          title="MADE FOR YOUR CRAVINGS"
          subtitle="Handpicked kitchen favourites guaranteed to hit the spot"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <FoodCardSkeleton key={i} />
            ))
          ) : (
            recommendedDishes.map((dish) => (
              <FoodCard key={dish.id} product={dish} />
            ))
          )}
        </div>
      </section>

      {/* 6. Best Combos */}
      <section className="py-14 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Value Deals"
            title="BEST COMBOS"
            subtitle="Full meals thoughtfully paired with sides and drinks for supreme satisfaction"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <FoodCardSkeleton key={i} />
              ))
            ) : (
              comboDishes.map((dish) => (
                <FoodCard key={dish.id} product={dish} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. About CKB Kattans Section */}
      <section className="py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/10 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                alt="CKB Kattans Hospitality"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Overlaid Floating Badge */}
            <div className="absolute -bottom-4 -right-2 sm:bottom-4 sm:right-4 bg-black border border-white/15 p-3.5 shadow-xl max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/5 flex items-center justify-center text-[#B30000]">
                  <Utensils size={16} />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-white">Authentic Malabar</h5>
                  <p className="text-[11px] text-neutral-400">Time-tested recipes & slow dum</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#B30000] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#B30000] inline-block"></span>
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              GOOD FOOD. GOOD MOOD.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              At CKB Kattans, dining is more than just a meal — it is a celebration of rich Malabar traditions, sizzling charcoal aromas, and the timeless joy of sharing a warm glass of fragrant sulaimani kattan tea.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Every dish that leaves our kitchen is seasoned with authentic spices, prepared using fresh premium ingredients, and served with unconditional Malabar hospitality.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Discover Our Story</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Why Choose Us */}
      <section className="py-14 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Standard"
            title="WHY CHOOSE US"
            subtitle="Committed to exceptional culinary quality and quick, hassle-free ordering"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 bg-black border border-white/10 space-y-2.5">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">01. Freshly Prepared</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Made to order with sizzling charcoal heat and traditional dum technique.
              </p>
            </div>

            <div className="p-5 bg-black border border-white/10 space-y-2.5">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">02. Quality Ingredients</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Strict hygiene standards and fresh daily procurements for premium flavours.
              </p>
            </div>

            <div className="p-5 bg-black border border-white/10 space-y-2.5">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">03. Real Hospitality</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Dedicated hospitality and swift WhatsApp assistance for every diner.
              </p>
            </div>

            <div className="p-5 bg-black border border-white/10 space-y-2.5">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">04. Signature Taste</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Generous portions, vibrant aromas and unbeatable comfort in every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Contact Us Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black">
        <SectionHeading
          badge="Get in Touch"
          title="VISIT OR ORDER DIRECTLY"
          subtitle="Stop by our welcoming dining space or message our team on WhatsApp for prompt service"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="p-5 bg-black border border-white/10 space-y-2.5">
            <div className="w-8 h-8 bg-white/5 text-[#B30000] flex items-center justify-center">
              <MapPin size={16} />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white">Our Address</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {RESTAURANT_INFO.address}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs font-bold text-[#B30000] hover:underline"
              >
                Google Maps →
              </a>
              <span className="text-neutral-600">|</span>
              <a
                href={RESTAURANT_INFO.googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs font-bold text-amber-400 hover:underline"
              >
                ★ Google Reviews →
              </a>
            </div>
          </div>

          <div className="p-5 bg-black border border-white/10 space-y-2.5">
            <div className="w-8 h-8 bg-white/5 text-[#B30000] flex items-center justify-center">
              <Clock size={16} />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white">Opening Hours</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {RESTAURANT_INFO.openingHours}
            </p>
            <span className="inline-block text-xs font-semibold text-neutral-400 pt-1">
              Kitchen active everyday including holidays
            </span>
          </div>

          <div className="p-5 bg-black border border-white/10 space-y-2.5">
            <div className="w-8 h-8 bg-white/5 text-[#B30000] flex items-center justify-center">
              <Phone size={16} />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white">WhatsApp & Phone</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {RESTAURANT_INFO.displayPhone}
            </p>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold transition-all shadow"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
