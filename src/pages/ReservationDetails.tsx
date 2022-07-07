import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import '../css/ReservationDetails.css';
import { Reservation } from '../data';
import { Context } from '../data/Context';

/**
 * Reservation Approval Page
 * @return {JSX.Element}
 */
export default function ReservationApproval() {
  // gets reservationId from the URL params
  const { reservationId } = useParams();
  const [searchParams] = useSearchParams();
  const confirmationToken = searchParams.get('confirmationToken');

  const [reservation, setReservation] = useState<Reservation>();
  const [error, setError] = useState<string>();
  const [confirmationButtonText, setConfirmationButtonText] = useState<string>(
    'Confirm Reservation',
  );
  const [cancelButtonText, setCancelButtonText] =
    useState<string>('Cancel Reservation');

  const { reservationApi } = useContext(Context);
  useEffect(() => {
    reservationApi
      .getReservation(reservationId ?? '0')
      .then(val => {
        setReservation(val);
      })
      .catch(e => {
        if (e instanceof Response) {
          e.json().then(j =>
            (j.message as string).startsWith('Unable to find')
              ? setError('Reservation not found!')
              : setError(''),
          );
        }
      });
  }, []);

  const isIn12Hours = (timestamp: number): boolean => {
    const now = new Date();
    const difference = (timestamp - now.getTime()) * 60 * 60 * 1000;
    if (difference > 0 && difference <= 12) {
      return true;
    }
    return false;
  };

  const cancelReservation = async () => {
    setCancelButtonText('...');
    window.confirm('Are you sure you want to cancel your reservation?') &&
      reservationApi
        .deleteReservation(reservationId ?? '')
        .then(() => {
          setCancelButtonText('Reservation canceled!');
        })
        .catch(() => {
          setCancelButtonText('Something went wrong!');
          setError('Something went wrong canceling your reservation');
        });
  };

  const confirmReservation = async () => {
    setConfirmationButtonText('...');
    await reservationApi
      .putReservation(
        { confirmed: true },
        reservation?.id ?? '',
        confirmationToken ?? '',
      )
      .then(() => {
        setConfirmationButtonText('reservation confirmed!');
        reservation !== undefined ? (reservation.confirmed = true) : null;
      })
      .catch(() => {
        setConfirmationButtonText('Something went wrong!');
        setError('Something went wrong confirming your reservation');
      });
  };

  return (
    <>
      {error ? (
        error !== '' ? (
          <Alert severity='error' style={{ margin: '30px' }}>
            <AlertTitle>{error}</AlertTitle>
            Please try again later
          </Alert>
        ) : (
          <Alert severity='error' style={{ margin: '30px' }}>
            <AlertTitle>Holy Guacamole!</AlertTitle>
            Something went wrong —{' '}
            <strong>please contact the server administrator</strong>
          </Alert>
        )
      ) : null}
      <div className='booking-summary-container'>
        <div className='booking-summary-header'>
          <h3>Reservation summary</h3>
          {reservation ? (
            <Tooltip title='24 hours before your reservation you can confirm it!'>
              {reservation.confirmed ? (
                <Chip icon={<CheckIcon />} label='Confirmed' color='success' />
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
        <div className='booking-summary-date_person-container'>
          <div>
            <p className='booking-summary-label'>Date</p>
            {reservation ? (
              <DatePicker
                value={reservation?.time?.from ?? null}
                onChange={() => {
                  return;
                }}
                renderInput={params => (
                  <TextField {...params} size='small' fullWidth disabled />
                )}
                disabled={true}
              />
            ) : (
              <Skeleton variant='rectangular' height={25} />
            )}
          </div>
          {/* TODO */}
          <div>
            <p className='booking-summary-label'># of persons</p>
            {reservation ? (
              <TextField
                id='outlined-number'
                type='number'
                defaultValue={2}
                InputProps={{
                  readOnly: true,
                }}
                size='small'
                disabled
              />
            ) : (
              <Skeleton variant='rectangular' height={25} />
            )}
          </div>
        </div>

        <p className='booking-summary-label'>Time</p>

        {reservation ? (
          <div className='booking-summary-time-picker-container'>
            <TimePicker
              onChange={() => {
                return;
              }}
              readOnly
              value={reservation.time?.from ?? null}
              renderInput={params => (
                <TextField {...params} size='small' disabled />
              )}
              ampm={false}
            />

            <TimePicker
              value={reservation.time?.to ?? null}
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
        ) : (
          <div className='booking-summary-time-picker-container'>
            <Skeleton variant='rectangular' width={241} height={25} />
            <Skeleton variant='rectangular' width={241} height={25} />
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
            <Button
              variant='contained'
              color='success'
              size='large'
              sx={{ boxShadow: 3, color: 'white' }}
              onClick={() => confirmReservation()}
            >
              {confirmationButtonText}
            </Button>
          )}
          {reservation &&
            !reservation.confirmed &&
            !isIn12Hours(reservation.time?.from ?? 0) && (
              <Button
                variant='contained'
                color='error'
                size='large'
                sx={{ boxShadow: 3, color: 'white' }}
                onClick={() => cancelReservation()}
              >
                {cancelButtonText}
              </Button>
            )}
          {reservation && (
            <Button
              variant='outlined'
              color='secondary'
              size='large'
              href={`https://reservation-bear.de/api/reservation/${reservation.id}/ics`}
              target='_blank'
              rel='noreferrer'
              sx={{ boxShadow: 3 }}
              download
            >
              Download ICS File
            </Button>
          )}
        </Stack>
      </div>
    </>
  );
  /* } */
}
