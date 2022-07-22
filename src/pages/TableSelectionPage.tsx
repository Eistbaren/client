import { Grid, Typography, CircularProgress } from '@mui/material';
import { Context } from '../data/Context';
import React from 'react';
import { AnonymousReservation, Table } from '../data/api';
import '../css/TableSelectionPage.css';
import { useNavigate } from 'react-router-dom';
import PaginatedApi from '../data/PaginatedApi';
import QueryTimeslotTimePicker from '../components/QueryTimeslotTimePicker';
import TimeslotText, { timeslotToText } from '../components/TimeslotText';
import FloorplanTable from '../components/FloorplanTable';

/**
 * TableSelection page
 * @return {JSX.Element}
 */
export default function TableSelectionPage() {
  const {
    query,
    setQuery,
    reservationCreationRequest,
    setReservationCreationRequest,
    restaurantApi,
    restaurant,
    configuration,
  } = React.useContext(Context);

  const [invalidFromDate, setInvalidFromDate] = React.useState<string>('');
  const [invalidToDate, setInvalidToDate] = React.useState<string>('');

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
          (query.time?.from ?? 0) + 60, // Add one minute to allow reservation directly after
          query.time?.to ?? 0,
          pagination.currentPage,
          pagination.pageSize,
        )
        .then(result => [result, result.results ?? []]),
    true,
  );
  const [reservationsLoading, existingReservations] = reservationApi.state();

  const [sizeFactor, setSizeFactor] = React.useState<number>(1);
  const navigate = useNavigate();

  const canvasRef = React.useRef<HTMLDivElement>(null);
  const reservedTables = existingReservations
    .map(reservation => reservation.tables ?? [])
    .flat()
    .filter(function (item, index, self) {
      return self.indexOf(item) == index;
    });

  React.useEffect(() => {
    tableApi.initialLoad();
  }, [restaurant]);

  React.useEffect(() => {
    reservationApi.initialLoad();
  }, [query]);

  React.useEffect(() => {
    handleResize();
  }, [tables]);

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

  const isInOpeningHours = () => {
    if (
      !restaurant.openingHours?.from ||
      !restaurant.openingHours?.to ||
      !query.time?.from ||
      !query.time?.to
    ) {
      return false;
    }

    // Extract hours and minutes and delete seconds
    // + 7200 is for timezone adjustment from UTC to GMT+2
    const openingFromMinutes =
      ((restaurant.openingHours.from + 7200) % 86400) / 60;
    const openingToMinutes = ((restaurant.openingHours.to + 7200) % 86400) / 60;
    const queryFromMinutes = ((query.time.from + 7200) % 86400) / 60;
    const queryToMinutes = ((query.time.to + 7200) % 86400) / 60;

    return (
      queryFromMinutes >= openingFromMinutes &&
      queryToMinutes >= openingFromMinutes &&
      queryFromMinutes <= openingToMinutes &&
      queryToMinutes <= openingToMinutes
    );
  };

  const disableTable = (table: Table): string => {
    if (table.id === undefined) {
      return 'This table cannot be reserved!';
    }
    if (invalidFromDate !== '') {
      return 'Reservation time ' + invalidFromDate;
    }
    if (invalidToDate !== '') {
      return 'Reservation time ' + invalidToDate;
    }
    if (!isInOpeningHours()) {
      return 'Reservation time is outside of the opening hours!';
    }
    if ((query.time?.from ?? 1) + 60 * 30 > (query.time?.to ?? 0)) {
      return 'Invalid time range!';
    }
    if (reservedTables.indexOf(table.id ?? '') >= 0) {
      return 'This table is already reserved!';
    }
    if ((table?.seats ?? 0) < (query?.numberVisitors ?? 1)) {
      return 'This table does not have enough seats!';
    }
    return '';
  };

  const handleTablePicked = (table: Table) => {
    const msg = disableTable(table);
    if (msg !== '') {
      alert(msg);
      return;
    }
    setReservationCreationRequest({
      ...reservationCreationRequest,
      tables: [table.id ?? ''],
      time: query.time,
    });
    navigate(`/personal-data`);
  };

  const getReservationsOfTable = (tableId: string) => {
    return existingReservations.filter(
      r => (r.tables?.indexOf(tableId) ?? -1) >= 0,
    );
  };

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
          <QueryTimeslotTimePicker
            query={query}
            setQuery={setQuery}
            invalidDate={invalidFromDate}
            setInvalidDate={setInvalidFromDate}
            label='Start time'
            timestampToChoose='from'
            // include 15 minutes buffer, it does not work otherwise \(*~*)/
            minTime={restaurant.openingHours.from}
            maxTime={restaurant.openingHours.to - 60 * 15}
          />
        </Grid>

        <Grid item xs={4}>
          <QueryTimeslotTimePicker
            query={query}
            setQuery={setQuery}
            invalidDate={invalidToDate}
            setInvalidDate={setInvalidToDate}
            label='End time'
            timestampToChoose='to'
            minTime={(query.time?.from ?? 0) + 60 * 30}
            // include 15 minutes buffer, it does not work otherwise \(*~*)/
            maxTime={restaurant.openingHours.to + 60 * 15}
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
                src={`${configuration.basePath}/image/${restaurant.floorPlan?.image}`}
              />

              {tables.map((table, tableKey) => {
                return (
                  <FloorplanTable
                    key={`floorplanTable-${table.id}-${tableKey}`}
                    image={`${configuration.basePath}/image/${table.floorPlan?.image}`}
                    tableOnFloorplan={{
                      position: {
                        x: fixSize(table.floorPlan?.position?.x),
                        y: fixSize(table.floorPlan?.position?.y),
                      },
                      size: {
                        width: fixSize(table.floorPlan?.size?.width),
                        height: fixSize(table.floorPlan?.size?.height),
                      },
                    }}
                    disabled={reservationsLoading || disableTable(table) !== ''}
                    tooltip={
                      reservationsLoading ? (
                        'Please wait...'
                      ) : table.id === undefined ? (
                        'There is a problem with this table!'
                      ) : reservedTables.indexOf(table.id ?? '') >= 0 ? (
                        <div>
                          This table is already reserved at these times:
                          <ul>
                            {getReservationsOfTable(table?.id)
                              .map(r => r.time)
                              .map(t => timeslotToText(t))
                              .map(t => (
                                <li key={`reserved-time-${table.id}-${t}`}>
                                  {t}
                                </li>
                              ))}
                          </ul>
                        </div>
                      ) : (
                        disableTable(table)
                      )
                    }
                    onClick={() => {
                      if (table?.id === undefined) return;
                      handleTablePicked(table);
                    }}
                  />
                );
              })}
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
