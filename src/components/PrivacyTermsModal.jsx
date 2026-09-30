import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Lock, AlertTriangle } from 'lucide-react';

export default function PrivacyTermsModal({ isOpen, onClose, initialTab = 'privacy' }) {
  const [tab, setTab] = React.useState(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 relative my-8">
        
        {/* Header */}
        <div className="bg-navy-900 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-maroon-400" />
            <h3 className="font-extrabold text-lg text-white">
              Legal & Privacy Information
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-navy-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6">
          <button
            onClick={() => setTab('privacy')}
            className={`py-3 px-4 font-bold text-xs transition-colors border-b-2 ${
              tab === 'privacy'
                ? 'border-maroon-700 text-maroon-700 bg-white'
                : 'border-transparent text-navy-600 hover:text-navy-900'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`py-3 px-4 font-bold text-xs transition-colors border-b-2 ${
              tab === 'terms'
                ? 'border-maroon-700 text-maroon-700 bg-white'
                : 'border-transparent text-navy-600 hover:text-navy-900'
            }`}
          >
            Terms of Service & Medical Disclaimer
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs text-navy-800 leading-relaxed">
          {tab === 'privacy' ? (
            <div className="space-y-3">
              <h4 className="font-bold text-navy-900 text-sm">BLOODNET_KERALA Privacy Commitment</h4>
              <p>
                We respect your personal privacy. Registration data submitted on BLOODNET_KERALA is stored in local browser state (`localStorage`) for demonstration and prototype purposes.
              </p>
              <h5 className="font-bold text-navy-900">1. Data Collection & Protection</h5>
              <p>
                Public search views mask phone numbers (`+91 9847XXXXXX`) to prevent unauthorized scraping or harassment of voluntary donors.
              </p>
              <h5 className="font-bold text-navy-900">2. No Third-Party Commercial Sale</h5>
              <p>
                Donor contact information is never sold to commercial telemarketers or third-party advertising companies.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="font-bold text-navy-900 text-sm">Terms of Service & Clinical Disclaimer</h4>
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 font-bold flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-700 flex-shrink-0 mt-0.5" />
                <p>
                  BLOODNET_KERALA is an informational community directory and demo software interface. It is NOT a substitute for professional medical triage, blood bank testing, or hospital transfusion protocol.
                </p>
              </div>
              <h5 className="font-bold text-navy-900">1. Transfusion Compatibility Testing</h5>
              <p>
                Compatibility charts shown on this platform reflect general red-cell ABO/Rh guidelines. Actual blood transfusion requires mandatory hospital cross-matching, antibody screening, and doctor sign-off.
              </p>
              <h5 className="font-bold text-navy-900">2. Emergency Contact Guidance</h5>
              <p>
                In acute life-threatening medical emergencies, always dial 108 / 104 or contact authorized hospital blood banks directly.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-navy-900 text-white font-bold text-xs rounded-xl"
          >
            I Understand & Close
          </button>
        </div>

      </div>
    </div>
  );
}
