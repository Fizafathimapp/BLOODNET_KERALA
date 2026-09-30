import React from 'react';
import { Droplet, Heart, Phone, Mail, MapPin, ShieldAlert, Globe, ExternalLink } from 'lucide-react';

export default function Footer({ onNavClick, onOpenPrivacy, onOpenTerms, onOpenEmergency }) {
  return (
    <footer className="bg-navy-950 text-white pt-16 pb-12 border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (Cols 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-maroon-700 flex items-center justify-center text-white shadow-lg">
                <Droplet className="w-6 h-6 fill-white text-maroon-700" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white">
                BLOODNET<span className="text-maroon-500">_KERALA</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-maroon-400">
              One Blood. One Community. A Healthier Kerala.
            </p>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Connecting voluntary blood donors with hospitals and recipients across all 14 districts of Kerala through clean, accessible technology.
            </p>

            {/* Emergency Hotline Box */}
            <div className="p-3.5 rounded-2xl bg-navy-900 border border-navy-800 text-xs text-gray-300 space-y-1">
              <span className="font-bold text-red-400 uppercase tracking-wider text-[10px] block">
                Kerala Emergency Helpline
              </span>
              <p className="font-extrabold text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" /> Dial 108 (Ambulance) / 104 (Health Information)
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider border-b border-navy-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 font-medium text-gray-300">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-maroon-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('search')} className="hover:text-maroon-400 transition-colors">
                  Find Compatible Donors
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-maroon-400 transition-colors">
                  About BLOODNET_KERALA
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('register')} className="hover:text-maroon-400 transition-colors">
                  Become a Voluntary Donor
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('blood-types')} className="hover:text-maroon-400 transition-colors">
                  Blood Group Compatibility
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('events')} className="hover:text-maroon-400 transition-colors">
                  Events & Blood Camps
                </button>
              </li>
            </ul>
          </div>

          {/* Kerala Districts Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider border-b border-navy-800 pb-2">
              Major Hubs Served
            </h4>
            <ul className="space-y-2 font-medium text-gray-400">
              <li>• Ernakulam / Kochi</li>
              <li>• Thiruvananthapuram</li>
              <li>• Thrissur</li>
              <li>• Kozhikode</li>
              <li>• Kottayam</li>
              <li>• Malappuram & All 14 Districts</li>
            </ul>
          </div>

          {/* Policies & Contact Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider border-b border-navy-800 pb-2">
              Policies & Emergency
            </h4>
            <ul className="space-y-2.5 font-medium text-gray-300">
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-maroon-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-maroon-400 transition-colors">
                  Terms of Service & Disclaimer
                </button>
              </li>
              <li>
                <button onClick={onOpenEmergency} className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                  Request Emergency Blood
                </button>
              </li>
            </ul>

            {/* Social Icons Mock */}
            <div className="pt-3 flex items-center space-x-3 text-gray-400">
              <span className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center hover:text-white cursor-pointer transition-colors">
                <Globe className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center hover:text-white cursor-pointer transition-colors">
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>

        {/* Disclaimer Text */}
        <div className="pt-8 border-t border-navy-900 text-center text-xs text-gray-400 leading-relaxed max-w-4xl mx-auto space-y-2">
          <p>
            <strong>Medical Disclaimer:</strong> BLOODNET_KERALA is an informational demonstration network designed to facilitate voluntary blood donation awareness. This website does not perform clinical laboratory testing, medical diagnosis, or emergency dispatch. Transfusion compatibility must be established by certified medical professionals and blood bank laboratories.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <p>© 2026 BLOODNET_KERALA. Demo platform.</p>
          <div className="flex items-center space-x-1 text-gray-400">
            <span>Built with care for Kerala healthcare community</span>
            <Heart className="w-3.5 h-3.5 fill-maroon-600 text-maroon-600" />
          </div>
        </div>

      </div>
    </footer>
  );
}
