import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { categoryColors, categoryLabels, type Activity, type ItineraryDay } from '../data/sampleData';
import { formatINR } from '../utils/currency';
import { useTrips } from '../contexts/TripContext';

const categoryOptions = Object.keys(categoryLabels);

const emptyActivity = (): Partial<Activity> => ({
  name: '', category: 'sightseeing', time: '09:00', duration: '1h', cost: 0, notes: '', location: '',
});

export default function ItineraryBuilderPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { trips, updateTrip } = useTrips();
  const trip = trips.find((t) => t.id === tripId) ?? trips[0];

  const [selectedDay, setSelectedDay] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>(emptyActivity());
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  const currentDay = trip.itinerary[selectedDay];

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const totalCost = currentDay?.activities.reduce((s, a) => s + a.cost, 0) ?? 0;

  const showSnack = (msg: string) => {
    setSnackMsg(msg);
    setSnackOpen(true);
  };

  const handleAddActivity = () => {
    if (!newActivity.name || !currentDay) return;

    const activity: Activity = {
      id: `act-${Date.now()}`,
      name: newActivity.name!,
      category: newActivity.category as Activity['category'],
      time: newActivity.time || '09:00',
      duration: newActivity.duration || '1h',
      cost: newActivity.cost || 0,
      notes: newActivity.notes || undefined,
      location: newActivity.location || undefined,
    };

    const updatedItinerary: ItineraryDay[] = trip.itinerary.map((day, i) =>
      i === selectedDay
        ? { ...day, activities: [...day.activities, activity] }
        : day
    );

    updateTrip(trip.id, { itinerary: updatedItinerary });
    setDialogOpen(false);
    setNewActivity(emptyActivity());
    showSnack(`"${activity.name}" added to Day ${selectedDay + 1}`);
  };

  const handleDeleteActivity = (activityId: string) => {
    const updatedItinerary: ItineraryDay[] = trip.itinerary.map((day, i) =>
      i === selectedDay
        ? { ...day, activities: day.activities.filter((a) => a.id !== activityId) }
        : day
    );

    updateTrip(trip.id, { itinerary: updatedItinerary });
    showSnack('Activity removed');
  };

  return (
    <AppLayout>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} mb={0.5}>{trip.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {trip.destinations.map((d) => (
              <Chip key={d} label={d} size="small" icon={<LocationOnOutlinedIcon sx={{ fontSize: '14px !important' }} />} variant="outlined" />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<ShareOutlinedIcon />}
            onClick={() => navigate(`/shared/${trip.id}`)}
            size="small"
          >
            Share
          </Button>
          <Button
            variant="outlined"
            startIcon={<CurrencyRupeeIcon />}
            onClick={() => navigate(`/budget/${trip.id}`)}
            size="small"
          >
            Budget
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Day selector */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} mb={1.5} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <MapOutlinedIcon fontSize="small" /> Days
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {trip.itinerary.map((day, i) => {
                  const dayCost = day.activities.reduce((s, a) => s + a.cost, 0);
                  return (
                    <Box
                      key={day.id}
                      onClick={() => setSelectedDay(i)}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        cursor: 'pointer',
                        bgcolor: selectedDay === i ? 'primary.main' : 'action.hover',
                        color: selectedDay === i ? 'white' : 'text.primary',
                        transition: 'all 0.15s',
                        '&:hover': { bgcolor: selectedDay === i ? 'primary.dark' : 'action.selected' },
                      }}
                    >
                      <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
                        Day {i + 1} — {day.city}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {formatDate(day.date)}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography variant="caption" sx={{ opacity: 0.75 }}>
                          {day.activities.length} activities
                        </Typography>
                        <Typography variant="caption" fontWeight={600} sx={{ opacity: 0.9 }}>
                          {formatINR(dayCost)}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>

          {/* Trip summary */}
          <Card sx={{ mt: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} mb={1.5}>Trip Summary</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">Total Days</Typography>
                  <Typography variant="caption" fontWeight={600}>{trip.itinerary.length}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">Total Activities</Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {trip.itinerary.reduce((s, d) => s + d.activities.length, 0)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">Planned Spend</Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {formatINR(trip.itinerary.reduce((s, d) => s + d.activities.reduce((ss, a) => ss + a.cost, 0), 0))}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Day timeline */}
        <Grid size={{ xs: 12, md: 9 }}>
          {currentDay && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Day {selectedDay + 1}: {currentDay.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(currentDay.date)} · {formatINR(totalCost)} planned
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={() => setDialogOpen(true)}
                >
                  Add Activity
                </Button>
              </Box>

              {/* Timeline */}
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 20,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    bgcolor: 'divider',
                    zIndex: 0,
                  }}
                />
                {currentDay.activities.map((activity, i) => (
                  <Box
                    key={activity.id}
                    sx={{ display: 'flex', gap: 2, mb: 2, position: 'relative', zIndex: 1 }}
                  >
                    {/* Timeline dot */}
                    <Box sx={{ flexShrink: 0, mt: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: categoryColors[activity.category],
                          fontSize: 12,
                          fontWeight: 700,
                          boxShadow: '0 0 0 3px white, 0 0 0 5px ' + categoryColors[activity.category] + '30',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </Avatar>
                    </Box>

                    {/* Activity card */}
                    <Card
                      sx={{
                        flex: 1,
                        borderLeft: '4px solid',
                        borderColor: categoryColors[activity.category],
                        borderRadius: '0 12px 12px 12px',
                        '&:hover .activity-actions': { opacity: 1 },
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                              <Typography variant="body1" fontWeight={600}>{activity.name}</Typography>
                              <Chip
                                label={categoryLabels[activity.category]}
                                size="small"
                                sx={{
                                  bgcolor: categoryColors[activity.category] + '20',
                                  color: categoryColors[activity.category],
                                  fontWeight: 600,
                                  fontSize: '0.65rem',
                                  height: 20,
                                }}
                              />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                  {activity.time} · {activity.duration}
                                </Typography>
                              </Box>
                              {activity.location && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LocationOnOutlinedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                  <Typography variant="caption" color="text.secondary">{activity.location}</Typography>
                                </Box>
                              )}
                              {activity.cost > 0 && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <CurrencyRupeeIcon sx={{ fontSize: 13, color: 'success.main' }} />
                                  <Typography variant="caption" color="success.main" fontWeight={600}>
                                    {formatINR(activity.cost)}
                                  </Typography>
                                </Box>
                              )}
                            </Box>

                            {activity.notes && (
                              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                {activity.notes}
                              </Typography>
                            )}
                          </Box>

                          <Box
                            className="activity-actions"
                            sx={{ display: 'flex', opacity: 0, transition: 'opacity 0.15s', flexShrink: 0 }}
                          >
                            <Tooltip title="Edit">
                              <IconButton size="small"><EditOutlinedIcon fontSize="small" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" color="error" onClick={() => handleDeleteActivity(activity.id)}>
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}

                {/* Add activity button at end */}
                <Box sx={{ display: 'flex', gap: 2, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ flexShrink: 0 }}>
                    <IconButton
                      onClick={() => setDialogOpen(true)}
                      sx={{
                        width: 40,
                        height: 40,
                        border: '2px dashed',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Add another activity</Typography>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Grid>
      </Grid>

      {/* Add Activity Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Activity</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Activity Name"
              fullWidth
              value={newActivity.name}
              onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              placeholder="e.g. Visit Senso-ji Temple"
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newActivity.category}
                label="Category"
                onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value as Activity['category'] })}
              >
                {categoryOptions.map((cat) => (
                  <MenuItem key={cat} value={cat}>{categoryLabels[cat]}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  label="Time"
                  type="time"
                  fullWidth
                  value={newActivity.time}
                  onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="Duration"
                  fullWidth
                  value={newActivity.duration}
                  onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
                  placeholder="e.g. 2h"
                />
              </Grid>
            </Grid>
            <TextField
              label="Location"
              fullWidth
              value={newActivity.location}
              onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
            />
            <TextField
              label="Estimated Cost (INR)"
              type="number"
              fullWidth
              value={newActivity.cost}
              onChange={(e) => setNewActivity({ ...newActivity, cost: Number(e.target.value) })}
              slotProps={{ input: { startAdornment: <Box sx={{ mr: 0.5, color: 'text.secondary' }}>\u20B9</Box> } }}
            />
            <TextField
              label="Notes"
              multiline
              rows={2}
              fullWidth
              value={newActivity.notes}
              onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddActivity} disabled={!newActivity.name}>
            Add Activity
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackOpen} autoHideDuration={2500} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSnackOpen(false)} sx={{ width: '100%' }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </AppLayout>
  );
}
