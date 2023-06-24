import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Block Number
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
