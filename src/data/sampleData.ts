export interface Activity {
  id: string;
  name: string;
  category: 'sightseeing' | 'food' | 'transport' | 'accommodation' | 'adventure' | 'culture';
  time: string;
  duration: string;
  cost: number;
  notes?: string;
  location?: string;
}

export interface ItineraryDay {
  id: string;
  date: string;
  city: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  title: string;
  coverImage?: string;
  destinations: string[];
  startDate: string;
  endDate: string;
  status: 'planning' | 'upcoming' | 'ongoing' | 'completed';
  budget: number;
  spent: number;
  itinerary: ItineraryDay[];
  travelers: number;
  notes?: string;
  isPublic?: boolean;
}

export const sampleTrips: Trip[] = [
  {
    id: 'trip-1',
    title: 'Japan Cherry Blossom Adventure',
    destinations: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'],
    startDate: '2025-03-25',
    endDate: '2025-04-08',
    status: 'upcoming',
    budget: 375000,
    spent: 100000,
    travelers: 2,
    isPublic: true,
    notes: 'Cherry blossom season! Book accommodations early.',
    itinerary: [
      {
        id: 'day-1',
        date: '2025-03-25',
        city: 'Tokyo',
        activities: [
          { id: 'a1', name: 'Arrive at Narita Airport', category: 'transport', time: '09:00', duration: '2h', cost: 0, location: 'Narita Airport' },
          { id: 'a2', name: 'Check-in at Shinjuku Hotel', category: 'accommodation', time: '14:00', duration: '1h', cost: 15000, location: 'Shinjuku' },
          { id: 'a3', name: 'Explore Shibuya Crossing', category: 'sightseeing', time: '17:00', duration: '2h', cost: 0, location: 'Shibuya' },
          { id: 'a4', name: 'Dinner at Ramen Nagi', category: 'food', time: '19:30', duration: '1.5h', cost: 2000, location: 'Shinjuku' },
        ],
      },
      {
        id: 'day-2',
        date: '2025-03-26',
        city: 'Tokyo',
        activities: [
          { id: 'a5', name: 'Visit Senso-ji Temple', category: 'culture', time: '08:00', duration: '2h', cost: 0, location: 'Asakusa' },
          { id: 'a6', name: 'TeamLab Borderless Museum', category: 'culture', time: '11:00', duration: '3h', cost: 2700, location: 'Odaiba' },
          { id: 'a7', name: 'Sushi Lunch at Tsukiji', category: 'food', time: '15:00', duration: '1h', cost: 3500, location: 'Tsukiji Market' },
        ],
      },
      {
        id: 'day-3',
        date: '2025-03-27',
        city: 'Kyoto',
        activities: [
          { id: 'a8', name: 'Shinkansen to Kyoto', category: 'transport', time: '08:30', duration: '2.5h', cost: 6000, location: 'Tokyo Station' },
          { id: 'a9', name: 'Fushimi Inari Shrine', category: 'sightseeing', time: '13:00', duration: '3h', cost: 0, location: 'Fushimi Ward' },
          { id: 'a10', name: 'Traditional Tea Ceremony', category: 'culture', time: '17:00', duration: '1.5h', cost: 3000, location: 'Gion' },
        ],
      },
    ],
  },
  {
    id: 'trip-2',
    title: 'Mediterranean Coast Road Trip',
    destinations: ['Barcelona', 'Nice', 'Monaco', 'Florence'],
    startDate: '2025-07-10',
    endDate: '2025-07-24',
    status: 'planning',
    budget: 500000,
    spent: 70000,
    travelers: 2,
    isPublic: false,
    notes: 'Rent a car in Barcelona. Book beachfront hotels.',
    itinerary: [
      {
        id: 'day-1',
        date: '2025-07-10',
        city: 'Barcelona',
        activities: [
          { id: 'b1', name: 'Fly into El Prat Airport', category: 'transport', time: '10:00', duration: '1h', cost: 0, location: 'El Prat Airport' },
          { id: 'b2', name: 'La Sagrada Familia', category: 'sightseeing', time: '14:00', duration: '2.5h', cost: 3000, location: 'Eixample' },
          { id: 'b3', name: 'Tapas on Las Ramblas', category: 'food', time: '20:00', duration: '2h', cost: 4500, location: 'Las Ramblas' },
        ],
      },
      {
        id: 'day-2',
        date: '2025-07-11',
        city: 'Barcelona',
        activities: [
          { id: 'b4', name: 'Park Güell', category: 'sightseeing', time: '09:00', duration: '2h', cost: 800, location: 'Gràcia' },
          { id: 'b5', name: 'Barceloneta Beach', category: 'adventure', time: '12:00', duration: '4h', cost: 0, location: 'Barceloneta' },
        ],
      },
    ],
  },
  {
    id: 'trip-3',
    title: 'New York City Weekend Getaway',
    destinations: ['New York City'],
    startDate: '2024-11-15',
    endDate: '2024-11-17',
    status: 'completed',
    budget: 125000,
    spent: 115000,
    travelers: 1,
    isPublic: true,
    itinerary: [
      {
        id: 'day-1',
        date: '2024-11-15',
        city: 'New York City',
        activities: [
          { id: 'c1', name: 'Central Park Walk', category: 'sightseeing', time: '09:00', duration: '2h', cost: 0, location: 'Central Park' },
          { id: 'c2', name: 'MoMA Museum', category: 'culture', time: '12:00', duration: '3h', cost: 2000, location: 'Midtown' },
          { id: 'c3', name: 'Broadway Show - Hamilton', category: 'culture', time: '19:00', duration: '3h', cost: 15000, location: 'Richard Rodgers Theatre' },
        ],
      },
    ],
  },
];

export const categoryColors: Record<string, string> = {
  sightseeing: '#0288d1',
  food: '#f57c00',
  transport: '#7986cb',
  accommodation: '#26a69a',
  adventure: '#e53935',
  culture: '#8d6e63',
};

export const categoryLabels: Record<string, string> = {
  sightseeing: 'Sightseeing',
  food: 'Food & Dining',
  transport: 'Transport',
  accommodation: 'Accommodation',
  adventure: 'Adventure',
  culture: 'Culture & Arts',
};
