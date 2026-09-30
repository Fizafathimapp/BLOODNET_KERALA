import React from 'react';
import { Users, Droplets, HeartHandshake, Tent, Info } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      id: 'donors',
      value: '12,580+',
      label: 'Registered Donors',
      sublabel: 'Across 14 Kerala Districts',
      icon: Users,
      color: 'text-maroon-700 bg-maroon-50 border-maroon-100',
    },
    {
      id: 'units',
      value: '8,420+',
      label: 'Units Collected',
      sublabel: 'Voluntary Contributions',
      icon: Droplets,
      color: 'text-red-700 bg-red-50 border-red-100',
    },
    {
      id: 'lives',
      value: '1,250+',
      label: 'Lives Reached',
      sublabel: 'Critical & Emergency Care',
      icon: HeartHandshake,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    },
    {
      id: 'camps',
      value: '14',
      label: 'Active Blood Camps',
      sublabel: 'Ongoing Drive Campaigns',
      icon: Tent,
      color: 'text-blue-700 bg-blue-50 border-blue-100',
    },
  ];

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Notice */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-bold tracking-widest text-navy-600 uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-maroon-600"></span>
            Community Impact Snapshot
          </h2>
          <span className="text-[11px] text-gray-500 flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
            <Info className="w-3 h-3 text-navy-500" /> Demo platform metrics
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="font-bold text-sm text-navy-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-700 mt-0.5 font-normal">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
