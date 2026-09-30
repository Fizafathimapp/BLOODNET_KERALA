import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import QuickBloodSearch from './components/QuickBloodSearch';
import About from './components/About';
import DonorRegistration from './components/DonorRegistration';
import BloodTypesPage from './components/BloodTypesPage';
import DonorDirectory from './components/DonorDirectory';
import EventsSection from './components/EventsSection';
import EmergencyRequestModal from './components/EmergencyRequestModal';
import EventDetailModal from './components/EventDetailModal';
import DonorContactModal from './components/DonorContactModal';
import LoginModal from './components/LoginModal';
import PrivacyTermsModal from './components/PrivacyTermsModal';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';

import { getStoredDonors } from './utils/storage';
import { PhoneCall, AlertTriangle, Droplet } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [donors, setDonors] = useState([]);
  
  // Modals state
  const [selectedDonorForContact, setSelectedDonorForContact] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyInitialTab, setPrivacyInitialTab] = useState('privacy');

  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    setDonors(getStoredDonors());
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleRegistrationSuccess = (newDonor) => {
    setDonors(getStoredDonors());
    showToast(`Welcome to BLOODNET_KERALA! Registered as ${newDonor.bloodGroup} donor in ${newDonor.district}.`);
  };

  const handleEmergencySubmitted = (req) => {
    showToast(`Emergency blood request ticket logged (${req.id}). Connect with hospital blood bank!`, 'success');
  };

  const handleLoginSuccess = (user) => {
    showToast(`Signed in successfully as ${user.mobile}.`);
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-navy-800 antialiased selection:bg-maroon-100 selection:text-maroon-800">
      
      {/* Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onRegisterClick={() => handleNavClick('register')}
          onCheckTypesClick={() => handleNavClick('blood-types')}
        />

        {/* 2. Demonstration Statistics Section */}
        <StatsSection />

        {/* 3. Quick Blood Search Section */}
        <QuickBloodSearch
          donors={donors}
          onContactDonor={(donor) => setSelectedDonorForContact(donor)}
        />

        {/* Floating Emergency Banner Callout */}
        <section className="bg-gradient-to-r from-maroon-800 via-maroon-700 to-maroon-900 text-white py-8 border-y border-maroon-900 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Need Blood Urgently in Kerala?</h3>
                <p className="text-xs sm:text-sm text-red-100 mt-0.5">
                  If you or someone you know needs blood, check compatible blood groups and contact a hospital or authorized blood bank immediately.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-red-50 text-maroon-900 font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 animate-bounce-short flex-shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-maroon-700" />
              <span>Request Emergency Blood</span>
            </button>
          </div>
        </section>

        {/* 4. About Section */}
        <About
          onRegisterClick={() => handleNavClick('register')}
          onSearchClick={() => handleNavClick('search')}
        />

        {/* 5. Donor Directory Section */}
        <DonorDirectory
          donors={donors}
          onContactDonor={(donor) => setSelectedDonorForContact(donor)}
        />

        {/* 6. Donor Registration Section */}
        <DonorRegistration
          onRegistrationSuccess={handleRegistrationSuccess}
        />

        {/* 7. Blood Types Overview & Interactive Finder */}
        <BloodTypesPage
          onFindDonorsInDistrict={(bloodGroup) => {
            handleNavClick('search');
            showToast(`Searching compatible donors for group ${bloodGroup}...`);
          }}
        />

        {/* 8. Events & Updates Section */}
        <EventsSection
          onSelectEvent={(evt) => setSelectedEvent(evt)}
        />

      </main>

      {/* Footer */}
      <Footer
        onNavClick={handleNavClick}
        onOpenPrivacy={() => {
          setPrivacyInitialTab('privacy');
          setIsPrivacyModalOpen(true);
        }}
        onOpenTerms={() => {
          setPrivacyInitialTab('terms');
          setIsPrivacyModalOpen(true);
        }}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <EmergencyRequestModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onRequestSubmitted={handleEmergencySubmitted}
      />

      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegisterForEvent={(evt) => {
          showToast(`Expressed interest in ${evt.title}. Thank you!`);
        }}
      />

      <DonorContactModal
        donor={selectedDonorForContact}
        onClose={() => setSelectedDonorForContact(null)}
        onShowToast={showToast}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <PrivacyTermsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        initialTab={privacyInitialTab}
      />

      {/* Toast Feedback */}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

    </div>
  );
}
