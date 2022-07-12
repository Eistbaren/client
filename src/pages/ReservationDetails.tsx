import {
  Alert,
  AlertColor,
  AlertTitle,
  Button,
  Chip,
  Collapse,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from '@mui/lab/LoadingButton';
import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import '../css/ReservationDetails.css';
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
      <div className='personal-data-container'>
        <div className='personal-data-body'>
          <h1>Your Reservation</h1>
          <p>
            <RestaurantCardSideways
              restaurant={restaurant}
              numberOfSeats={numberOfSeats}
              onClick={() => setDetailModalOpen(true)}
            />
          </p>
          <img src='/logo-big.png' className='personal-data-image' />
        </div>
        <form className='personal-data-form'>
          <div className='booking-summary-container'>
            <div className='booking-summary-header'>
              <h3>Reservation summary</h3>
              {reservation ? (
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
              ) : null}
            </div>
            <Collapse in={showAlert}>
              <Alert
                severity={alert?.severity}
                style={{ marginBottom: '10px', marginTop: '10px' }}
                variant='outlined'
                onClose={
                  showReservation ? () => setShowAlert(false) : undefined
                }
              >
                <AlertTitle>{alert?.title}</AlertTitle>
                {alert?.body}
              </Alert>
            </Collapse>
            {showReservation ? (
              <>
                {reservation ? (
                  <div className='booking-summary-date-time-container'>
                    <div style={{ width: '40%' }}>
                      <p className='booking-summary-label'>From</p>
                      <TimePicker
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
                    </div>
                    <div style={{ width: '40%' }}>
                      <p className='booking-summary-label'>To</p>
                      <TimePicker
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
                    </div>
                    <div>
                      <p className='booking-summary-label'>Date</p>
                      <DatePicker
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
                        disabled={true}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='booking-summary-date-time-container'>
                    <div style={{ width: '30%' }}>
                      <p className='booking-summary-label'>From</p>
                      <Skeleton variant='rectangular' height={25} />
                    </div>
                    <div style={{ width: '30%' }}>
                      <p className='booking-summary-label'>To</p>
                      <Skeleton variant='rectangular' height={25} />
                    </div>
                    <div style={{ width: '40%' }}>
                      <p className='booking-summary-label'>Date</p>
                      <Skeleton variant='rectangular' height={25} />
                    </div>
                  </div>
                )}

                <p className='booking-summary-label'>Name</p>
                {reservation ? (
                  <TextField
                    id='nameInput'
                    defaultValue={reservation?.userName}
                    type='text'
                    InputProps={{
                      readOnly: true,
                    }}
                    size='small'
                    disabled
                  />
                ) : (
                  <Skeleton variant='rectangular' height={25} />
                )}

                <p className='booking-summary-label'>Email</p>
                {reservation ? (
                  <TextField
                    id='emailInput'
                    defaultValue={reservation?.userEmail}
                    type='email'
                    InputProps={{
                      readOnly: true,
                    }}
                    size='small'
                    disabled
                  />
                ) : (
                  <Skeleton variant='rectangular' height={25} />
                )}

                <Stack
                  direction='column'
                  spacing={2}
                  className='booking-summary-cta-container'
                >
                  {reservation && !reservation.confirmed && confirmationToken && (
                    <LoadingButton
                      variant='contained'
                      color='success'
                      size='large'
                      sx={{ boxShadow: 3, color: 'white' }}
                      onClick={() => confirmReservation()}
                      loading={isConfirmButtonLoading}
                      disabled={isCancelButtonLoading}
                    >
                      Confirm Reservation
                    </LoadingButton>
                  )}
                  {reservation && !isIn12Hours(reservation.time?.from ?? 0) && (
                    <LoadingButton
                      variant='contained'
                      color='error'
                      size='large'
                      sx={{ boxShadow: 3, color: 'white' }}
                      onClick={() => cancelReservation()}
                      loading={isCancelButtonLoading}
                      disabled={isConfirmButtonLoading}
                    >
                      Cancel Reservation
                    </LoadingButton>
                  )}
                  {reservation && (
                    <Button
                      variant='outlined'
                      color='secondary'
                      size='large'
                      href={`${configuration.basePath}/reservation/${reservation.id}/ics`}
                      target='_blank'
                      rel='noreferrer'
                      sx={{ boxShadow: 3 }}
                      download
                    >
                      Download ICS File
                    </Button>
                  )}
                </Stack>
              </>
            ) : null}
          </div>
        </form>
      </div>
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
