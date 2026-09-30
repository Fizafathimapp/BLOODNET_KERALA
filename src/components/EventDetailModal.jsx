import React, { useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Building, Users, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function EventDetailModal({ event, onClose, onRegisterForEvent }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 relative my-8">
        
        {/* Header Image */}
        <div className="relative h-56 bg-gray-900">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-navy-900 flex items-center justify-center transition-all shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 ${event.badgeColor}`}>
              {event.category}
            </span>
            <h2 className="text-2xl font-extrabold text-white leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-gray-200 text-xs">
            <div className="flex items-center space-x-2.5">
              <Calendar className="w-4 h-4 text-maroon-700 flex-shrink-0" />
              <div>
                <span className="text-gray-500 block">Date</span>
                <span className="font-bold text-navy-900">{event.formattedDate}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <Clock className="w-4 h-4 text-maroon-700 flex-shrink-0" />
              <div>
                <span className="text-gray-500 block">Timing</span>
                <span className="font-bold text-navy-900">{event.time}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 sm:col-span-2 pt-2 border-t border-gray-200">
              <MapPin className="w-4 h-4 text-maroon-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-500 block">Venue & Location</span>
                <span className="font-bold text-navy-900">{event.location}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 sm:col-span-2 pt-2 border-t border-gray-200">
              <Building className="w-4 h-4 text-maroon-700 flex-shrink-0" />
              <div>
                <span className="text-gray-500 block">Organized By</span>
                <span className="font-bold text-navy-900">{event.organizer}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-navy-900">Event Overview</h3>
            <p className="text-sm text-navy-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Blood Groups Needed */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-navy-900">Priority Blood Groups Needed:</h3>
            <div className="flex flex-wrap gap-2">
              {event.bloodGroupsNeeded.map((grp) => (
                <span
                  key={grp}
                  className="px-3 py-1 rounded-lg bg-maroon-50 text-maroon-800 font-bold text-xs border border-maroon-200 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-maroon-600" />
                  {grp}
                </span>
              ))}
            </div>
          </div>

          {/* Demo Note */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>Demonstration listing. Connect with regional health coordinators for real-time camp updates.</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onRegisterForEvent(event);
                onClose();
              }}
              className="w-full py-3.5 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-sm rounded-xl shadow-md transition-all text-center"
            >
              Express Interest / Register for Camp
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-navy-800 font-bold text-sm rounded-xl transition-colors text-center"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
