import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ 
  badge, 
  title, 
  subtitle, 
  align = "center",
  actionText,
  onActionClick
}) {
  const isLeft = align === "left";

  return (
    <div className={`mb-8 sm:mb-10 ${isLeft ? 'text-left' : 'text-center'}`}>
      <div className={`flex flex-col ${isLeft ? 'items-start' : 'items-center'}`}>
        {/* Subtle, clean typographic badge instead of artificial pill boxes */}
        {badge && (
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#B30000] mb-1.5 flex items-center gap-1.5">
            <span className="w-1 h-1 bg-[#B30000] inline-block"></span>
            {badge}
          </span>
        )}

        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 max-w-2xl font-normal">
                {subtitle}
              </p>
            )}
          </div>

          {actionText && (
            <button
              onClick={onActionClick}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-[#B30000] hover:text-[#8A0000] transition-colors group cursor-pointer self-end"
            >
              <span>{actionText}</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
