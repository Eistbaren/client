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

/**
 * Landingpage component
 * @return {JSX.Element}
 */
function Landingpage() {
  return (
    <>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        Search a restaurant
      </Typography>
    </>
  );
}

export default Landingpage;
