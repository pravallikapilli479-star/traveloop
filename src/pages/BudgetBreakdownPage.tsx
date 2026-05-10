import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { sampleTrips, categoryColors, categoryLabels } from '../data/sampleData';
import { formatINR } from '../utils/currency';

export default function BudgetBreakdownPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const trip = sampleTrips.find((t) => t.id === tripId) ?? sampleTrips[0];

  const allActivities = trip.itinerary.flatMap((day) =>
    day.activities.map((act) => ({ ...act, dayCity: day.city, dayDate: day.date }))
  );

  const byCategory = categoryLabels
    ? Object.keys(categoryLabels).map((cat) => {
        const acts = allActivities.filter((a) => a.category === cat);
        const total = acts.reduce((s, a) => s + a.cost, 0);
        return { category: cat, label: categoryLabels[cat], total, count: acts.length, color: categoryColors[cat] };
      }).filter((c) => c.total > 0)
    : [];

  const totalPlanned = allActivities.reduce((s, a) => s + a.cost, 0);
  const remainingBudget = trip.budget - trip.spent;
  const overBudget = trip.spent > trip.budget;
  const budgetPercent = Math.min((trip.spent / trip.budget) * 100, 100);

  const byDay = trip.itinerary.map((day) => ({
    ...day,
    totalCost: day.activities.reduce((s, a) => s + a.cost, 0),
  }));

  return (
    <AppLayout>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} mb={0.5}>Budget Breakdown</Typography>
          <Typography variant="body2" color="text.secondary">{trip.title}</Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<MapOutlinedIcon />}
          onClick={() => navigate(`/itinerary/${trip.id}`)}
          size="small"
        >
          View Itinerary
        </Button>
      </Box>

      {/* Summary cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            label: 'Total Budget',
            value: formatINR(trip.budget),
            icon: <AccountBalanceWalletIcon />,
            color: 'primary.main',
            bg: 'rgba(0,137,123,0.08)',
          },
          {
            label: 'Amount Spent',
            value: formatINR(trip.spent),
            icon: <TrendingUpIcon />,
            color: overBudget ? 'error.main' : 'warning.main',
            bg: overBudget ? 'rgba(211,47,47,0.08)' : 'rgba(237,108,2,0.08)',
          },
          {
            label: 'Remaining',
            value: formatINR(Math.abs(remainingBudget)),
            icon: overBudget ? <TrendingDownIcon /> : <CheckCircleIcon />,
            color: overBudget ? 'error.main' : 'success.main',
            bg: overBudget ? 'rgba(211,47,47,0.08)' : 'rgba(46,125,50,0.08)',
          },
          {
            label: 'Planned Activities',
            value: formatINR(totalPlanned),
            icon: <AttachMoneyIcon />,
            color: 'info.main',
            bg: 'rgba(2,136,209,0.08)',
          },
        ].map((stat) => (
          <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
            <Card>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box sx={{ bgcolor: stat.bg, borderRadius: 2, p: 0.75, color: stat.color, display: 'flex' }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700} lineHeight={1} sx={{ color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Overall progress */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="h6" fontWeight={700}>Overall Budget Progress</Typography>
            <Chip
              icon={overBudget ? <WarningAmberIcon /> : <CheckCircleIcon />}
              label={overBudget ? 'Over budget!' : `${(100 - budgetPercent).toFixed(0)}% remaining`}
              color={overBudget ? 'error' : budgetPercent > 80 ? 'warning' : 'success'}
              size="small"
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={budgetPercent}
            sx={{
              height: 16,
              borderRadius: 8,
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                borderRadius: 8,
                bgcolor: overBudget ? 'error.main' : budgetPercent > 80 ? 'warning.main' : 'primary.main',
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary">{formatINR(0)}</Typography>
            <Typography variant="caption" color="text.secondary">{formatINR(trip.budget)}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* By category */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Spending by Category</Typography>
          <Card>
            <CardContent>
              {byCategory.map((cat, i) => {
                const pct = totalPlanned > 0 ? (cat.total / totalPlanned) * 100 : 0;
                return (
                  <Box key={cat.category} sx={{ mb: i < byCategory.length - 1 ? 2.5 : 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: cat.color }} />
                        <Typography variant="body2" fontWeight={500}>{cat.label}</Typography>
                        <Typography variant="caption" color="text.secondary">({cat.count} items)</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" color="text.secondary">{pct.toFixed(0)}%</Typography>
                        <Typography variant="body2" fontWeight={700}>{formatINR(cat.total)}</Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: cat.color + '20',
                        '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: cat.color },
                      }}
                    />
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>

        {/* By day */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Spending by Day</Typography>
          <Card>
            <List disablePadding>
              {byDay.map((day, i) => (
                <Box key={day.id}>
                  {i > 0 && <Divider />}
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: 12, fontWeight: 700, bgcolor: 'primary.light' }}>
                        D{i + 1}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={day.city}
                      secondary={new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      slotProps={{ primary: { fontWeight: 600, fontSize: '0.875rem' }, secondary: { fontSize: '0.75rem' } }}
                    />
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" fontWeight={700}>{formatINR(day.totalCost)}</Typography>
                      <Typography variant="caption" color="text.secondary">{day.activities.length} activities</Typography>
                    </Box>
                  </ListItem>
                </Box>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Activity table */}
        <Grid size={12}>
          <Typography variant="h6" fontWeight={700} mb={2}>All Expenses</Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Activity</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allActivities.filter((a) => a.cost > 0).map((act) => (
                  <TableRow key={act.id} hover>
                    <TableCell>{act.name}</TableCell>
                    <TableCell>{act.dayCity}</TableCell>
                    <TableCell>
                      <Chip
                        label={categoryLabels[act.category]}
                        size="small"
                        sx={{
                          bgcolor: categoryColors[act.category] + '20',
                          color: categoryColors[act.category],
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          height: 20,
                        }}
                      />
                    </TableCell>
                    <TableCell>{act.time}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        {formatINR(act.cost)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell colSpan={4} sx={{ fontWeight: 700 }}>Total Planned</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    {formatINR(totalPlanned)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
