import React, { useState, useEffect } from 'react';
import { X, UserCheck, ShieldCheck, Lock, Phone } from 'lucide-react';
import { saveUserSession } from '../utils/storage';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      alert('Please enter 4-digit OTP (e.g. 1234)');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        mobile,
        name: 'Logged In Donor',
        loggedInAt: new Date().toISOString()
      };
      saveUserSession(user);
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-maroon-700 to-maroon-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Donor Portal Login</h3>
              <p className="text-xs text-red-100">Access your registered donor profile</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-bold text-navy-900 uppercase">
                  Registered Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-maroon-600 text-sm font-semibold text-navy-900"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-gray-200 text-[11px] text-gray-600">
                Demo OTP verification simulated for registered voluntary blood donors.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-bold text-navy-900 uppercase">
                  Enter OTP Sent to +91 {mobile}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    maxLength="6"
                    placeholder="Enter demo OTP e.g. 1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-maroon-600 text-sm font-bold tracking-widest text-navy-900 text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
