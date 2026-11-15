import React from 'react';
import { Utensils, Coffee, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo/logo.png';
import SectionHeading from '../components/SectionHeading';
import { RESTAURANT_INFO } from '../utils/whatsappCheckout';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white py-10 sm:py-14 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="w-18 h-18 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden border-2 border-[#B30000] mb-5 shadow-xl bg-black">
            <img src={logoImg} alt="CKB Kattans" className="w-full h-full object-cover" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#B30000]/15 text-[#B30000] border border-[#B30000]/30 mb-2.5">
            Our Heritage & Passion
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            ABOUT CKB KATTANS
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Where authentic Malabar dum recipes meet the fiery warmth of charcoal grills and the soothing aroma of freshly brewed Sulaimani kattan tea.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div className="space-y-4 text-neutral-400 text-xs sm:text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Rooted in Malabar Flavours. Crafted for Modern Cravers.
            </h2>
            <p>
              CKB Kattans was founded on a simple, timeless belief: good food brings great moments. In Kerala's vibrant culinary landscape, few things match the comfort of a steaming glass of spiced *kattan chaya* shared after an exquisite meal of flaky porottas or aromatic dum biriyani.
            </p>
            <p>
              We wanted to create a welcoming destination where tradition and contemporary food culture live harmoniously side by side. From slow-cooked Thalassery dum pots to sizzling smashed burgers and smoky shawarmas sliced hot from the spit, every dish is an homage to honest flavours and quality ingredients.
            </p>
            <p>
              We do not cut corners. Our spice blends are hand-roasted in small batches, our meats are freshly sourced, and our kitchen strictly adheres to high standards of hygiene and hospitality.
            </p>

            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#B30000]/30"
              >
                <span>Explore Our Menu</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-3.5">
              <div className="aspect-[3/4] rounded overflow-hidden border border-white/10 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
                  alt="Aromatic Biriyani"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded overflow-hidden border border-white/10 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80"
                  alt="Signature Kattan Tea"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-3.5 pt-5">
              <div className="aspect-square rounded overflow-hidden border border-white/10 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
                  alt="Charcoal Alfaham"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[3/4] rounded overflow-hidden border border-white/10 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
                  alt="Gourmet Burger"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our 4 Core Pillars */}
        <div className="mb-16">
          <SectionHeading
            badge="Our Promise"
            title="THE FOUR PILLARS OF CKB KATTANS"
            subtitle="What guides our kitchen, our service and our values every single day"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="p-5 rounded bg-black border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded bg-[#B30000]/15 text-[#B30000] flex items-center justify-center">
                <Utensils size={20} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">Authentic Recipes</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Heritage Malabar dum cooking methods, slow-roasted spice blends and tender slow-caramelized curries.
              </p>
            </div>

            <div className="p-5 rounded bg-black border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded bg-[#829B32]/15 text-[#829B32] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">Hygiene & Purity</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Uncompromising sanitization standards, fresh daily raw poultry and clean preparation counters.
              </p>
            </div>

            <div className="p-5 rounded bg-black border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded bg-[#B30000]/15 text-[#B30000] flex items-center justify-center">
                <Coffee size={20} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">The Kattan Tradition</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Our signature Sulaimani black tea brewed fresh with crushed cardamom, fresh mint and lemon zest.
              </p>
            </div>

            <div className="p-5 rounded bg-black border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded bg-[#829B32]/15 text-[#829B32] flex items-center justify-center">
                <Users size={20} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">Heartfelt Hospitality</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Prompt service, warm welcomes, and responsive WhatsApp support for every single customer.
              </p>
            </div>
          </div>
        </div>

        {/* Visit & Operating Hours Callout */}
        <div className="rounded bg-black border border-[#B30000]/30 p-6 sm:p-10 text-center max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
            EXPERIENCE CKB KATTANS TODAY
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mb-5">
            Join us for lunch, dinner or an evening tea catch-up. Or simply place your order in 30 seconds via WhatsApp!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/menu"
              className="px-6 py-2.5 rounded bg-[#B30000] hover:bg-[#8A0000] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#B30000]/30"
            >
              Order Online Now
            </Link>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wider uppercase border border-white/15 transition-all"
            >
              Chat With Restaurant
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
