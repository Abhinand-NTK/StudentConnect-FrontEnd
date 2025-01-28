import React from 'react';
import Page from './Components/Page';
import SideBar from './Components/Sidebar';
import Grid from '@mui/material/Grid2';

function App() {
  return (
    <>
      <Grid sx={{ height: '100vh', width: '100%' }} container >
        <Grid size={3}>
          <SideBar />
        </Grid>
        <Grid size={9}>
          <Page />
        </Grid>
      </Grid >
    </>
  );
}

export default App;
