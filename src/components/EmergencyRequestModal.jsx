import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, ShieldAlert, CheckCircle2, Phone, Building, User, Droplet, MapPin } from 'lucide-react';
import { KERALA_DISTRICTS } from '../data/districts';
import { BLOOD_GROUPS } from '../data/bloodGroups';
import { saveEmergencyRequest } from '../utils/storage';

export default function EmergencyRequestModal({ isOpen, onClose, onRequestSubmitted }) {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+',
    district: 'Ernakulam',
    hospital: '',
    requiredUnits: '2',
    contactNumber: '',
    urgency: 'Immediate (Within 6 hours)'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.patientName.trim()) errs.patientName = 'Patient / Requester Name is required';
    if (!formData.hospital.trim()) errs.hospital = 'Hospital / Medical Center is required';
    if (!formData.contactNumber.trim() || formData.contactNumber.length < 10) {
      errs.contactNumber = 'Valid 10-digit emergency contact number required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const saved = saveEmergencyRequest(formData);
      setIsSubmitting(false);
      setSubmittedRequest(saved);
      if (onRequestSubmitted) {
        onRequestSubmitted(saved);
      }
    } catch (err) {
      setIsSubmitting(false);
      alert('Could not record demo request.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-red-200 relative my-8">
        
        {/* Modal Top Warning Header */}
        <div className="bg-maroon-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-maroon-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">
                Emergency Blood Request
              </h2>
              <p className="text-xs text-red-100 font-medium">
                Submit urgent blood requirements for Kerala medical facilities
              </p>
            </div>
          </div>
        </div>

        {/* Modal Form or Success State */}
        <div className="p-6 space-y-5">
          
          {/* Demo Disclaimer Box (Mandatory requirement 12) */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
              Demo Platform Disclaimer
            </div>
            <p className="leading-relaxed">
              <strong>Demo request only.</strong> Connect with an authorized hospital or government blood bank for real emergency assistance. Submitting this form creates a simulated emergency ticket.
            </p>
          </div>

          {!submittedRequest ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Patient Name */}
              <div className="space-y-1">
                <label className="block font-bold text-navy-900 uppercase">
                  Patient / Requester Name <span className="text-maroon-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${
                      errors.patientName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-maroon-600'
                    } text-sm font-semibold text-navy-900`}
                  />
                </div>
                {errors.patientName && <p className="text-red-600 font-bold">{errors.patientName}</p>}
              </div>

              {/* Grid: Blood group & Units */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase">
                    Required Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-maroon-200 text-sm font-extrabold text-maroon-800 bg-white"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase">
                    Required Units
                  </label>
                  <select
                    name="requiredUnits"
                    value={formData.requiredUnits}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-navy-900 bg-white"
                  >
                    <option value="1">1 Unit</option>
                    <option value="2">2 Units</option>
                    <option value="3">3 Units</option>
                    <option value="4+">4+ Units (Critical)</option>
                  </select>
                </div>
              </div>

              {/* Grid: District & Urgency */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase">
                    District
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-navy-900 bg-white"
                  >
                    {KERALA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase">
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-navy-900 bg-white"
                  >
                    <option value="Immediate (Within 6 hours)">Immediate (&lt; 6 hrs)</option>
                    <option value="Within 24 hours">Within 24 hours</option>
                    <option value="Scheduled Surgery (2-3 days)">Scheduled Surgery</option>
                  </select>
                </div>
              </div>

              {/* Hospital Name */}
              <div className="space-y-1">
                <label className="block font-bold text-navy-900 uppercase">
                  Hospital & Location <span className="text-maroon-600">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="e.g. Govt Medical College, Kalamassery"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${
                      errors.hospital ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-maroon-600'
                    } text-sm font-semibold text-navy-900`}
                  />
                </div>
                {errors.hospital && <p className="text-red-600 font-bold">{errors.hospital}</p>}
              </div>

              {/* Contact Number */}
              <div className="space-y-1">
                <label className="block font-bold text-navy-900 uppercase">
                  Bystander Contact Number <span className="text-maroon-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${
                      errors.contactNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-maroon-600'
                    } text-sm font-semibold text-navy-900`}
                  />
                </div>
                {errors.contactNumber && <p className="text-red-600 font-bold">{errors.contactNumber}</p>}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all"
                >
                  {isSubmitting ? 'Logging Request...' : 'Submit Emergency Request (Demo)'}
                </button>
              </div>

            </form>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy-900">
                Demo Emergency Ticket Logged
              </h3>
              <p className="text-xs text-navy-700 leading-relaxed">
                Your emergency request ticket (<strong className="font-mono text-maroon-700">{submittedRequest.id}</strong>) for {submittedRequest.bloodGroup} at {submittedRequest.hospital} has been stored in local demo state.
              </p>
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[11px] text-red-900 font-bold">
                For actual blood emergency: Dial 108 / 104 or contact District Hospital Blood Bank.
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-navy-900 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Close Window
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
