// Extract Wing Data from store.ts
export interface WingData {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  order: number;
  isActive: boolean;
}

export const wingsData: WingData[] = [
  {
    id: 'tatva',
    name: 'Tatva',
    description: 'Technical wing for innovation and development at IIT Patna',
    logoUrl: '/images/logos/tatva-logo.png',
    order: 1,
    isActive: true
  },
  {
    id: 'disha',
    name: 'Disha',
    description: 'Training and placement wing for career development',
    logoUrl: '/images/logos/disha-logo.png',
    order: 2,
    isActive: true
  },
  {
    id: 'arthniti',
    name: 'Arthniti',
    description: 'Finance and entrepreneurship wing for business development',
    logoUrl: '/images/logos/arthniti-logo.png',
    order: 3,
    isActive: true
  },
  {
    id: 'management',
    name: 'Management',
    description: 'Management and operations wing for organizational activities',
    logoUrl: '/images/logos/management-logo.png',
    order: 4,
    isActive: true
  }
];
