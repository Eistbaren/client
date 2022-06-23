import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import { Restaurant } from '../data/api';
import '../css/TableSelectionPage.css';

/**
 * TableSelection page
 * @return {JSX.Element}
 */
export default function TableSelectionPage() {
  return (
    <div className={'table-selection-container'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h4' component='div'>
            When do you want to come?
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
