import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Tooltip,
  IconButton,
} from '@mui/material';
import { CalendarPicker, TimePicker } from '@mui/x-date-pickers';
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';

import { ReservationContext } from '../data/ReservationContext';
import { useContext, useState } from 'react';

import '../css/Landingpage.css';
import { ReservationContextType } from '../data/ReservationDataInterface';
import { Console } from 'console';
/**
 * Landingpage component
 * @return {JSX.Element}
 */
export default function Landingpage() {
  const { reservation, setReservation } = useContext(
    ReservationContext,
  ) as ReservationContextType;

  const [numberOfPersons, setNumberOfPersons] = useState<string | null>('1');

  /**
   * @param  {Date} value
   * @param {Date} date
   */
  function handleTimeInput(value: Date | null, date: Date | null) {
    reservation.time.from?.setHours(value ? date!.getHours() : 0);
    reservation.time.from?.setMinutes(value ? date!.getMinutes() : 0);
    console.log(date);
  }

  /**
   * @param  {Date} value
   */
  function handleDateInput(value: Date) {
    reservation.time.from?.setDate(value.getDate());
    reservation.time.to?.setDate(value.getDate());
    console.log(reservation.time.from);
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
        <ToggleButtonGroup
          value={numberOfPersons}
          exclusive
          onChange={(e, person) => setNumberOfPersons(person)}
        >
          <ToggleButton value='1'>1</ToggleButton>
          <ToggleButton value='2'>2</ToggleButton>
          <ToggleButton value='3'>3</ToggleButton>
          <ToggleButton value='4'>4</ToggleButton>
          <ToggleButton value='5'>5</ToggleButton>
          <ToggleButton value='6'>6</ToggleButton>
        </ToggleButtonGroup>
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
            onChange={value => handleTimeInput(value, reservation.time.from)}
            renderInput={params => <TextField {...params} label='Start time' />}
            minutesStep={30}
            views={['hours', 'minutes']}
            ampm={false}
          />
          <TimePicker
            value={reservation.time.to}
            onChange={value => handleTimeInput(value, reservation.time.to)}
            renderInput={params => <TextField {...params} label='End time' />}
            minutesStep={30}
            views={['hours', 'minutes']}
            ampm={false}
          />
        </div>
        <div className='background-image'></div>
        <div className='social-icons'>
          <Tooltip title='Imprint' placement='right' arrow>
            <IconButton>
              <InfoIcon fontSize='large' className='social-icon' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Documentation' placement='right' arrow>
            <IconButton>
              <BookIcon fontSize='large' className='social-icon' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
