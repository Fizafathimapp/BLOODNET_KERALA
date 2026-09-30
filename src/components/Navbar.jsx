import React, { useState, useEffect } from 'react';
import { Droplet, Menu, X, UserCheck, AlertTriangle, ShieldCheck, PhoneCall } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenLogin, onOpenEmergency }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Find Donors' },
    { id: 'about', label: 'About' },
    { id: 'register', label: 'Donor Registration' },
    { id: 'blood-types', label: 'Blood Types' },
    { id: 'events', label: 'Events & Updates' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Alert for Emergency Hotline */}
      <div className="bg-maroon-900 text-white text-xs py-2 px-4 border-b border-maroon-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-maroon-700 text-red-100 uppercase tracking-wider animate-pulse">
              Govt Recognized Demo Portal
            </span>
            <span className="text-gray-200 hidden md:inline">
              Official Kerala Voluntary Donor Network Initiative • Helpline: 104 / 108
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenEmergency}
              className="font-medium text-red-200 hover:text-white flex items-center space-x-1 transition-colors underline"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Urgent Blood Request</span>
            </button>
            <span className="text-maroon-700">|</span>
            <span className="text-gray-300 text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Free Service
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100'
            : 'bg-white py-4 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-maroon-600 to-maroon-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Droplet className="w-6 h-6 fill-white text-maroon-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-navy-900 flex items-center gap-1">
                  BLOODNET<span className="text-maroon-600">_KERALA</span>
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-navy-600 uppercase -mt-1">
                  Donate Blood • Save Lives
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blush-50 text-maroon-700 font-bold shadow-sm'
                        : 'text-navy-700 hover:text-maroon-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 text-sm font-semibold text-navy-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-1.5"
              >
                <UserCheck className="w-4 h-4 text-maroon-700" />
                <span>Donor Login</span>
              </button>
              <button
                onClick={onOpenEmergency}
                className="px-4 py-2 text-sm font-bold text-white bg-maroon-700 hover:bg-maroon-800 rounded-lg shadow-sm hover:shadow transition-all flex items-center space-x-1.5 animate-pulse"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Emergency Request</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-navy-800 hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-xl space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      isActive
                        ? 'bg-maroon-50 text-maroon-800 font-bold border-l-4 border-maroon-700'
                        : 'text-navy-800 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="pt-3 border-t border-gray-100 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-3 text-center text-sm font-semibold text-navy-800 bg-gray-100 rounded-lg"
              >
                Donor Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEmergency();
                }}
                className="w-full py-3 text-center text-sm font-bold text-white bg-maroon-700 rounded-lg shadow-sm"
              >
                Emergency Blood Request
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
