// src/components/TopBar/index.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocation, matchPath } from 'react-router-dom';
import models from '../../modelData/models';

export default function TopBar() {
  const location = useLocation();
  let rightText = 'Users';

  // match /users/:userId
  const matchUser = matchPath('/users/:userId', location.pathname);
  const matchPhotos = matchPath('/photos/:userId', location.pathname);

  if (matchUser && matchUser.params?.userId) {
    const u = models.userModel(matchUser.params.userId);
    if (u) rightText = `${u.first_name} ${u.last_name}`;
  } else if (matchPhotos && matchPhotos.params?.userId) {
    const u = models.userModel(matchPhotos.params.userId);
    if (u) rightText = `Photos of ${u.first_name} ${u.last_name}`;
  } else if (location.pathname === '/users') {
    rightText = 'Users';
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Your Name Here</Typography>
        <Typography variant="subtitle1">{rightText}</Typography>
      </Toolbar>
    </AppBar>
  );
}
