import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNavigation from './components/BottomNavigation';
import FoodDetailsModal from './components/FoodDetailsModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import About from './pages/About';
import TrackOrder from './pages/TrackOrder';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-black text-white antialiased selection:bg-[#B30000] selection:text-white">
        {/* Sticky/Floating Desktop Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 pb-16 md:pb-0 bg-black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/track" element={<TrackOrder />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Mobile Bottom Navigation */}
        <BottomNavigation />

        {/* Global Modals & Drawers */}
        <FoodDetailsModal />
        <CartDrawer />
        <AuthModal />
      </div>
    </Router>
  );
}
