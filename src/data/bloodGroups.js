export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const BLOOD_COMPATIBILITY = {
  "A+": {
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
    description: "A+ can generally donate red cells to A+ and AB+. Can receive from A+, A-, O+, and O-.",
    rarity: "Common (~31% of population)"
  },
  "A-": {
    canDonateTo: ["A-", "A+", "AB-", "AB+"],
    canReceiveFrom: ["A-", "O-"],
    description: "A- can generally donate red cells to A-, A+, AB-, and AB+. Universal donor for Rh-negative A group.",
    rarity: "Rare (~6% of population)"
  },
  "B+": {
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
    description: "B+ can generally donate red cells to B+ and AB+. Very common in Indian subcontinent.",
    rarity: "Very Common in Kerala (~32% of population)"
  },
  "B-": {
    canDonateTo: ["B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["B-", "O-"],
    description: "B- can generally donate red cells to B-, B+, AB-, and AB+. High demand for emergencies.",
    rarity: "Rare (~2% of population)"
  },
  "AB+": {
    canDonateTo: ["AB+"],
    canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    description: "AB+ is the Universal Recipient for red blood cells. Can receive red blood cells from any blood group.",
    rarity: "Uncommon (~5% of population)"
  },
  "AB-": {
    canDonateTo: ["AB-", "AB+"],
    canReceiveFrom: ["AB-", "A-", "B-", "O-"],
    description: "AB- can generally donate red cells to AB- and AB+. Rarest ABO/Rh blood group.",
    rarity: "Extremely Rare (~1% of population)"
  },
  "O+": {
    canDonateTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O+", "O-"],
    description: "O+ can generally donate red cells to O+, A+, B+, and AB+. Most requested blood group.",
    rarity: "Most Common (~38% of population)"
  },
  "O-": {
    canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    canReceiveFrom: ["O-"],
    description: "O- is the Universal Donor for red-cell transfusion. Crucial for emergency trauma response.",
    rarity: "Rare (~3% of population)"
  }
};
