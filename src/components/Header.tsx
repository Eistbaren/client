import {
  AppBar,
  Toolbar,
  Stepper,
  StepLabel,
  Step,
  Box,
  Container,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Creates a Header Component that displays the reservation steps
 * @return {JSX.Element}
 */
export default function Header() {
  const location = useLocation();
  const [step, setStep] = useState(0);
  const routes = ['/', '/search', '/table', '/personal-data'];

  useEffect(() => {
    console.log(location.pathname);
    const index = routes.indexOf(location.pathname);
    setStep(index >= 0 ? index : 0);
  }, [location]);

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
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>Reservation bear</h3>
          </Link>
          <Box sx={{ width: '80%', flexGrow: 1 }}>
            <Stepper activeStep={step}>
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
