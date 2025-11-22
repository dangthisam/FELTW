// src/components/UserDetail/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import models from '../../modelData/models';

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await models.userModel(userId);
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <p>Error loading user: {error}</p>
      </Box>
    );
  }

  if (!user) return <div>User not found</div>;

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardContent>
        <Typography variant="h5">{user.first_name || ''} {user.last_name}</Typography>
        <Typography variant="subtitle1">{user.occupation} — {user.location}</Typography>
        <Typography paragraph sx={{ mt: 2 }}>{user.description}</Typography>

        <Button component={RouterLink} to={`/photos/${user._id}`} variant="contained">
          View Photos
        </Button>
      </CardContent>
    </Card>
  );
}
