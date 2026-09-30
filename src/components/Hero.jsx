import React from 'react';
import { Heart, Search, ChevronRight, ShieldCheck, MapPin, Users } from 'lucide-react';

export default function Hero({ onRegisterClick, onCheckTypesClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-50/60 via-white to-white py-12 lg:py-20 border-b border-gray-100">
      {/* Subtle Kerala Aesthetic Watermark / Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-5 kerala-bg-pattern"></div>
      
      {/* Decorative background blur shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-maroon-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-maroon-100/70 border border-maroon-200/80 text-maroon-800 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-maroon-600 animate-ping"></span>
              <span>Serving All 14 Districts of Kerala</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
              A drop of blood <br className="hidden sm:inline" />
              can give someone <br />
              <span className="text-maroon-700 relative inline-block">
                a lifetime.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-maroon-200/60" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-navy-700 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Join the mission. Be a hero. Donate blood. Your small act can make a big difference for patients across Kerala hospitals.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto px-8 py-4 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Become a Donor</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onCheckTypesClick}
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-gray-50 text-navy-800 font-bold text-base rounded-xl border-2 border-navy-200 hover:border-maroon-300 shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4 text-maroon-700" />
                <span>Check Blood Type</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-navy-700">Verified Donors</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-maroon-700 flex-shrink-0" />
                <span className="text-xs font-semibold text-navy-700">14 Districts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-navy-700">24/7 Community</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Graphic */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-maroon-200 animate-spin-slow"></div>
              
              {/* Inner glowing circle */}
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-maroon-700 via-maroon-600 to-red-500 shadow-2xl flex items-center justify-center relative p-8 text-white">
                
                {/* SVG Blood Drop Graphic with ECG Heartbeat */}
                <div className="relative flex flex-col items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-40 h-40 text-white drop-shadow-md filter"
                  >
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                  
                  {/* ECG Heart Line Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-maroon-800">
                    <Heart className="w-10 h-10 fill-white text-maroon-700 animate-bounce" />
                    <svg className="w-28 h-8 text-maroon-800 mt-1" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="4">
                      <path d="M0 20 L25 20 L32 5 L40 35 L48 10 L55 25 L62 20 L100 20" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Floating Micro Badge 1 */}
                <div className="absolute -top-3 left-4 bg-white text-navy-900 px-3.5 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-2 animate-float">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <div className="text-left">
                    <p className="text-[10px] font-medium text-gray-500 uppercase">Status</p>
                    <p className="text-xs font-bold text-navy-900">100% Voluntary</p>
                  </div>
                </div>

                {/* Floating Micro Badge 2 */}
                <div className="absolute -bottom-4 right-2 bg-white text-navy-900 px-4 py-2.5 rounded-xl shadow-xl border border-gray-100 flex items-center space-x-2 animate-float-delayed">
                  <div className="w-7 h-7 rounded-lg bg-blush-50 flex items-center justify-center text-maroon-700 font-extrabold text-xs">
                    O-
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-medium text-gray-500">Universal Donor</p>
                    <p className="text-xs font-bold text-maroon-700">Urgent Demand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
