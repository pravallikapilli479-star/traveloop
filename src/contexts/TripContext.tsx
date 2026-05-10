import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { sampleTrips, type Trip } from '../data/sampleData';

interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(sampleTrips);

  const addTrip = (trip: Trip) => {
    setTrips((prev) => [trip, ...prev]);
  };

  const updateTrip = (tripId: string, updates: Partial<Trip>) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, ...updates } : t))
    );
  };

  return (
    <TripContext.Provider value={{ trips, addTrip, updateTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within TripProvider');
  }
  return context;
}
