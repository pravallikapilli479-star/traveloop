import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { TripProvider } from './contexts/TripContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MyTripsPage from './pages/MyTripsPage';
import CreateTripPage from './pages/CreateTripPage';
import ItineraryBuilderPage from './pages/ItineraryBuilderPage';
import BudgetBreakdownPage from './pages/BudgetBreakdownPage';
import SharedItineraryPage from './pages/SharedItineraryPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TripProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/create-trip" element={<CreateTripPage />} />
          <Route path="/itinerary/:tripId" element={<ItineraryBuilderPage />} />
          <Route path="/budget/:tripId" element={<BudgetBreakdownPage />} />
          <Route path="/shared/:tripId" element={<SharedItineraryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </TripProvider>
    </ThemeProvider>
  );
}

export default App;
