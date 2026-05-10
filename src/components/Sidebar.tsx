import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { useLocation, useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const navItems = [
  { label: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
  { label: 'My Trips', icon: <LuggageOutlinedIcon />, path: '/my-trips' },
  { label: 'Create Trip', icon: <AddCircleOutlineIcon />, path: '/create-trip' },
  { label: 'Itinerary Builder', icon: <MapOutlinedIcon />, path: '/itinerary/trip-1' },
  { label: 'Budget Breakdown', icon: <AccountBalanceWalletOutlinedIcon />, path: '/budget/trip-1' },
  { label: 'Shared Itinerary', icon: <ShareOutlinedIcon />, path: '/shared/trip-1' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function SidebarContent() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', pt: 1 }}>
      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ExploreOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          Navigation
        </Typography>
      </Box>

      <List sx={{ px: 1, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path || location.pathname.startsWith(item.path.split('/').slice(0, 2).join('/'));
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: active ? 'primary.main' : 'transparent',
                  color: active ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: active ? 'primary.dark' : 'action.hover',
                  },
                  transition: 'all 0.15s',
                  py: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: active ? 'white' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      fontSize: '0.875rem',
                      fontWeight: active ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 2 }} />
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            bgcolor: 'primary.light',
            borderRadius: 3,
            p: 2,
            background: 'linear-gradient(135deg, #00897b 0%, #00acc1 100%)',
          }}
        >
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
            Pro Plan
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
            Unlock unlimited trips & AI suggestions
          </Typography>
          <Chip
            label="Upgrade"
            size="small"
            sx={{ mt: 1, bgcolor: 'white', color: 'primary.dark', fontWeight: 700, display: 'block', width: 'fit-content' }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', mt: '64px' },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            mt: '64px',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}

export { DRAWER_WIDTH };
