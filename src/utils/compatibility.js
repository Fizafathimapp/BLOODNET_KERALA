import { BLOOD_COMPATIBILITY } from '../data/bloodGroups';

/**
 * Returns compatible donor blood groups for a given receiver blood group.
 * @param {string} receiverBloodGroup - e.g. "A+", "O-"
 * @returns {Array<string>} Array of compatible blood groups e.g. ["A+", "A-", "O+", "O-"]
 */
export function getCompatibleDonors(receiverBloodGroup) {
  if (!receiverBloodGroup || !BLOOD_COMPATIBILITY[receiverBloodGroup]) {
    return [];
  }
  return BLOOD_COMPATIBILITY[receiverBloodGroup].canReceiveFrom;
}

/**
 * Returns groups that a donor with donorBloodGroup can donate to.
 * @param {string} donorBloodGroup
 * @returns {Array<string>}
 */
export function getCompatibleRecipients(donorBloodGroup) {
  if (!donorBloodGroup || !BLOOD_COMPATIBILITY[donorBloodGroup]) {
    return [];
  }
  return BLOOD_COMPATIBILITY[donorBloodGroup].canDonateTo;
}
