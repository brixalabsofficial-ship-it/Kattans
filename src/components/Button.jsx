import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  onClick,
  type = 'button',
  loading = false,
  loadingText,
  disabled = false,
  className = '',
  icon: Icon,
  variant = 'primary',
  size = 'md',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary: 'bg-[#B30000] hover:bg-[#8A0000] text-white shadow-md shadow-[#B30000]/30 border-0',
    glass: 'bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md',
    outline: 'bg-transparent border border-white/20 hover:border-white/50 text-white',
    dark: 'bg-black border border-white/10 hover:border-white/30 text-white',
  };

  const sizes = {
    xs: 'px-2.5 py-1 text-[10px] rounded-xs',
    sm: 'px-3 py-1.5 text-xs rounded',
    md: 'px-4 py-2 text-xs sm:text-sm rounded',
    lg: 'px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={size === 'xs' ? 12 : 15} className="animate-spin text-current" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={size === 'xs' ? 12 : 15} />}
          {children}
        </>
      )}
    </button>
  );
}
