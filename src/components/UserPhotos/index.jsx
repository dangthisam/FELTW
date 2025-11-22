// src/components/UserPhotos/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import models from '../../modelData/models';
import { formatDateTime } from '../../utils/date';

export default function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user and photos in parallel
        const [userData, photosData] = await Promise.all([
          models.userModel(userId),
          models.photoOfUserModel(userId),
        ]);

        setUser(userData);
        setPhotos(Array.isArray(photosData) ? photosData : []);
      } catch (err) {
        setError(err.message || 'Failed to load photos');
        setPhotos([]);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <p>Error loading photos: {error}</p>
      </Box>
    );
  }

  if (!user) return <div>User not found</div>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Photos of {user.first_name || ''} {user.last_name}</Typography>

      <Grid container spacing={2}>
        {photos.map(photo => (
          <Grid item xs={12} md={6} key={photo._id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`/images/${photo.file_name}`}
                alt={photo.file_name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {formatDateTime(photo.date_time)}
                </Typography>

                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle1">Comments</Typography>

                  {(!photo.comments || photo.comments.length === 0) && (
                    <Typography variant="body2">No comments</Typography>
                  )}

                  {photo.comments && photo.comments.map(c => (
                    <Box key={c._id} sx={{ mt: 1, p: 1, borderRadius: 1, backgroundColor: '#f5f5f5' }}>
                      <Typography variant="caption">{formatDateTime(c.date_time)}</Typography>
                      <Typography variant="body2">
                        <RouterLink to={`/users/${c.user ? c.user._id : c.user_id}`} style={{ textDecoration: 'none' }}>
                          <strong>{c.user ? `${c.user.first_name} ${c.user.last_name}` : `User ${c.user_id}`}</strong>
                        </RouterLink>
                        : {c.comment}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
