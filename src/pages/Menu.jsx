import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, UtensilsCrossed } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import CategoryNavigation from '../components/CategoryNavigation';
import { FoodCardSkeleton } from '../components/Skeleton';
import { categories } from '../data/categories';
import { products } from '../data/products';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [dietFilter, setDietFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);

  // Initial load skeleton simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      if (catId === 'all') {
        p.delete('category');
      } else {
        p.set('category', catId);
      }
      return p;
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiet =
        dietFilter === 'all' ? true :
        dietFilter === 'veg' ? item.isVeg === true :
        item.isVeg === false;

      return matchesCategory && matchesSearch && matchesDiet;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [activeCategory, searchQuery, dietFilter, sortBy]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#B30000]/15 text-[#B30000] border border-[#B30000]/30 mb-2.5">
            Pure Indulgence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            OUR FOOD MENU
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
            Freshly prepared Malabar biriyanis, charcoal grills, rolls and kattan tea brewed to perfection.
          </p>
        </div>

        {/* Clean Filter Controls & Category Navigation — Transparent with no boxed grey background */}
        <div className="mb-8 space-y-6 bg-transparent">
          {/* Search, Diet Filter and Sort Row */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food by name, ingredient, spice..."
                className="w-full bg-black/60 border border-white/15 rounded-md pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B30000] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Diet Filter Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3.5 py-2.5 rounded-md text-xs font-bold transition-all ${
                  dietFilter === 'all'
                    ? 'bg-white text-black'
                    : 'bg-black text-neutral-400 hover:text-white border border-white/15'
                }`}
              >
                All Dishes
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-md text-xs font-bold transition-all ${
                  dietFilter === 'non-veg'
                    ? 'bg-[#B30000] text-white shadow-md shadow-[#B30000]/30'
                    : 'bg-black text-neutral-400 hover:text-white border border-white/15'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                Non-Veg
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-md text-xs font-bold transition-all ${
                  dietFilter === 'veg'
                    ? 'bg-green-600 text-white'
                    : 'bg-black text-neutral-400 hover:text-white border border-white/15'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                Veg
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black border border-white/15 text-white text-xs font-semibold rounded-md px-3.5 py-2.5 focus:outline-none focus:border-[#B30000]"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Categories Pill / Slider with Bigger Round Categories */}
          <div className="pt-2">
            <CategoryNavigation
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs sm:text-sm text-neutral-400">
            Showing <span className="font-bold text-white">{filteredProducts.length}</span> dishes
            {activeCategory !== 'all' && (
              <span> in <span className="text-[#B30000] font-semibold">{categories.find(c => c.id === activeCategory)?.name}</span></span>
            )}
          </p>

          {(activeCategory !== 'all' || searchQuery !== '' || dietFilter !== 'all') && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setDietFilter('all');
              }}
              className="text-xs text-[#B30000] hover:underline font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Food Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <FoodCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-black rounded border border-white/10 p-6 max-w-md mx-auto">
            <div className="w-14 h-14 rounded bg-white/5 flex items-center justify-center mx-auto text-neutral-400 mb-3">
              <UtensilsCrossed size={26} />
            </div>
            <h3 className="text-base font-bold text-white">No dishes found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
              We couldn't find any dishes matching your current search or diet criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setDietFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold uppercase tracking-wider"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
