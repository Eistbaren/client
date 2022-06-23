import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Container,
  Box,
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import { FloorPlan, Table } from '../data/api';
import '../css/TableSelectionPage.css';
import { TimePicker } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

/**
 * TableSelection page
 * @return {JSX.Element}
 */
export default function TableSelectionPage() {
  const floorPlan: FloorPlan = {
    image: 'https://i.stack.imgur.com/1tl6D.jpg',
    size: {
      width: 1000,
      height: 600,
    },
  };

  const tables: Table[] = [
    {
      id: '1',
      seats: 4,
      floorPlan: {
        image: '/images/table4-1.png',
        position: {
          x: 20,
          y: 20,
        },
        size: {
          width: 100,
          height: 100,
        },
      },
    },
    {
      id: '2',
      seats: 4,
      floorPlan: {
        image: '/images/table4-1.png',
        position: {
          x: 20,
          y: 250,
        },
        size: {
          width: 100,
          height: 100,
        },
      },
    },
    {
      id: '3',
      seats: 8,
      floorPlan: {
        image: '/images/table8-1.png',
        position: {
          x: 700,
          y: 50,
        },
        size: {
          width: 100,
          height: 160,
        },
      },
    },
    {
      id: '4',
      seats: 4,
      floorPlan: {
        image: '/images/table4-2.png',
        position: {
          x: 700,
          y: 300,
        },
        size: {
          width: 100,
          height: 100,
        },
      },
    },
  ];

  const [timePickerToValue, setTimePickerToValue] = React.useState<Date | null>(
    null,
  );
  const [timePickerFromValue, setTimePickerFromValue] =
    React.useState<Date | null>(null);

  return (
    <div className={'table-selection-container'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4' component='div'>
            When do you want to come?
          </Typography>
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={4}>
            <TimePicker
              value={timePickerFromValue}
              onChange={value => setTimePickerFromValue(value)}
              renderInput={params => (
                <TextField {...params} fullWidth label='Start time' />
              )}
              minutesStep={30}
              views={['hours', 'minutes']}
              ampm={false}
            />
          </Grid>
          <Grid item xs={4}>
            <TimePicker
              value={timePickerToValue}
              onChange={value => setTimePickerToValue(value)}
              renderInput={params => (
                <TextField {...params} fullWidth label='End time' />
              )}
              minutesStep={30}
              views={['hours', 'minutes']}
              ampm={false}
            />
          </Grid>
        </LocalizationProvider>

        <Grid item xs={12}>
          <Typography variant='h4' component='div'>
            Where do you want to sit?
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <div className='floorPlan-canvas'>
            <img
              style={{
                width: floorPlan.size?.width,
                height: floorPlan.size?.height,
              }}
              src={floorPlan.image}
            />

            {tables.map((table, tableKey) => {
              return (
                <Box
                  sx={{
                    position: 'absolute',
                    left: table.floorPlan?.position?.x,
                    top: table.floorPlan?.position?.y,
                    width: table.floorPlan?.size?.width,
                    height: table.floorPlan?.size?.height,
                  }}
                  key={tableKey}
                  onClick={() => alert(`Picked table ${table.id}`)}
                >
                  <img
                    style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                    src={table.floorPlan?.image}
                  />
                </Box>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
