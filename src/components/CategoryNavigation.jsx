import React, { useRef } from 'react';
import CategoryCard from './CategoryCard';

export default function CategoryNavigation({ categories, activeCategory, onSelectCategory }) {
  const scrollRef = useRef(null);

  return (
    <div className="relative w-full">
      <div 
        ref={scrollRef}
        className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-2 no-scrollbar scroll-smooth"
      >
        {categories.map((cat) => (
          <div key={cat.id} className="flex-shrink-0">
            <CategoryCard
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={onSelectCategory}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
