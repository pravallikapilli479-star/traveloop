import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { sampleTrips, categoryColors, categoryLabels } from '../data/sampleData';
import { formatINR } from '../utils/currency';

export default function SharedItineraryPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const trip = sampleTrips.find((t) => t.id === tripId) ?? sampleTrips[0];
  const [snackOpen, setSnackOpen] = useState(false);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const shortDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const totalCost = trip.itinerary
    .flatMap((d) => d.activities)
    .reduce((s, a) => s + a.cost, 0);

  const dayCount = Math.ceil(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setSnackOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Minimal public navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}
      >
        <Toolbar>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Box sx={{ bgcolor: 'primary.main', borderRadius: 1.5, p: 0.75 }}>
              <FlightTakeoffIcon sx={{ color: 'white', fontSize: 18 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.dark' }}>Traveloop</Typography>
          </Box>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" size="small" onClick={() => navigate('/')}>
            Plan Your Trip
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #004d40 0%, #00838f 100%)',
          py: { xs: 5, sm: 8 },
          px: { xs: 2, sm: 4 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.05, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FlightTakeoffIcon sx={{ fontSize: 400, color: 'white' }} />
        </Box>
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 700, mx: 'auto' }}>
          <Chip label="Public Itinerary" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', mb: 2, fontWeight: 600 }} />
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 2 }}>
            {trip.title}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            {trip.destinations.map((d) => (
              <Chip
                key={d}
                label={d}
                icon={<LocationOnIcon sx={{ color: 'rgba(255,255,255,0.9) !important', fontSize: '16px !important' }} />}
                sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600 }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', mb: 4 }}>
            {[
              { icon: <CalendarTodayIcon sx={{ fontSize: 18 }} />, label: `${shortDate(trip.startDate)} – ${shortDate(trip.endDate)}` },
              { icon: <PeopleIcon sx={{ fontSize: 18 }} />, label: `${trip.travelers} Traveler${trip.travelers > 1 ? 's' : ''}` },
              { icon: <AttachMoneyIcon sx={{ fontSize: 18 }} />, label: `~${formatINR(totalCost)} planned` },
              { icon: <AccessTimeIcon sx={{ fontSize: 18 }} />, label: `${dayCount} Days` },
            ].map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'rgba(255,255,255,0.9)' }}>
                {item.icon}
                <Typography variant="body2" sx={{ color: 'inherit' }}>{item.label}</Typography>
              </Box>
            ))}
          </Box>

          {/* Share buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Button
              startIcon={<ContentCopyIcon />}
              onClick={copyLink}
              sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}
              size="small"
            >
              Copy Link
            </Button>
            <Tooltip title="Share on Twitter">
              <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }} size="small">
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on Facebook">
              <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }} size="small">
                <FacebookIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Itinerary content */}
      <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, sm: 4 }, py: 5 }}>
        {trip.itinerary.map((day, dayIndex) => (
          <Box key={day.id} sx={{ mb: 5 }}>
            {/* Day header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
                pb: 2,
                borderBottom: '2px solid',
                borderColor: 'divider',
              }}
            >
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: 2,
                  px: 2,
                  py: 0.75,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  flexShrink: 0,
                }}
              >
                Day {dayIndex + 1}
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>{day.city}</Typography>
                <Typography variant="caption" color="text.secondary">{formatDate(day.date)}</Typography>
              </Box>
              <Box sx={{ flex: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {formatINR(day.activities.reduce((s, a) => s + a.cost, 0))} estimated
              </Typography>
            </Box>

            {/* Activities */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {day.activities.map((activity, i) => (
                <Card
                  key={activity.id}
                  sx={{
                    borderLeft: '4px solid',
                    borderColor: categoryColors[activity.category],
                    borderRadius: '0 12px 12px 12px',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                    <Grid container spacing={2} alignItems="flex-start">
                      <Grid size="auto">
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: categoryColors[activity.category] + '20',
                            color: categoryColors[activity.category],
                            fontSize: 12,
                            fontWeight: 800,
                          }}
                        >
                          {i + 1}
                        </Avatar>
                      </Grid>
                      <Grid size="grow">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                          <Typography variant="body1" fontWeight={700}>{activity.name}</Typography>
                          <Chip
                            label={categoryLabels[activity.category]}
                            size="small"
                            sx={{
                              bgcolor: categoryColors[activity.category] + '15',
                              color: categoryColors[activity.category],
                              fontWeight: 600,
                              fontSize: '0.65rem',
                              height: 20,
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {activity.time} · {activity.duration}
                            </Typography>
                          </Box>
                          {activity.location && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationOnIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">{activity.location}</Typography>
                            </Box>
                          )}
                        </Box>
                        {activity.notes && (
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                            {activity.notes}
                          </Typography>
                        )}
                      </Grid>
                      {activity.cost > 0 && (
                        <Grid size="auto">
                          <Box sx={{ borderRadius: 1.5, px: 1.5, py: 0.5, bgcolor: 'rgba(46,125,50,0.1)' }}>
                            <Typography variant="body2" fontWeight={700} color="success.dark">
                              {formatINR(activity.cost)}
                            </Typography>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ))}

        {/* Footer CTA */}
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <Box sx={{ bgcolor: 'primary.main', borderRadius: 1.5, p: 0.75 }}>
              <FlightTakeoffIcon sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Typography variant="h5" fontWeight={800} color="primary.dark">Traveloop</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Inspired by this itinerary? Plan your own adventure with Traveloop.
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/')}>
            Start Planning for Free
          </Button>
        </Box>
      </Box>

      <Snackbar open={snackOpen} autoHideDuration={2500} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSnackOpen(false)} sx={{ width: '100%' }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}
