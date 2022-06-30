import {
  TextField,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Context } from '../data/Context';
import React from 'react';
import { Table } from '../data/api';
import '../css/TableSelectionPage.css';
import { TimePicker } from '@mui/x-date-pickers';
import { Link } from 'react-router-dom';
import PaginatedApi from '../data/PaginatedApi';

/**
 * TableSelection page
 * @return {JSX.Element}
 */
export default function TableSelectionPage() {
  const { reservation, restaurantApi, restaurant } = React.useContext(Context);

  const restaurantApiHelp = new PaginatedApi<Table>(
    10,
    pagination =>
      restaurantApi
        .getRestaurantTables(
          restaurant.id ?? '',
          pagination.currentPage,
          pagination.pageSize,
        )
        .then(result => [result, result.results ?? []]),
    true,
  );
  const [isLoading, tables] = restaurantApiHelp.state();

  const [timePickerToValue, setTimePickerToValue] = React.useState<Date | null>(
    null,
  );
  const [timePickerFromValue, setTimePickerFromValue] =
    React.useState<Date | null>(null);
  const [sizeFactor, setSizeFactor] = React.useState<number>(1);

  const canvasRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    handleResize();
  }, [restaurant]);

  const handleResize = () => {
    // Scale canvas contents
    setSizeFactor(
      (canvasRef.current?.offsetWidth ?? 0) /
        (restaurant.floorPlan?.size?.width ?? 0),
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
            {restaurant.name}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography component='div'>
            Pleaase select the time and table.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' component='div'>
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
            minTime={new Date(restaurant.openingHours?.from ?? 0)}
            views={['hours', 'minutes']}
            ampm={false}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' component='div'>
            Where do you want to sit?
          </Typography>
        </Grid>

        {isLoading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <div className='floorPlan-canvas' ref={canvasRef}>
              <img
                style={{
                  width: fixSize(restaurant.floorPlan?.size?.width),
                  height: fixSize(restaurant.floorPlan?.size?.height),
                }}
                src={restaurant.floorPlan?.image}
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
                  >
                    <Link
                      to='/personal-data'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={() => {
                        reservation.tables = [table.id ?? ''];
                      }}
                    >
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer',
                        }}
                        src={table.floorPlan?.image}
                      />
                    </Link>
                  </Box>
                );
              })}
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
