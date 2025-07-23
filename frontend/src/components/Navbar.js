import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/items" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          My CRUD App
        </Typography>
        <Button color="inherit" component={RouterLink} to="/items/new">
          New Item
        </Button>
      </Toolbar>
    </AppBar>
  );
}
