import { TextField, Grid, Typography, Box } from '@mui/material';

import React from 'react';
import { FloorPlan, Table } from '../data/api';
import '../css/TableSelectionPage.css';
import { TimePicker } from '@mui/x-date-pickers';

/**
 * TableSelection page
 * @return {JSX.Element}
 */
export default function TableSelectionPage() {
  const floorPlan: FloorPlan = {
    image: 'https://i.stack.imgur.com/1tl6D.jpg',
    size: {
      width: 1000 * 2,
      height: 600 * 2,
    },
  };

  const tables: Table[] = [
    {
      id: '1',
      seats: 4,
      floorPlan: {
        image: '/images/table4-1.png',
        position: {
          x: 20 * 2,
          y: 20 * 2,
        },
        size: {
          width: 100 * 2,
          height: 100 * 2,
        },
      },
    },
    {
      id: '2',
      seats: 4,
      floorPlan: {
        image: '/images/table4-1.png',
        position: {
          x: 20 * 2,
          y: 250 * 2,
        },
        size: {
          width: 100 * 2,
          height: 100 * 2,
        },
      },
    },
    {
      id: '3',
      seats: 8,
      floorPlan: {
        image: '/images/table8-1.png',
        position: {
          x: 700 * 2,
          y: 50 * 2,
        },
        size: {
          width: 100 * 2,
          height: 160 * 2,
        },
      },
    },
    {
      id: '4',
      seats: 4,
      floorPlan: {
        image: '/images/table4-2.png',
        position: {
          x: 700 * 2,
          y: 300 * 2,
        },
        size: {
          width: 100 * 2,
          height: 100 * 2,
        },
      },
    },
  ];

  const [timePickerToValue, setTimePickerToValue] = React.useState<Date | null>(
    null,
  );
  const [timePickerFromValue, setTimePickerFromValue] =
    React.useState<Date | null>(null);
  const [sizeFactor, setSizeFactor] = React.useState<number>(1);

  const canvasRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    handleResize();
  }, []);

  const handleResize = () => {
    // Scale canvas contents
    setSizeFactor(
      (canvasRef.current?.offsetWidth ?? 0) / (floorPlan.size?.width ?? 0),
    );
  };

  const fixSize = (originalSize?: number) => {
    return (originalSize ?? 0) * sizeFactor;
  };

  window.addEventListener('resize', () => handleResize());

  return (
    <div className={'table-selection-container'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4' component='div'>
            When do you want to come?
          </Typography>
        </Grid>

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

        <Grid item xs={12}>
          <Typography variant='h4' component='div'>
            Where do you want to sit?
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <div className='floorPlan-canvas' ref={canvasRef}>
            <img
              style={{
                width: fixSize(floorPlan.size?.width),
                height: fixSize(floorPlan.size?.height),
              }}
              src={floorPlan.image}
            />

            {tables.map((table, tableKey) => {
              return (
                <Box
                  sx={{
                    position: 'absolute',
                    left: fixSize(table.floorPlan?.position?.x),
                    top: fixSize(table.floorPlan?.position?.y),
                    width: fixSize(table.floorPlan?.size?.width),
                    height: fixSize(table.floorPlan?.size?.height),
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
