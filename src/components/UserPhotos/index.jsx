// src/components/UserPhotos/index.jsx
import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import models from '../../modelData/models';
import { formatDateTime } from '../../utils/date';

export default function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId) || [];
  console.log(photos.length)
  const user = models.userModel(userId);

  if (!user) return <div>User not found</div>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Photos of {user.first_name} {user.last_name}</Typography>

      <Grid container spacing={2}>
        {photos.map(photo => (
          <Grid item xs={12} md={6} key={photo._id}>
            <Card>
              {/* Media: assumes images are available under /images/ or path used in skeleton */}
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

                  {Array.isArray(photo.comments) && photo.comments.length === 0 && (
                    <Typography variant="body2">No comments</Typography>
                  )}

                  {photo.comments && photo.comments.map(c => (
                    <Box key={c._id} sx={{ mt: 1, p: 1, borderRadius: 1, backgroundColor: '#f5f5f5' }}>
                      <Typography variant="caption">{formatDateTime(c.date_time)}</Typography>
                      <Typography variant="body2">
                        <RouterLink to={`/users/${c.user._id}`} style={{ textDecoration: 'none' }}>
                          <strong>{c.user.first_name} {c.user.last_name}</strong>
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
