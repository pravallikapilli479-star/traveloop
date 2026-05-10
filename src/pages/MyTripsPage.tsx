import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import TripCard from '../components/TripCard';
import { useTrips } from '../contexts/TripContext';

const tabFilters = ['All', 'Planning', 'Upcoming', 'Ongoing', 'Completed'];

export default function MyTripsPage() {
  const navigate = useNavigate();
  const { trips } = useTrips();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');

  const statusMap: Record<number, string | null> = {
    0: null,
    1: 'planning',
    2: 'upcoming',
    3: 'ongoing',
    4: 'completed',
  };

  const filtered = trips
    .filter((t) => {
      const statusFilter = statusMap[tab];
      if (statusFilter && t.status !== statusFilter) return false;
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) &&
        !t.destinations.some((d) => d.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'date') return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (sort === 'budget') return b.budget - a.budget;
      if (sort === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <AppLayout>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} mb={0.5}>My Trips</Typography>
          <Typography variant="body2" color="text.secondary">
            {trips.length} trips planned · {trips.filter((t) => t.status === 'upcoming').length} upcoming
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/create-trip')}>
          Plan New Trip
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Search trips or destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
              ),
            },
          }}
          sx={{ flex: 1, minWidth: 220, maxWidth: 340 }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sort}
            label="Sort by"
            onChange={(e) => setSort(e.target.value)}
            startAdornment={<SortIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />}
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="budget">Budget</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        {tabFilters.map((label, i) => {
          const count = i === 0
            ? trips.length
            : trips.filter((t) => t.status === (statusMap[i] ?? '')).length;
          return (
            <Tab
              key={label}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {label}
                  <Chip label={count} size="small" sx={{ height: 18, fontSize: '0.65rem', pointerEvents: 'none' }} />
                </Box>
              }
            />
          );
        })}
      </Tabs>

      {/* Trip grid */}
      {filtered.length > 0 ? (
        <Grid container spacing={3}>
          {filtered.map((trip, i) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={trip.id}>
              <TripCard trip={trip} index={i} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary" mb={2}>No trips found</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/create-trip')}>
            Plan Your First Trip
          </Button>
        </Box>
      )}
    </AppLayout>
  );
}
