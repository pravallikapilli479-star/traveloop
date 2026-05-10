import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LuggageIcon from '@mui/icons-material/Luggage';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ExploreIcon from '@mui/icons-material/Explore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import TripCard from '../components/TripCard';
import { useTrips } from '../contexts/TripContext';
import { formatINR } from '../utils/currency';

const stats = [
  { label: 'Total Trips', value: '8', icon: <LuggageIcon />, color: '#00897b', bg: '#e0f2f1' },
  { label: 'Countries Visited', value: '12', icon: <ExploreIcon />, color: '#0288d1', bg: '#e1f5fe' },
  { label: 'Days Traveled', value: '94', icon: <CalendarMonthIcon />, color: '#f57c00', bg: '#fff3e0' },
  { label: 'Total Spent', value: '\u20B915.3L', icon: <CurrencyRupeeIcon />, color: '#7b1fa2', bg: '#f3e5f5' },
];

const upcomingActivities = [
  { name: 'Cherry Blossom at Ueno Park', city: 'Tokyo', date: 'Mar 28', type: 'Sightseeing' },
  { name: 'Fushimi Inari Shrine Hike', city: 'Kyoto', date: 'Mar 31', type: 'Adventure' },
  { name: 'Nishiki Market Food Tour', city: 'Kyoto', date: 'Apr 1', type: 'Food & Dining' },
  { name: 'Osaka Castle Visit', city: 'Osaka', date: 'Apr 4', type: 'Culture' },
];

const trendingDestinations = [
  { city: 'Bali', country: 'Indonesia', emoji: '🌴', tag: 'Trending' },
  { city: 'Santorini', country: 'Greece', emoji: '🏛️', tag: 'Popular' },
  { city: 'Patagonia', country: 'Argentina', emoji: '🏔️', tag: 'Adventure' },
  { city: 'Marrakech', country: 'Morocco', emoji: '🕌', tag: 'Cultural' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { trips } = useTrips();
  const upcomingTrips = trips.filter((t) => t.status === 'upcoming' || t.status === 'planning');

  return (
    <AppLayout>
      {/* Hero welcome */}
      <Box
        sx={{
          borderRadius: 4,
          background: 'linear-gradient(135deg, #004d40 0%, #00838f 100%)',
          p: { xs: 3, sm: 4 },
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', right: -20, top: -20, opacity: 0.08 }}>
          <FlightTakeoffIcon sx={{ fontSize: 200, color: 'white' }} />
        </Box>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 0.5 }}>
          Good morning, Jamie! ✈️
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
          You have <strong>2 upcoming trips</strong> and <strong>1 in planning</strong>. Keep exploring!
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create-trip')}
            sx={{ bgcolor: 'white', color: 'primary.dark', '&:hover': { bgcolor: 'grey.100' } }}
          >
            Plan New Trip
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/my-trips')}
            sx={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            View My Trips
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
            <Card>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      bgcolor: stat.bg,
                      borderRadius: 2,
                      p: 1,
                      color: stat.color,
                      display: 'flex',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700} lineHeight={1}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Upcoming trips */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>Upcoming Trips</Typography>
            <Button size="small" onClick={() => navigate('/my-trips')}>View all</Button>
          </Box>
          <Grid container spacing={2}>
            {upcomingTrips.map((trip, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={trip.id}>
                <TripCard trip={trip} index={i} />
              </Grid>
            ))}
          </Grid>

          {/* Upcoming activities */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Next Activities</Typography>
            <Card>
              <List disablePadding>
                {upcomingActivities.map((act, i) => (
                  <Box key={act.name}>
                    {i > 0 && <Divider />}
                    <ListItem sx={{ py: 1.5 }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: ['info.light', 'warning.light', 'success.light', 'secondary.light'][i % 4],
                            width: 36,
                            height: 36,
                          }}
                        >
                          <AccessTimeIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={act.name}
                        secondary={act.city}
                        slotProps={{
                          primary: { fontSize: '0.875rem', fontWeight: 500 },
                          secondary: { fontSize: '0.75rem' },
                        }}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                        <Typography variant="caption" fontWeight={600} color="primary">
                          {act.date}
                        </Typography>
                        <Chip label={act.type} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />
                      </Box>
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Card>
          </Box>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Budget overview */}
          <Typography variant="h6" fontWeight={700} mb={2}>Budget Overview</Typography>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              {trips.slice(0, 2).map((trip) => {
                const pct = Math.min((trip.spent / trip.budget) * 100, 100);
                return (
                  <Box key={trip.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={500} noWrap sx={{ maxWidth: '55%' }}>
                        {trip.title.split(' ').slice(0, 2).join(' ')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatINR(trip.spent)} / {formatINR(trip.budget)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': { borderRadius: 4 },
                      }}
                    />
                  </Box>
                );
              })}
              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<TrendingUpIcon />}
                onClick={() => navigate('/budget/trip-1')}
                sx={{ mt: 1 }}
              >
                Full Budget View
              </Button>
            </CardContent>
          </Card>

          {/* Trending destinations */}
          <Typography variant="h6" fontWeight={700} mb={2}>Trending Destinations</Typography>
          <Card>
            <List disablePadding>
              {trendingDestinations.map((dest, i) => (
                <Box key={dest.city}>
                  {i > 0 && <Divider />}
                  <ListItem
                    sx={{ py: 1.25, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                    onClick={() => navigate('/create-trip')}
                  >
                    <Typography sx={{ fontSize: '1.5rem', mr: 1.5, lineHeight: 1 }}>{dest.emoji}</Typography>
                    <ListItemText
                      primary={dest.city}
                      secondary={dest.country}
                      slotProps={{ primary: { fontWeight: 600, fontSize: '0.875rem' }, secondary: { fontSize: '0.75rem' } }}
                    />
                    <Chip
                      label={dest.tag}
                      size="small"
                      color={dest.tag === 'Trending' ? 'error' : dest.tag === 'Popular' ? 'warning' : 'info'}
                      sx={{ fontSize: '0.65rem' }}
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
