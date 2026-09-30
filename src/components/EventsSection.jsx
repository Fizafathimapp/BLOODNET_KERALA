import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Tent, Tag, ChevronRight, Info, AlertTriangle } from 'lucide-react';
import { MOCK_EVENTS } from '../data/mockEvents';

export default function EventsSection({ onSelectEvent }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Upcoming', 'Blood Donation Camps', 'Emergency Updates', 'Community Events'];

  const filteredEvents = MOCK_EVENTS.filter((evt) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Upcoming') return evt.isUpcoming;
    return evt.category === activeCategory;
  });

  return (
    <section id="events" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-100 text-maroon-800 text-xs font-bold uppercase tracking-wider">
            <Tent className="w-4 h-4 text-maroon-700" />
            <span>Community Drives & Camps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Events & Updates
          </h2>
          <p className="text-base text-navy-700">
            Stay informed about upcoming blood donation camps and community initiatives across Kerala.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-maroon-700 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-navy-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Demo Content Disclaimer Banner */}
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center text-xs text-navy-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-maroon-700 flex-shrink-0" />
          <span>All event listings are demonstration / sample camp entries for BLOODNET_KERALA interface.</span>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold shadow-sm ${evt.badgeColor}`}>
                      {evt.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-navy-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-maroon-400" />
                    {evt.district}
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-navy-900 group-hover:text-maroon-700 transition-colors leading-snug">
                    {evt.title}
                  </h3>

                  <div className="space-y-2 text-xs text-navy-700 font-medium">
                    <div className="flex items-center gap-2 text-navy-800">
                      <Calendar className="w-4 h-4 text-maroon-700 flex-shrink-0" />
                      <span>{evt.formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-navy-800">
                      <Clock className="w-4 h-4 text-maroon-700 flex-shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-start gap-2 text-navy-800">
                      <MapPin className="w-4 h-4 text-maroon-700 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-navy-600 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectEvent(evt)}
                  className="w-full py-3 bg-slate-900 hover:bg-maroon-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 group-hover:shadow"
                >
                  <span>View Event Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
