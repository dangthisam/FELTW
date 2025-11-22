// src/components/UserDetail/index.jsx
import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import models from '../../modelData/models';

export default function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) return <div>User not found</div>;

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardContent>
        <Typography variant="h5">{user.first_name} {user.last_name}</Typography>
        <Typography variant="subtitle1">{user.occupation} — {user.location}</Typography>
        <Typography paragraph sx={{ mt: 2 }}>{user.description}</Typography>

        <Button component={RouterLink} to={`/photos/${user._id}`} variant="contained">
          View Photos
        </Button>
      </CardContent>
    </Card>
  );
}
