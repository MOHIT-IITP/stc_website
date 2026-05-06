// Main export file for all extracted data
export { wingsData, type WingData } from './extract-wings';
export { clubsData, type ClubData } from './extract-clubs';
export { membersData, type MemberData } from './extract-members';

// Data summary for verification
export const dataSummary = {
  wings: 4,
  clubs: 18,
  members: 137,
  coreTeam: 4,
  councilMembers: 6,
  total: 169
};

// Wing to clubs mapping for verification
export const wingToClubsMap = {
  tatva: ['webwiser', 'pixelerate', 'appistry', 'synapse', 'code_red', 'analytical_arena', 'hackshield', 'tech_hub', 'mech_x'],
  disha: ['careerCatalyst', 'opportune'],
  arthniti: ['foundersForge', 'freelanthropy'],
  management: ['creative', 'eventManagement', 'pr', 'sessionWebinar', 'sponsor']
};

// Club to member count mapping for verification
export const clubToMemberCountMap = {
  // Tatva Wing
  webwiser: 6,
  pixelerate: 5,
  appistry: 3,
  synapse: 7,
  code_red: 5,
  analytical_arena: 6,
  hackshield: 4,
  tech_hub: 5,
  mech_x: 6,
  
  // Disha Wing
  careerCatalyst: 4,
  opportune: 7,
  
  // Arthniti Wing
  foundersForge: 6,
  freelanthropy: 3,
  
  // Management Wing
  creative: 7,
  eventManagement: 6,
  pr: 6,
  sessionWebinar: 5,
  sponsor: 4
};
