import {
  AppBar,
  Toolbar,
  Stepper,
  StepLabel,
  Step,
  Box,
  Typography,
} from '@mui/material';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
export default function Header() {
  const steps = [
    'Find a place to eat',
    'Select a timeslot and table',
    'Reserve your table',
  ];
  return (
    <AppBar position='sticky'>
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
  );
}
