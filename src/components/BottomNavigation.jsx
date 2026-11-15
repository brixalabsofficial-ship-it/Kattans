import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Utensils, ShoppingBag, Info } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function BottomNavigation() {
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: Utensils },
    { name: 'Cart', path: '/cart', icon: ShoppingBag, badge: itemCount },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="md:hidden fixed bottom-3 inset-x-0 z-40 px-3 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <nav 
          aria-label="Mobile Navigation"
          className="relative flex items-center justify-around bg-black/95 backdrop-blur-xl border border-red-950/40 rounded-md px-2 py-2 shadow-2xl shadow-black"
          style={{ paddingBottom: 'calc(0.4rem + env(safe-area-inset-bottom, 0px))' }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  relative flex flex-col items-center justify-center py-1 px-3 rounded transition-all
                  ${isActive ? 'text-[#B30000]' : 'text-neutral-400 hover:text-white'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="relative">
                      <Icon size={19} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
                      
                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.div
                          layoutId="bottomNavIndicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B30000]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Cart badge */}
                      {Boolean(item.badge && item.badge > 0) && (
                        <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-0.5 bg-[#B30000] text-white text-[9px] font-black rounded-full flex items-center justify-center border border-black">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] font-medium tracking-tight mt-1">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
