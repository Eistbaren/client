import { Button, TextField, Stack } from '@mui/material';
import { CalendarPicker, TimePicker } from '@mui/x-date-pickers';

import { ReservationContext } from '../data/ReservationContext';
import { useContext, useState } from 'react';

import NumberOfPersonsPicker from '../components/NumberOfPersonsPicker';
import FloatingSidebar from '../components/FloatingSidebar';

import '../css/Landingpage.css';

/**
 * Landingpage
 * @return {JSX.Element}
 */
export default function Landingpage() {
  const { reservation, setReservation } = useContext(ReservationContext);
  const [numberOfPersons, setNumberOfPersons] = useState<number>(2);

  /**
   * Sets the reservation.time.from time to the new time
   * @param  {Date} value
   */
  function handleTimeFromInput(value: Date | null) {
    const newDate = new Date(reservation.time.from);
    newDate.setHours(value ? value!.getHours() : 0);
    newDate.setMinutes(value ? value!.getMinutes() : 0);
    setReservation({
      ...reservation,
      time: {
        from: newDate,
        to: reservation.time.to,
      },
    });
  }

  /**
   * Sets the reservation.time.to time to the new time
   * @param  {Date} value
   */
  function handleTimeToInput(value: Date | null) {
    const newDate = new Date(reservation.time.to);
    newDate.setHours(value ? value!.getHours() : 0);
    newDate.setMinutes(value ? value!.getMinutes() : 0);
    setReservation({
      ...reservation,
      time: {
        from: reservation.time.from,
        to: newDate,
      },
    });
  }

  /**
   * Sets the date for both times
   * @param  {Date} value
   */
  function handleDateInput(value: Date) {
    const from = new Date(reservation.time.from);
    const to = new Date(reservation.time.to);
    from.setDate(value.getDate());
    to.setDate(value.getDate());
    setReservation({
      ...reservation,
      time: {
        from: from,
        to: to,
      },
    });
  }

  return (
    <div className='hero-container'>
      <div className='hero-content'>
        <h1 className='hero-heading'>
          Book your next
          <br />
          culinary adventure
        </h1>
        <p className='hero-subheading'>
          Experience the very best from thousands of different cuisines!
        </p>
        <Stack direction='row' spacing={2}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            sx={{ boxShadow: 3 }}
          >
            Book a table
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            size='large'
            sx={{ boxShadow: 14 }}
          >
            Start browsing
          </Button>
        </Stack>
      </div>
      <div className='hero-image-container'>
        <p className='label'>Number of Persons</p>
        <NumberOfPersonsPicker
          numberOfPersons={numberOfPersons}
          setNumberOfPersons={setNumberOfPersons}
        />
        <p className='label'>Pick a date & time</p>
        <CalendarPicker
          openTo='day'
          date={reservation.time.from}
          onChange={value => (value ? handleDateInput(value) : null)}
          disablePast
          views={['day']}
          className='calendar-picker'
        />
        <div className='time-picker-container'>
          <TimePicker
            value={reservation.time.from}
            onChange={value => handleTimeFromInput(value)}
            renderInput={params => <TextField {...params} label='Start time' />}
            minutesStep={30}
            views={['hours', 'minutes']}
            ampm={false}
          />
          <TimePicker
            value={reservation.time.to}
            onChange={value => handleTimeToInput(value)}
            renderInput={params => <TextField {...params} label='End time' />}
            minutesStep={30}
            views={['hours', 'minutes']}
            ampm={false}
          />
        </div>
        <div className='background-image'></div>
        <FloatingSidebar />
      </div>
    </div>
  );
}
