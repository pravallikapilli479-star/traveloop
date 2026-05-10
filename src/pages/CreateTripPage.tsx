import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Slider from '@mui/material/Slider';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { useTrips } from '../contexts/TripContext';
import type { Trip } from '../data/sampleData';
import { formatINR } from '../utils/currency';

const steps = ['Trip Details', 'Destinations', 'Budget & Travelers', 'Review'];

const popularDestinations = [
  { name: 'Tokyo', emoji: '🗼' },
  { name: 'Paris', emoji: '🗼' },
  { name: 'Bali', emoji: '🌴' },
  { name: 'New York', emoji: '🗽' },
  { name: 'Barcelona', emoji: '🏛️' },
  { name: 'Bangkok', emoji: '🛕' },
  { name: 'Rome', emoji: '🏛️' },
  { name: 'Sydney', emoji: '🦘' },
  { name: 'Dubai', emoji: '🏙️' },
  { name: 'London', emoji: '🎡' },
];

const tripTypes = [
  { label: 'Adventure', emoji: '🧗' },
  { label: 'Beach', emoji: '🏖️' },
  { label: 'Cultural', emoji: '🏛️' },
  { label: 'City Break', emoji: '🏙️' },
  { label: 'Road Trip', emoji: '🚗' },
  { label: 'Wildlife', emoji: '🦁' },
];

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    title: '',
    tripType: '',
    startDate: '',
    endDate: '',
    destinations: [] as string[],
    cityInput: '',
    travelers: 2,
    budget: 50000,
    notes: '',
  });

  const addDestination = (city: string) => {
    if (city && !form.destinations.includes(city)) {
      setForm({ ...form, destinations: [...form.destinations, city], cityInput: '' });
    }
  };

  const removeDestination = (city: string) => {
    setForm({ ...form, destinations: form.destinations.filter((d) => d !== city) });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const newTrip: Trip = {
        id: `trip-${Date.now()}`,
        title: form.title || 'My Adventure',
        destinations: form.destinations,
        startDate: form.startDate,
        endDate: form.endDate,
        status: 'planning',
        budget: form.budget,
        spent: 0,
        travelers: form.travelers,
        notes: form.notes,
        itinerary: [],
      };
      addTrip(newTrip);
      navigate('/my-trips');
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const canProceed = () => {
    // Step 0 (Trip Details): require title and dates
    if (activeStep === 0) {
      const hasRequiredFields = form.title.length > 0 && form.startDate && form.endDate;
      return hasRequiredFields;
    }
    // Step 1 (Destinations): require at least one destination
    if (activeStep === 1) return form.destinations.length > 0;
    // Steps 2 & 3: always allow proceeding
    return true;
  };

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" fontWeight={700} mb={0.5}>Plan a New Trip</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Tell us about your dream adventure and we'll help you build the perfect itinerary.
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card>
          <CardContent sx={{ p: 4 }}>
            {/* Step 0: Trip Details */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" fontWeight={600} mb={3}>Basic Trip Info</Typography>
                <Grid container spacing={3}>
                  <Grid size={12}>
                    <TextField
                      label="Trip Title"
                      fullWidth
                      placeholder="e.g. Japan Cherry Blossom Adventure"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Start Date"
                      type="date"
                      fullWidth
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="End Date"
                      type="date"
                      fullWidth
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body2" fontWeight={600} mb={1}>Trip Type</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {tripTypes.map((type) => (
                        <Chip
                          key={type.label}
                          label={`${type.emoji} ${type.label}`}
                          onClick={() => setForm({ ...form, tripType: type.label })}
                          variant={form.tripType === type.label ? 'filled' : 'outlined'}
                          color={form.tripType === type.label ? 'primary' : 'default'}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      label="Notes (optional)"
                      multiline
                      rows={2}
                      fullWidth
                      placeholder="Any special requirements or ideas..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Step 1: Destinations */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" fontWeight={600} mb={1}>Add Destinations</Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Add the cities you plan to visit. You can reorder them later.
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    label="Add a city"
                    size="small"
                    fullWidth
                    value={form.cityInput}
                    onChange={(e) => setForm({ ...form, cityInput: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && addDestination(form.cityInput)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start"><LocationOnIcon fontSize="small" /></InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => addDestination(form.cityInput)}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    <AddIcon />
                  </Button>
                </Box>

                {form.destinations.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {form.destinations.map((city) => (
                      <Chip
                        key={city}
                        label={city}
                        onDelete={() => removeDestination(city)}
                        deleteIcon={<DeleteOutlineIcon />}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}

                <Typography variant="body2" fontWeight={600} mb={1.5}>Popular Destinations</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {popularDestinations.map((dest) => (
                    <Chip
                      key={dest.name}
                      label={`${dest.emoji} ${dest.name}`}
                      onClick={() => addDestination(dest.name)}
                      variant="outlined"
                      disabled={form.destinations.includes(dest.name)}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Step 2: Budget & Travelers */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" fontWeight={600} mb={3}>Budget & Travelers</Typography>
                <Grid container spacing={4}>
                  <Grid size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PeopleIcon color="primary" />
                        <Typography variant="body1" fontWeight={600}>Number of Travelers</Typography>
                      </Box>
                      <Typography variant="h5" fontWeight={700} color="primary">{form.travelers}</Typography>
                    </Box>
                    <Slider
                      value={form.travelers}
                      min={1}
                      max={12}
                      step={1}
                      marks
                      onChange={(_, v) => setForm({ ...form, travelers: v as number })}
                      valueLabelDisplay="auto"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">1 traveler</Typography>
                      <Typography variant="caption" color="text.secondary">12 travelers</Typography>
                    </Box>
                  </Grid>

                  <Grid size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CurrencyRupeeIcon color="primary" />
                        <Typography variant="body1" fontWeight={600}>Total Budget (INR)</Typography>
                      </Box>
                      <Typography variant="h5" fontWeight={700} color="primary">
                        {formatINR(form.budget)}
                      </Typography>
                    </Box>
                    <Slider
                      value={form.budget}
                      min={10000}
                      max={2000000}
                      step={5000}
                      onChange={(_, v) => setForm({ ...form, budget: v as number })}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(v) => formatINR(v as number)}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">{formatINR(10000)}</Typography>
                      <Typography variant="caption" color="text.secondary">{formatINR(2000000)}</Typography>
                    </Box>
                  </Grid>

                  <Grid size={12}>
                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: 'rgba(0,137,123,0.08)', border: '1px solid', borderColor: 'primary.light' }}>
                      <Typography variant="body2" fontWeight={600} color="primary" mb={0.5}>Budget Breakdown Estimate</Typography>
                      <Grid container spacing={1}>
                        {[
                          { label: 'Flights', pct: 35 },
                          { label: 'Accommodation', pct: 30 },
                          { label: 'Food & Dining', pct: 20 },
                          { label: 'Activities', pct: 15 },
                        ].map((item) => (
                          <Grid size={6} key={item.label}>
                            <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {formatINR(Math.round(form.budget * item.pct / 100))}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Step 3: Review */}
            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" fontWeight={600} mb={3}>Review Your Trip</Typography>
                <Alert severity="success" sx={{ mb: 3 }} icon={<CheckCircleOutlineIcon />}>
                  Everything looks great! Your trip is ready to be created.
                </Alert>

                <Grid container spacing={2}>
                  {[
                    { label: 'Trip Title', value: form.title || 'My Adventure' },
                    { label: 'Trip Type', value: form.tripType || 'General' },
                    { label: 'Dates', value: form.startDate && form.endDate ? `${form.startDate} → ${form.endDate}` : 'Not set' },
                    { label: 'Travelers', value: `${form.travelers} ${form.travelers === 1 ? 'person' : 'people'}` },
                    { label: 'Total Budget', value: formatINR(form.budget) },
                    { label: 'Per Person', value: formatINR(Math.round(form.budget / form.travelers)) },
                  ].map((item) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={item.label}>
                      <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                        <Typography variant="body1" fontWeight={600}>{item.value}</Typography>
                      </Box>
                    </Grid>
                  ))}

                  <Grid size={12}>
                    <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary">Destinations</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                        {form.destinations.length > 0
                          ? form.destinations.map((d) => (
                              <Chip key={d} label={d} size="small" color="primary" variant="outlined" />
                            ))
                          : <Typography variant="body2" color="text.secondary">None added</Typography>
                        }
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => activeStep === 0 ? navigate('/dashboard') : setActiveStep(activeStep - 1)}
          >
            {activeStep === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!canProceed()}
            endIcon={activeStep === steps.length - 1 ? <FlightTakeoffIcon /> : undefined}
          >
            {activeStep === steps.length - 1 ? 'Create Trip!' : 'Next Step'}
          </Button>
        </Box>
      </Box>
    </AppLayout>
  );
}
