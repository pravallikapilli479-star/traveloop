import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import FlightIcon from '@mui/icons-material/Flight';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useNavigate } from 'react-router-dom';
import type { Trip } from '../data/sampleData';
import { formatINR } from '../utils/currency';

const statusConfig = {
  planning: { label: 'Planning', color: 'warning' as const },
  upcoming: { label: 'Upcoming', color: 'info' as const },
  ongoing: { label: 'Ongoing', color: 'success' as const },
  completed: { label: 'Completed', color: 'default' as const },
};

const coverGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
];

interface TripCardProps {
  trip: Trip;
  index?: number;
}

export default function TripCard({ trip, index = 0 }: TripCardProps) {
  const navigate = useNavigate();
  const status = statusConfig[trip.status];
  const budgetPercent = Math.min((trip.spent / trip.budget) * 100, 100);
  const gradient = coverGradients[index % coverGradients.length];

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea
        onClick={() => navigate(`/itinerary/${trip.id}`)}
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {/* Cover gradient */}
        <Box
          sx={{
            height: 120,
            background: gradient,
            display: 'flex',
            alignItems: 'flex-end',
            p: 2,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
            }}
          >
            <Chip
              label={status.label}
              size="small"
              color={status.color}
              sx={{ fontWeight: 600, fontSize: '0.7rem' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2, p: 0.75 }}>
              <FlightIcon sx={{ color: 'white', fontSize: 18 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2, fontSize: '1rem' }}>
                {trip.title}
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ flex: 1, pt: 1.5 }}>
          {/* Destinations */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
            {trip.destinations.map((dest) => (
              <Chip
                key={dest}
                label={dest}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem', height: 22 }}
              />
            ))}
          </Box>

          {/* Dates & Travelers */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PeopleOutlineIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
              </Typography>
            </Box>
          </Box>

          {/* Budget */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">Budget</Typography>
              <Typography variant="caption" fontWeight={600}>
                {formatINR(trip.spent)} / {formatINR(trip.budget)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={budgetPercent}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  bgcolor: budgetPercent > 85 ? 'error.main' : budgetPercent > 60 ? 'warning.main' : 'primary.main',
                },
              }}
            />
          </Box>

          {/* Avatars placeholder for travelers */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
            <AvatarGroup max={3}>
              {Array.from({ length: trip.travelers }).map((_, i) => (
                <Avatar
                  key={i}
                  sx={{ width: 24, height: 24, fontSize: 10, bgcolor: ['primary.main', 'secondary.main', 'info.main'][i % 3] }}
                >
                  {['JD', 'KL', 'MN'][i % 3]}
                </Avatar>
              ))}
            </AvatarGroup>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
