import React from 'react';
import Page from './Components/Page';
import Grid from '@mui/material/Grid2';
import SideBar from './layouts/SideBar'

// Define your theme


function App() {

  return (
    <>
      <Grid sx={{ height: '100vh', width: '100%' }} container >
        <Grid size={12}>
          <SideBar />
        </Grid>
      </Grid >
    </>
  );
}

export default App;
