import React, { useState } from 'react';
import { UserPlus, CheckCircle2, ShieldAlert, Heart, Calendar, MapPin, Phone, Mail, User } from 'lucide-react';
import { KERALA_DISTRICTS } from '../data/districts';
import { BLOOD_GROUPS } from '../data/bloodGroups';
import { saveNewDonor } from '../utils/storage';

export default function DonorRegistration({ onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '',
    email: '',
    district: 'Ernakulam',
    city: '',
    address: '',
    lastDonationDate: '',
    availability: 'Available',
    confirmed: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredDonor, setRegisteredDonor] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.age || Number(formData.age) < 18 || Number(formData.age) > 65) {
      errs.age = 'Age must be between 18 and 65 for voluntary donation';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid 10-digit phone number is required';
    }
    if (!formData.city.trim()) errs.city = 'City/Town is required';
    if (!formData.confirmed) errs.confirmed = 'You must confirm information accuracy';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const saved = saveNewDonor(formData);
      setRegisteredDonor(saved);
      setIsSubmitting(false);
      setShowSuccessModal(true);
      if (onRegistrationSuccess) {
        onRegistrationSuccess(saved);
      }
    } catch (err) {
      setIsSubmitting(false);
      alert('Could not save registration. Please try again.');
    }
  };

  return (
    <section id="register" className="py-16 bg-slate-50 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-100 text-maroon-800 text-xs font-bold uppercase tracking-wider">
            <UserPlus className="w-4 h-4 text-maroon-700" />
            <span>Voluntary Donor Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Become a Blood Donor
          </h2>
          <p className="text-base sm:text-lg text-navy-700">
            Be a hero. Register today and help save lives across Kerala.
          </p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Details Section */}
            <div>
              <h3 className="text-lg font-bold text-navy-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-maroon-700" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Full Name */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    Full Name <span className="text-maroon-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Afsana K."
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-maroon-600'
                    } focus:ring-2 focus:ring-maroon-100 text-sm font-semibold text-navy-900 transition-all`}
                  />
                  {errors.fullName && <p className="text-xs text-red-600 font-semibold">{errors.fullName}</p>}
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    Age (Years) <span className="text-maroon-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="18"
                    max="65"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="18 - 65"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.age ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-maroon-600'
                    } focus:ring-2 focus:ring-maroon-100 text-sm font-semibold text-navy-900 transition-all`}
                  />
                  {errors.age && <p className="text-xs text-red-600 font-semibold">{errors.age}</p>}
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-100 text-sm font-semibold text-navy-900 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Blood Group Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    Blood Group <span className="text-maroon-600">*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-maroon-200 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-100 text-sm font-bold text-maroon-800 bg-white"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    Donation Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-100 text-sm font-semibold text-navy-900 bg-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Available on weekends">Available on weekends</option>
                    <option value="Available for emergencies">Available for emergencies</option>
                    <option value="Currently unavailable">Currently unavailable</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Contact & Location Section */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-navy-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-maroon-700" />
                Contact & District Location
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    Phone Number <span className="text-maroon-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-maroon-600'
                      } focus:ring-2 focus:ring-maroon-100 text-sm font-semibold text-navy-900 transition-all`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 font-semibold">{errors.phone}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="donor@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-100 text-sm font-semibold text-navy-900 transition-all"
                    />
                  </div>
                </div>

                {/* District Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    Kerala District <span className="text-maroon-600">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-100 text-sm font-semibold text-navy-900 bg-white"
                  >
                    {KERALA_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City/Town */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    City / Town / Panchayat <span className="text-maroon-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Kalamassery / Aluva"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.city ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-maroon-600'
                    } focus:ring-2 focus:ring-maroon-100 text-sm font-semibold text-navy-900 transition-all`}
                  />
                  {errors.city && <p className="text-xs text-red-600 font-semibold">{errors.city}</p>}
                </div>

                {/* Full Address */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase">
                    Residential Address
                  </label>
                  <textarea
                    name="address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House name, street address..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-100 text-sm font-medium text-navy-900 transition-all"
                  ></textarea>
                </div>

                {/* Last Donation Date */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-navy-800 uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-maroon-700" />
                    Last Donation Date (Leave blank if first time)
                  </label>
                  <input
                    type="date"
                    name="lastDonationDate"
                    value={formData.lastDonationDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon-600 text-sm font-medium text-navy-900 bg-white"
                  />
                </div>

              </div>
            </div>

            {/* Disclaimer & Confirmation Checkbox */}
            <div className="pt-4 space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Medical Eligibility Disclaimer:</strong> Submitting this registration form stores your profile in the voluntary network directory. Registration does <em>not</em> automatically establish medical eligibility to donate blood. Final eligibility will be evaluated by blood bank medical staff based on health screening, hemoglobin tests, and clinical guidelines.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="confirmed"
                  name="confirmed"
                  checked={formData.confirmed}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-maroon-700 focus:ring-maroon-600 mt-0.5 cursor-pointer"
                />
                <label htmlFor="confirmed" className="text-xs sm:text-sm font-semibold text-navy-800 cursor-pointer">
                  I confirm that the information provided above is accurate and I consent to being listed in the BLOODNET_KERALA demo voluntary donor directory.
                </label>
              </div>
              {errors.confirmed && <p className="text-xs text-red-600 font-bold">{errors.confirmed}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Heart className="w-5 h-5 fill-white text-maroon-700" />
                <span>{isSubmitting ? 'Saving Registration...' : 'Register as Blood Donor'}</span>
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Success Modal */}
      {showSuccessModal && registeredDonor && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl border border-maroon-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-navy-900">
                Registration Successful!
              </h3>
              <p className="text-sm text-navy-700">
                Thank you for registering as a blood donor with BLOODNET_KERALA. Your details have been saved to the demo directory.
              </p>
            </div>

            {/* Registered Details Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Donor Name:</span>
                <span className="font-bold text-navy-900">{registeredDonor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Blood Group:</span>
                <span className="font-extrabold text-maroon-700">{registeredDonor.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">District:</span>
                <span className="font-semibold text-navy-800">{registeredDonor.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ID Reference:</span>
                <span className="font-mono text-navy-600">{registeredDonor.id}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                setFormData({
                  fullName: '',
                  age: '',
                  gender: 'Male',
                  bloodGroup: 'O+',
                  phone: '',
                  email: '',
                  district: 'Ernakulam',
                  city: '',
                  address: '',
                  lastDonationDate: '',
                  availability: 'Available',
                  confirmed: false
                });
              }}
              className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
