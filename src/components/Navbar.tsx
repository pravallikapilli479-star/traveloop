import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuToggle?: () => void;
  showMenu?: boolean;
}

export default function Navbar({ onMenuToggle, showMenu = true }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {showMenu && (
          <IconButton
            edge="start"
            onClick={onMenuToggle}
            sx={{ display: { md: 'none' }, mr: 0.5 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexShrink: 0 }}
          onClick={() => navigate('/dashboard')}
        >
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: 2,
              p: 0.75,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FlightTakeoffIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: 'primary.dark', letterSpacing: '-0.5px' }}
          >
            Traveloop
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create-trip')}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          New Trip
        </Button>

        <Tooltip title="Notifications">
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Profile">
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'secondary.main',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 700,
            }}
            onClick={() => navigate('/dashboard')}
          >
            JD
          </Avatar>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
