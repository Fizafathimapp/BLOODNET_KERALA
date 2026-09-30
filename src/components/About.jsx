import React from 'react';
import { Target, Eye, UserPlus, Search, HeartHandshake, ShieldCheck, Award, MapPin } from 'lucide-react';

export default function About({ onRegisterClick, onSearchClick }) {
  const steps = [
    {
      step: '01',
      title: 'Register as a Donor',
      description: 'Fill in your basic details, blood group, district location, and donation availability.',
      icon: UserPlus,
      color: 'bg-maroon-50 text-maroon-700 border-maroon-100',
    },
    {
      step: '02',
      title: 'Find Compatible Blood',
      description: 'Recipients or hospitals search by blood type and Kerala district to locate compatible matches.',
      icon: Search,
      color: 'bg-red-50 text-red-700 border-red-100',
    },
    {
      step: '03',
      title: 'Connect and Help',
      description: 'Request donor contact securely or coordinate with registered regional blood collection drives.',
      icon: HeartHandshake,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
  ];

  return (
    <section id="about" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon-100 text-maroon-800 text-xs font-bold uppercase tracking-wider">
            <span>Our Foundation & Purpose</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight">
            About BLOODNET_KERALA
          </h2>
          <p className="text-lg text-maroon-700 font-bold">
            Connecting donors with people who need blood across Kerala.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <div className="bg-blush-50/60 rounded-3xl p-8 border border-maroon-100 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-maroon-700 text-white flex items-center justify-center mb-6 shadow-md">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-3">Our Mission</h3>
            <p className="text-base text-navy-700 leading-relaxed">
              "BLOODNET_KERALA is designed to help connect blood donors and recipients through a simple, safe, and accessible digital platform across all 14 districts of Kerala."
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-navy-900 text-white flex items-center justify-center mb-6 shadow-md">
              <Eye className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-3">Our Vision</h3>
            <p className="text-base text-navy-700 leading-relaxed">
              "Building a connected community where people can find blood donation opportunities and support others during critical emergency moments, fostering a healthier Kerala."
            </p>
          </div>
        </div>

        {/* How It Works - 3 Step Visual Process */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              How It Works
            </h3>
            <p className="text-sm text-navy-600 mt-2">
              Three simple steps to save lives in your neighborhood
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.color} shadow-sm group-hover:scale-105 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-3xl font-black text-gray-200 font-mono">
                        {item.step}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-navy-900 pt-2">
                      {item.title}
                    </h4>

                    <p className="text-sm text-navy-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <span className="text-xs font-semibold text-maroon-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Step {index + 1} Overview &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact & Kerala Community Highlights */}
        <div className="mt-16 bg-navy-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-maroon-700 text-xs font-bold uppercase tracking-wider text-red-100">
                Community Network
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                One Blood. One Community. A Healthier Kerala.
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Whether in Kazhakkoottam, Kalamassery, Thrissur, or Kozhikode, BLOODNET_KERALA serves as a digital bridge between voluntary donors and hospital blood request coordinators.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={onRegisterClick}
                className="w-full py-3.5 px-6 bg-maroon-600 hover:bg-maroon-700 text-white font-bold rounded-xl shadow-md transition-all text-center"
              >
                Join As Voluntary Donor
              </button>
              <button
                onClick={onSearchClick}
                className="w-full py-3.5 px-6 bg-navy-800 hover:bg-navy-700 text-gray-200 hover:text-white font-bold rounded-xl border border-navy-700 transition-all text-center text-sm"
              >
                Explore Kerala Donor Directory
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
