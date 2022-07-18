import {
  Alert,
  AlertColor,
  AlertTitle,
  Box,
  Button,
  Chip,
  Collapse,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from '@mui/lab/LoadingButton';
import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Reservation, Restaurant } from '../data';
import { Context } from '../data/Context';
import RestaurantDetailsModal from '../components/RestaurantDetailsModal';
import RestaurantCardSideways from '../components/RestaurantCardSideways';

/**
 * Reservation Approval Page
 * @return {JSX.Element}
 */
export default function ReservationApproval() {
  // gets reservationId from the URL params
  const { reservationId } = useParams();
  const [searchParams] = useSearchParams();
  const confirmationToken = searchParams.get('confirmationToken');

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [reservation, setReservation] = useState<Reservation>();
  const [numberOfSeats, setNumberOfSeats] = useState<number>(0);
  const [showReservation, setShowReservation] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    severity: AlertColor;
    title: string;
    body?: string;
  }>();
  const [isConfirmButtonLoading, setConfirmButtonLoading] =
    useState<boolean>(false);
  const [isCancelButtonLoading, setCancelButtonLoading] =
    useState<boolean>(false);

  const { configuration, reservationApi, tableApi, restaurantApi } =
    useContext(Context);
  useEffect(() => {
    reservationApi
      .getReservation(reservationId ?? '0')
      .then(r => {
        setReservation(r);
        return r.tables;
      })
      .then(t => {
        let restaurantId: Promise<string | void | undefined> = new Promise(
          resolve => resolve(),
        );
        if (t !== undefined) {
          for (const table of t) {
            restaurantId = tableApi
              .getTable(table)
              .then(t => {
                setNumberOfSeats(numberOfSeats + (t?.seats ?? 0));
                return t;
              })
              .then(t => {
                return t.restaurantId;
              })

              .catch(() => errorAlert('Error getting table information'));
          }
        }
        return restaurantId;
      })
      .then(rId => {
        if (rId !== undefined) {
          restaurantApi
            .getRestaurant(rId)
            .then(r => setRestaurant(r))
            .catch(() => errorAlert('Error getting restaurant information'));
        }
      })
      .catch(e => {
        if (e instanceof Response) {
          e.json()
            .then(j =>
              (j.message as string).startsWith('Unable to find')
                ? errorAlert('Reservation not found!')
                : errorAlert('Something went wrong!'),
            )
            .then(() => setShowReservation(false));
        }
      });
  }, []);

  const isIn12Hours = (timestamp: number): boolean => {
    timestamp = timestamp * 1000;
    const now = new Date();
    const difference = timestamp - Math.floor(now.getTime() / 60 / 60 / 1000);
    const a = difference > 0 && difference <= 12;
    return a;
  };

  const cancelReservation = async () => {
    setCancelButtonLoading(true);

    window.confirm('Are you sure you want to cancel your reservation?') &&
      (await reservationApi
        .deleteReservation(reservationId ?? '')
        .then(() => {
          successAlert('Reservation canceled!');
          setReservation(undefined);
          setShowReservation(false);
        })
        .catch(() => {
          errorAlert('Something went wrong canceling your reservation');
        }));
    setCancelButtonLoading(false);
  };

  const confirmReservation = async () => {
    setConfirmButtonLoading(true);
    await reservationApi
      .putReservation(
        { confirmed: true },
        reservation?.id ?? '',
        confirmationToken ?? '',
      )
      .then(r => {
        successAlert('Reservation confirmed!');
        setReservation(r);
      })
      .catch(() => {
        errorAlert('Something went wrong confirming your reservation');
      });
    setConfirmButtonLoading(false);
  };

  const errorAlert = (title: string) => {
    setAlert({
      severity: 'error',
      title: title,
      body: 'please try again later',
    });
    setShowAlert(true);
  };

  const successAlert = (title: string) => {
    setAlert({ severity: 'success', title: title });
    setShowAlert(true);
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        gap={8}
        sx={{
          backgroundColor: '#5e81ac5b',
          padding: '60px',
          alignSelf: 'center',
          margin: 'auto 0',
        }}
      >
        <Grid container item xs={5}>
          <Stack spacing={3}>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Typography variant='h4' sx={{ color: 'primary.contrastText' }}>
                Your Reservation
              </Typography>
              {showReservation && reservation && (
                <Tooltip title='You will recieve an email with a confirmation link 24 hours before your reservation'>
                  {reservation.confirmed ? (
                    <Chip
                      icon={<CheckIcon />}
                      label='Confirmed'
                      color='success'
                    />
                  ) : (
                    <Chip
                      icon={<CloseIcon />}
                      label='Not Confirmed'
                      color='error'
                    />
                  )}
                </Tooltip>
              )}
            </Stack>
            <Box
              component='img'
              sx={{
                width: '80%',
              }}
              alt='Eistbären logo'
              src='/logo-big.png'
            />
          </Stack>
        </Grid>
        <Grid
          container
          item
          marginTop={-2}
          xs={6}
          spacing={2}
          alignContent='center'
          gap={2}
        >
          <Grid item xs={12}>
            <Collapse in={showAlert}>
              <Alert
                severity={alert?.severity}
                style={{ marginBottom: '5px' }}
                onClose={
                  showReservation ? () => setShowAlert(false) : undefined
                }
                sx={{ boxShadow: 5 }}
              >
                <AlertTitle>{alert?.title}</AlertTitle>
                {alert?.body}
              </Alert>
            </Collapse>
          </Grid>
          {showReservation && (
            <Grid item xs={12}>
              <RestaurantCardSideways
                restaurant={restaurant}
                numberOfSeats={numberOfSeats}
                onClick={() => setDetailModalOpen(true)}
              />
            </Grid>
          )}
          {showReservation &&
            (reservation ? (
              <>
                <Grid container item spacing={2}>
                  <Grid item xs={3}>
                    <TimePicker
                      label='From'
                      onChange={() => {
                        return;
                      }}
                      readOnly
                      value={(reservation?.time?.from ?? 0) * 1000}
                      renderInput={params => (
                        <TextField {...params} size='small' disabled />
                      )}
                      ampm={false}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TimePicker
                      label='To'
                      value={(reservation?.time?.to ?? 0) * 1000}
                      readOnly
                      onChange={() => {
                        return;
                      }}
                      renderInput={params => (
                        <TextField {...params} size='small' disabled />
                      )}
                      ampm={false}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DatePicker
                      label='Date'
                      value={(reservation?.time?.from ?? 0) * 1000}
                      onChange={() => {
                        return;
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          size='small'
                          fullWidth
                          disabled
                        />
                      )}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm>
                  <TextField
                    label='Name'
                    id='nameInput'
                    defaultValue={reservation?.userName}
                    type='text'
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled
                    fullWidth
                    size='small'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Email'
                    id='emailInput'
                    defaultValue={reservation?.userEmail}
                    type='email'
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled
                    fullWidth
                    size='small'
                  />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  {!reservation.confirmed && confirmationToken && (
                    <Grid item xs>
                      <LoadingButton
                        variant='contained'
                        color='success'
                        size='large'
                        sx={{ boxShadow: 3, color: 'white' }}
                        onClick={() => confirmReservation()}
                        loading={isConfirmButtonLoading}
                        disabled={isCancelButtonLoading}
                        fullWidth
                      >
                        Confirm
                      </LoadingButton>
                    </Grid>
                  )}
                  {!isIn12Hours(reservation.time?.from ?? 0) && (
                    <Grid item xs>
                      <LoadingButton
                        variant='contained'
                        color='error'
                        size='large'
                        sx={{ boxShadow: 3, color: 'white' }}
                        onClick={() => cancelReservation()}
                        loading={isCancelButtonLoading}
                        disabled={isConfirmButtonLoading}
                        fullWidth
                      >
                        Cancel
                      </LoadingButton>
                    </Grid>
                  )}
                  <Grid item xs>
                    <Button
                      variant='contained'
                      color='primary'
                      size='large'
                      href={`${configuration.basePath}/reservation/${reservation.id}/ics`}
                      target='_blank'
                      rel='noreferrer'
                      sx={{ boxShadow: 5 }}
                      download
                      fullWidth
                    >
                      ICS File
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid container item spacing={2}>
                  <Grid item xs={3}>
                    <Skeleton variant='rectangular' height={40} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton variant='rectangular' height={40} />
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant='rectangular' height={40} />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Skeleton variant='rectangular' height={40} />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton variant='rectangular' height={40} />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton variant='rectangular' height={40} />
                </Grid>
              </>
            ))}
        </Grid>
      </Grid>
      {restaurant && (
        <RestaurantDetailsModal
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          restaurant={restaurant}
          hideReservationButton={true}
        ></RestaurantDetailsModal>
      )}
    </>
  );
}
