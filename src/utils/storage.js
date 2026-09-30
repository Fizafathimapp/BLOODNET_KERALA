import { INITIAL_DEMO_DONORS } from '../data/mockDonors';

const STORAGE_KEYS = {
  DONORS: 'bloodnet_kerala_donors_v1',
  EMERGENCY_REQUESTS: 'bloodnet_kerala_requests_v1',
  USER_SESSION: 'bloodnet_kerala_user_v1'
};

export function getStoredDonors() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DONORS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(INITIAL_DEMO_DONORS));
      return INITIAL_DEMO_DONORS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed reading donors from localStorage:", err);
    return INITIAL_DEMO_DONORS;
  }
}

export function saveNewDonor(donorData) {
  try {
    const currentDonors = getStoredDonors();
    const newEntry = {
      id: `dn-${Date.now()}`,
      name: donorData.fullName,
      bloodGroup: donorData.bloodGroup,
      district: donorData.district,
      city: donorData.city || donorData.district,
      availability: donorData.availability || 'Available',
      lastVerified: new Date().toISOString().split('T')[0],
      lastDonated: donorData.lastDonationDate || 'First time donor',
      donationsCount: 1,
      badge: 'New Registered Donor',
      gender: donorData.gender || 'Not specified',
      phoneMasked: donorData.phone ? `${donorData.phone.substring(0, 5)}XXXXXX` : '+91 9XXXXXXXXX',
      email: donorData.email,
      address: donorData.address,
      registeredAt: new Date().toISOString()
    };
    
    const updated = [newEntry, ...currentDonors];
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.error("Failed saving new donor to localStorage:", err);
    throw new Error("Could not save registration locally.");
  }
}

export function getStoredRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EMERGENCY_REQUESTS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function saveEmergencyRequest(requestData) {
  try {
    const current = getStoredRequests();
    const newReq = {
      id: `req-${Date.now()}`,
      patientName: requestData.patientName,
      bloodGroup: requestData.bloodGroup,
      district: requestData.district,
      hospital: requestData.hospital,
      requiredUnits: requestData.requiredUnits || 1,
      contactNumber: requestData.contactNumber,
      urgency: requestData.urgency || 'Immediate (Within 6 hrs)',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      isDemo: true
    };
    const updated = [newReq, ...current];
    localStorage.setItem(STORAGE_KEYS.EMERGENCY_REQUESTS, JSON.stringify(updated));
    return newReq;
  } catch (err) {
    console.error("Failed saving emergency request:", err);
    throw err;
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

export function saveUserSession(userData) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(userData));
  } catch (err) {
    console.error(err);
  }
}

export function clearUserSession() {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
  } catch (err) {
    console.error(err);
  }
}
