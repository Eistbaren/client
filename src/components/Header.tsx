import {
  AppBar,
  Toolbar,
  Stepper,
  StepLabel,
  Step,
  Box,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * Creates a Header Component that displays the reservation steps
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
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>Reservation bear</h3>
          </Link>
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
