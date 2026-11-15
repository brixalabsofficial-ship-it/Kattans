import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageSquare, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/whatsappCheckout';
import brandLogoImg from '../assets/logo/brand-logo.png';

export default function Footer() {
  return (
    <footer id="contact-info" className="bg-black border-t border-red-950/40 pt-16 pb-24 md:pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="h-12 sm:h-14 flex items-center">
                <img
                  src={brandLogoImg}
                  alt="CEEKEYBEE'S KATTANS - Love Your Food Every Day"
                  className="h-full w-auto object-contain brightness-105 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Serving the authentic warmth of Malabar cuisine, charcoal grills, crispy street burgers and our signature piping hot Kattan chaya.
            </p>

            {/* Google Reviews Badge */}
            <div className="pt-1">
              <a
                href={RESTAURANT_INFO.googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-all group"
              >
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star size={13} className="fill-amber-400" />
                  <Star size={13} className="fill-amber-400" />
                  <Star size={13} className="fill-amber-400" />
                  <Star size={13} className="fill-amber-400" />
                  <Star size={13} className="fill-amber-400" />
                </div>
                <span className="font-bold text-[11px] group-hover:text-[#B30000] transition-colors">
                  Review Us on Google →
                </span>
              </a>
            </div>

            <div className="pt-1">
              <span className="text-xs font-bold text-[#B30000] uppercase tracking-widest block">
                {RESTAURANT_INFO.tagline}
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#B30000] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">Complete Food Menu</Link>
              </li>
              <li>
                <Link to="/menu?category=combos" className="hover:text-white transition-colors">Best Value Combos</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Our Story & Kitchen</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Cart & Instant Checkout</Link>
              </li>
              <li>
                <a 
                  href={RESTAURANT_INFO.googleReviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400/90 hover:text-amber-300 transition-colors flex items-center gap-1.5 pt-1"
                >
                  <Star size={12} className="fill-amber-400" />
                  <span>Read Customer Reviews</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Schedule */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#829B32] pl-2.5">
              Service Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-[#829B32] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex justify-between gap-3 text-neutral-300">
                    <span>Sun - Thu, Sat:</span>
                    <span className="font-semibold text-white">12:00 PM – 12:00 AM</span>
                  </div>
                  <div className="flex justify-between gap-3 text-neutral-300">
                    <span>Friday:</span>
                    <span className="font-semibold text-white">12:00 PM – 12:30 AM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
                <MessageSquare size={16} className="text-[#829B32] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">WhatsApp Orders</span>
                  <span>Instant confirmation during active hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#B30000] pl-2.5">
              Visit & Connect
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#B30000] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">{RESTAURANT_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#B30000] flex-shrink-0" />
                <span className="text-white font-semibold">{RESTAURANT_INFO.displayPhone}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#B30000] flex-shrink-0" />
                <span>{RESTAURANT_INFO.email}</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#B30000] hover:bg-[#8A0000] text-white transition-all text-xs font-bold shadow-md shadow-[#B30000]/30 text-center"
                >
                  WhatsApp Us ({RESTAURANT_INFO.displayPhone})
                </a>

                <a
                  href={RESTAURANT_INFO.googleReviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all text-xs font-semibold text-center flex items-center justify-center gap-1.5"
                >
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span>Google Reviews</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} CKB Kattans. All rights reserved.</p>
          <p className="text-neutral-500">Love Your Food Every Day.</p>
        </div>
      </div>
    </footer>
  );
}
