import { Button, Stack, TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';

import { useContext } from 'react';
import '../css/ReservationDetails.css';
import { Context } from '../data/Context';

/**
 * Reservation Approval Page
 * @return {JSX.Element}
 */
export default function ReservationApproval() {
  const { reservation } = useContext(Context);
  // gets reservationId from the URL params
  const { reservationId } = useParams();
  console.log(reservationId);

  /**
   * Checks if the given timestamp is tommorrow
   * @param {number} timestamp the unix timestamp from reservation.time.from
   * @return {boolean}
   */
  function isIn24Hours(timestamp: number): boolean {
    const now = new Date();
    const difference = (timestamp - now.getTime()) * 60 * 60 * 1000;
    if (difference > 0 && difference <= 24) {
      return true;
    }
    return false;
  }

  return (
    <div className='booking-summary-container'>
      <h3>Reservation summary</h3>
      <div className='booking-summary-date_person-container'>
        <div>
          <p className='booking-summary-label'>Date</p>
          <DatePicker
            value={reservation.time?.from ?? 0}
            onChange={() => {
              return;
            }}
            renderInput={params => (
              <TextField {...params} size='small' fullWidth />
            )}
          />
        </div>

        <div>
          <p className='booking-summary-label'># of persons</p>
          <TextField
            id='outlined-number'
            type='number'
            value={2}
            InputProps={{
              readOnly: true,
            }}
            size='small'
          />
        </div>
      </div>

      <p className='booking-summary-label'>Time</p>
      <div className='booking-summary-time-picker-container'>
        <TimePicker
          onChange={() => {
            return;
          }}
          readOnly
          value={reservation.time?.from ?? 0}
          renderInput={params => <TextField {...params} size='small' />}
          ampm={false}
        />
        <TimePicker
          value={reservation.time?.to ?? 0}
          readOnly
          onChange={() => {
            return;
          }}
          renderInput={params => <TextField {...params} size='small' />}
          ampm={false}
        />
      </div>

      <p className='booking-summary-label'>Name</p>
      <TextField
        id='nameInput'
        value={reservation.userName}
        type='text'
        InputProps={{
          readOnly: true,
        }}
        size='small'
      >
        Jakob Mayerhofer
      </TextField>

      <p className='booking-summary-label'>Email</p>
      <TextField
        id='emailInput'
        value={reservation.userEmail}
        type='email'
        InputProps={{
          readOnly: true,
        }}
        size='small'
      />

      <Stack
        direction='column'
        spacing={2}
        className='booking-summary-cta-container'
      >
        {isIn24Hours(reservation.time?.from ?? 0) && (
          <Button
            variant='contained'
            color='success'
            size='large'
            sx={{ boxShadow: 3, color: 'white' }}
          >
            Accept Reservation
          </Button>
        )}
        <Button
          variant='contained'
          color='error'
          size='large'
          sx={{ boxShadow: 3, color: 'white' }}
        >
          Cancel Reservation
        </Button>
        <Button
          LinkComponent='a'
          href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          variant='outlined'
          color='secondary'
          size='large'
          sx={{ boxShadow: 14 }}
        >
          Download ICS File
        </Button>
      </Stack>
    </div>
  );
}
