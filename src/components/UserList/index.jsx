// src/components/UserList/index.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import models from '../../modelData/models'; // path theo project bạn

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await models.userListModel();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <p>Error loading users: {error}</p>
      </Box>
    );
  }

  return (
    <nav aria-label="user list">
      <List>
        {users.map(user => (
          <div key={user._id}>
            <ListItemButton
              component={RouterLink}
              to={`/users/${user._id}`}
            >
              <ListItemText primary={`${user.location || ''} ${user.last_name}`} />
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </List>
    </nav>
  );
}
