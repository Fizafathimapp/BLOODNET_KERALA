import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Phone, Mail, CheckCircle2, UserCheck, Copy } from 'lucide-react';

export default function DonorContactModal({ donor, onClose, onShowToast }) {
  const [requestSent, setRequestSent] = useState(false);
  const [bystanderName, setBystanderName] = useState('');
  const [hospitalName, setHospitalName] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && donor) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [donor, onClose]);

  if (!donor) return null;

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!bystanderName.trim() || !hospitalName.trim()) {
      alert('Please provide your name and hospital details.');
      return;
    }
    setRequestSent(true);
    if (onShowToast) {
      onShowToast(`Contact request notification sent to ${donor.name} (Simulated).`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-200 relative">
        
        {/* Header */}
        <div className="bg-navy-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-navy-800"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-maroon-700 text-white font-black text-xl flex items-center justify-center shadow-md">
              {donor.bloodGroup}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{donor.name}</h3>
              <p className="text-xs text-gray-300">{donor.district}, Kerala • {donor.availability}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          <div className="p-3.5 rounded-2xl bg-blush-50 border border-maroon-100 text-xs text-navy-800 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-maroon-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Privacy Protection Notice:</strong> BLOODNET_KERALA masks phone numbers in public search. Requesting contact dispatches a simulated SMS alert to the voluntary donor.
            </p>
          </div>

          {!requestSent ? (
            <form onSubmit={handleSendRequest} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Your Name / Bystander Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh / Anoop"
                  value={bystanderName}
                  onChange={(e) => setBystanderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-maroon-600 text-sm font-semibold text-navy-900"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Hospital / Patient Ward Location:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aster Medcity ICU Ward 3"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-maroon-600 text-sm font-semibold text-navy-900"
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1">
                <span className="text-[11px] text-gray-500 font-semibold block">Donor Masked Phone Reference:</span>
                <span className="text-sm font-mono font-bold text-navy-900">{donor.phoneMasked}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Send SMS Contact Request</span>
              </button>
            </form>
          ) : (
            <div className="text-center space-y-3 py-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-navy-900 text-base">Request Notification Dispatched!</h4>
              <p className="text-xs text-navy-700 leading-relaxed">
                A simulated alert has been sent to {donor.name} for blood group {donor.bloodGroup} at {hospitalName}.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-navy-900 text-white font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
