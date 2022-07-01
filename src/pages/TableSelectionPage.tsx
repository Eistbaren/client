import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import { Context } from '../data/Context';
import React from 'react';
import { AnonymousReservation, Table } from '../data/api';
import '../css/TableSelectionPage.css';
import { Link } from 'react-router-dom';
import PaginatedApi from '../data/PaginatedApi';
import ReservationTimeslotTimePicker from '../components/ReservationTimeslotTimePicker';
import TimeslotText from '../components/TimeslotText';

/**
 * TableSelection page
 * @return {JSX.Element}
 */
export default function TableSelectionPage() {
  const { reservation, setReservation, restaurantApi, restaurant } =
    React.useContext(Context);

  if (
    restaurant.openingHours?.from === undefined ||
    restaurant.openingHours.to === undefined
  )
    return <>ERROR</>;

  const tableApi = new PaginatedApi<Table>(
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
  const [tablesLoading, tables] = tableApi.state();

  const reservationApi = new PaginatedApi<AnonymousReservation>(
    10,
    pagination =>
      restaurantApi
        .getRestaurantReservations(
          restaurant.id ?? '',
          reservation.time?.from ?? 0,
          reservation.time?.to ?? 0,
          pagination.currentPage,
          pagination.pageSize,
        )
        .then(result => [result, result.results ?? []]),
    true,
  );
  const [reservationsLoading, existingReservations] = reservationApi.state();

  const [sizeFactor, setSizeFactor] = React.useState<number>(1);

  const canvasRef = React.useRef<HTMLDivElement>(null);
  const reservedTables = existingReservations
    .map(reservation => reservation.tables ?? [])
    .flat()
    .filter(function (item, index, self) {
      return self.indexOf(item) == index;
    });

  React.useEffect(() => {
    tableApi.initialLoad();
    handleResize();
  }, [restaurant]);

  React.useEffect(() => {
    reservationApi.initialLoad();
  }, [reservation]);

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
          Opening hours: <TimeslotText timeslot={restaurant.openingHours} />
          Please select the time and table.
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' component='div'>
            When do you want to come?
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <ReservationTimeslotTimePicker
            reservation={reservation}
            setReservation={setReservation}
            label='Start time'
            timestampToChoose='from'
            minTime={restaurant.openingHours.from * 1000}
            maxTime={(restaurant.openingHours.to - 60 * 30) * 1000}
          />
        </Grid>

        <Grid item xs={4}>
          <ReservationTimeslotTimePicker
            reservation={reservation}
            setReservation={setReservation}
            label='End time'
            timestampToChoose='to'
            minTime={(reservation.time?.from ?? 0) + 60 * 30 * 1000}
            // include 15 minutes buffer, it does not work otherwise \(*~*)/
            maxTime={(restaurant.openingHours.to + 60 * 15) * 1000}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' component='div'>
            Where do you want to sit?
          </Typography>
        </Grid>

        {tablesLoading ? (
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
                      onClick={e => {
                        if (table?.id === undefined) return;
                        if (reservationsLoading) {
                          e.preventDefault();
                          return;
                        }
                        if (reservedTables.indexOf(table.id)) {
                          e.preventDefault();
                          alert('this table is already reserved');
                          // TODO: create popover which shows when this table is reserved!
                          return;
                        }

                        reservation.tables = [table.id];
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
