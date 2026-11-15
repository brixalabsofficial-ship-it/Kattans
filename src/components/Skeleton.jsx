import React from 'react';

export function Skeleton({ className = '', variant = 'rect' }) {
  const baseClasses = 'animate-pulse bg-white/10';
  const variantClasses = {
    rect: 'rounded-none',
    rounded: 'rounded-md',
    circle: 'rounded-full',
  }[variant] || 'rounded-none';

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      aria-hidden="true"
    />
  );
}

export function FoodCardSkeleton() {
  return (
    <div className="bg-black rounded-md overflow-hidden border border-white/10 p-0 flex flex-col justify-between shadow-xl">
      <Skeleton className="aspect-[4/3] w-full" variant="rect" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4 rounded-xs" />
        <Skeleton className="h-3 w-full rounded-xs" />
        <Skeleton className="h-3 w-1/2 rounded-xs" />
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <Skeleton className="h-4 w-16 rounded-xs" />
          <Skeleton className="h-7 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Skeleton className="w-20 h-20 sm:w-24 sm:h-24" variant="circle" />
      <Skeleton className="h-3 w-14 rounded-xs" />
    </div>
  );
}

export function BannerSkeleton() {
  return (
    <div className="w-full aspect-[2/1] bg-black">
      <Skeleton className="w-full h-full" variant="rect" />
    </div>
  );
}
