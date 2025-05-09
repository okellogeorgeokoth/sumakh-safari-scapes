
export type SafariOption = {
  id: string;
  name: string;
  location: string;
  duration: string;
};

// Safari options with Kenyan destinations
export const safariOptions: SafariOption[] = [
  { id: 'masai-mara', name: 'Masai Mara Adventure', location: 'Masai Mara, Kenya', duration: '3-5 days' },
  { id: 'amboseli', name: 'Amboseli & Mt. Kilimanjaro View', location: 'Amboseli, Kenya', duration: '2-4 days' },
  { id: 'samburu', name: 'Samburu National Reserve', location: 'Samburu, Kenya', duration: '3-4 days' },
  { id: 'tsavo', name: 'Tsavo East & West', location: 'Tsavo, Kenya', duration: '4-6 days' },
  { id: 'nakuru', name: 'Lake Nakuru & Flamingos', location: 'Nakuru, Kenya', duration: '2-3 days' },
  { id: 'nairobi', name: 'Nairobi National Park', location: 'Nairobi, Kenya', duration: '1 day' },
  { id: 'meru', name: 'Meru National Park', location: 'Meru, Kenya', duration: '3-4 days' },
  { id: 'lamu', name: 'Lamu Cultural Experience', location: 'Lamu, Kenya', duration: '4-5 days' },
  { id: 'custom', name: 'Custom Safari Package', location: 'Multiple Locations', duration: 'Flexible' }
];
