import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  AppBar,
  Toolbar,
  Stepper,
  StepLabel,
  Step,
  Box,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Landingpage from './Landingpage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
function App() {
  const steps = [
    'Find a place to eat',
    'Select a timeslot and table',
    'Reserve your table',
  ];

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position='fixed'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Reservation bear
            </Typography>
            <Box sx={{ width: '80%', flexGrow: 1 }}>
              <Stepper activeStep={0}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Toolbar>
        </AppBar>
        <Container
          component='main'
          maxWidth='lg'
          sx={{ my: { xs: 8, md: 12 } }}
        >
          <Landingpage></Landingpage>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
