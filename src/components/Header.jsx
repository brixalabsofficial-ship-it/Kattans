import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, LogOut } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import brandLogoImg from '../assets/logo/brand-logo.png';

export default function Header() {
  const navigate = useNavigate();
  const { toggleCart, getItemCount } = useCartStore();
  const { user, openAuthModal, logout } = useAuthStore();
  const itemCount = getItemCount();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 pointer-events-none transition-all duration-300">
      <div className={`w-full transition-all duration-300 ${isScrolled ? 'pt-3 px-3 sm:px-6' : 'pt-0 px-4 sm:px-6 lg:px-8'}`}>
        <div 
          className={`pointer-events-auto mx-auto transition-all duration-300 flex items-center justify-between ${
            isScrolled
              ? 'max-w-5xl bg-black/65 hover:bg-black/80 backdrop-blur-2xl border border-white/15 hover:border-[#B30000]/40 rounded-full px-5 sm:px-8 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.85)] ring-1 ring-white/10'
              : 'max-w-7xl bg-transparent border-b border-transparent py-4'
          }`}
        >
          {/* Logo Brand */}
          <Link to="/" className="flex items-center group">
            <div className={`transition-all duration-300 flex items-center ${
              isScrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-12 md:h-14'
            }`}>
              <img
                src={brandLogoImg}
                alt="CEEKEYBEE'S KATTANS - Love Your Food Every Day"
                className="h-full w-auto object-contain brightness-105 group-hover:scale-102 transition-transform drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <NavLink
              to="/"
              className={({ isActive }) => `
                text-xs sm:text-sm font-semibold tracking-wide transition-colors
                ${isActive ? 'text-[#B30000]' : 'text-neutral-300 hover:text-white'}
              `}
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) => `
                text-xs sm:text-sm font-semibold tracking-wide transition-colors
                ${isActive ? 'text-[#B30000]' : 'text-neutral-300 hover:text-white'}
              `}
            >
              Menu
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `
                text-xs sm:text-sm font-semibold tracking-wide transition-colors
                ${isActive ? 'text-[#B30000]' : 'text-neutral-300 hover:text-white'}
              `}
            >
              About Us
            </NavLink>
            <a
              href="#contact-info"
              className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes..."
                    autoFocus
                    onBlur={() => !searchQuery && setIsSearchOpen(false)}
                    className="w-36 sm:w-48 bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-xs text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#B30000]"
                  />
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border-0 backdrop-blur-md"
                  aria-label="Search"
                >
                  <Search size={17} />
                </button>
              )}
            </div>

            {/* User Account / Profile Button */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border-0 text-xs font-bold text-white transition-all backdrop-blur-md"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#829B32] text-black flex items-center justify-center text-[10px] font-black">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-2xl border border-white/20 rounded-md p-3 shadow-2xl z-50 space-y-2">
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{user.phone}</p>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 text-xs font-semibold text-[#B30000] hover:text-[#8A0000] transition-colors"
                        >
                          <LogOut size={13} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border-0 text-xs font-bold text-white transition-all backdrop-blur-md"
                  aria-label="Sign In"
                >
                  <User size={15} />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={toggleCart}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border-0 backdrop-blur-md"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag size={17} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-0.5 bg-[#B30000] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Order Now Desktop CTA Button */}
            <Link
              to="/menu"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B30000] hover:bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#B30000]/30 border-0"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
