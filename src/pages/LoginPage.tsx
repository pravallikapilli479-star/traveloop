import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ExploreIcon from '@mui/icons-material/Explore';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: <BeachAccessIcon />, title: 'Dream Destinations', desc: 'Discover and plan your perfect getaway' },
  { icon: <ExploreIcon />, title: 'Smart Itineraries', desc: 'Build day-by-day travel plans with ease' },
  { icon: <CameraAltOutlinedIcon />, title: 'Capture Memories', desc: 'Document your journey and share with friends' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #004d40 0%, #00695c 40%, #00838f 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.04)',
            width: [300, 200, 400, 150, 250][i],
            height: [300, 200, 400, 150, 250][i],
            top: ['-80px', '60%', '20%', '70%', '-40px'][i],
            left: ['60%', '-60px', '50%', '70%', '30%'][i],
          }}
        />
      ))}

      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          p: 8,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 6 }}>
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2, p: 1, backdropFilter: 'blur(10px)' }}>
            <FlightTakeoffIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 800 }}>
            Traveloop
          </Typography>
        </Box>

        <Typography variant="h2" sx={{ color: 'white', fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
          Plan Your Perfect<br />
          <Box component="span" sx={{ color: '#80cbc4' }}>Adventure</Box>
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.75)', mb: 6, fontWeight: 400, maxWidth: 400 }}>
          Create stunning itineraries, track budgets, and explore the world with confidence.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {features.map((f) => (
            <Box key={f.title} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 2, p: 1, color: 'white', flexShrink: 0 }}>
                {f.icon}
              </Box>
              <Box>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>{f.title}</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>{f.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right: Auth card */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: { xs: 1, lg: 'none' },
          width: { lg: 480 },
          p: { xs: 2, sm: 4 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 420, borderRadius: 4, boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
          {/* Mobile logo */}
          <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 1, p: 3, pb: 0 }}>
            <Box sx={{ bgcolor: 'primary.main', borderRadius: 1.5, p: 0.75 }}>
              <FlightTakeoffIcon sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.dark' }}>Traveloop</Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700} mb={0.5}>
              {tab === 0 ? 'Welcome back!' : 'Create account'}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              {tab === 0 ? 'Sign in to continue your adventures' : 'Start planning your dream trips'}
            </Typography>

            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{ mb: 3, '& .MuiTab-root': { fontWeight: 600, flex: 1 } }}
            >
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tab === 1 && (
                <TextField
                  label="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start"><PersonOutlineIcon fontSize="small" /></InputAdornment>
                      ),
                    },
                  }}
                  fullWidth
                  size="small"
                />
              )}
              <TextField
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"><EmailOutlinedIcon fontSize="small" /></InputAdornment>
                    ),
                  },
                }}
                fullWidth
                size="small"
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"><LockOutlinedIcon fontSize="small" /></InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                fullWidth
                size="small"
              />

              {tab === 0 && (
                <Box sx={{ textAlign: 'right', mt: -1 }}>
                  <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 600 }}>
                    Forgot password?
                  </Typography>
                </Box>
              )}

              <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 1 }}>
                {tab === 0 ? 'Sign In' : 'Create Account'}
              </Button>

              <Divider sx={{ my: 1 }}>
                <Typography variant="caption" color="text.secondary">or continue as</Typography>
              </Divider>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/dashboard')}
                sx={{ color: 'text.primary', borderColor: 'divider' }}
              >
                Guest / Demo Mode
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
