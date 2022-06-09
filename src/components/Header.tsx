import {
  AppBar,
  Toolbar,
  Stepper,
  StepLabel,
  Step,
  Box,
  Container,
} from '@mui/material';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
export default function Header() {
  const steps = [
    'People and date',
    'Find a place to eat',
    'Select a timeslot and table',
    'Reserve your table',
  ];
  return (
    <AppBar position='sticky'>
      <Container maxWidth='lg'>
        <Toolbar>
          <h3>Reservation bear</h3>
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
      </Container>
    </AppBar>
  );
}
