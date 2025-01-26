import React from 'react';
import Page from './Components/Page';
import Sidebar from './Components/Sidebar';
import Grid2 from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

function App() {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} sm={4} md={3} lg={3}> {/* Sidebar with responsive sizes */}
          <Sidebar />
        </Grid2>
        <Grid2 xs={12} sm={8} md={12} lg={12}> {/* Main content */}
          <Page />
        </Grid2>
      </Grid2>
    </>
  );
}

export default App;
