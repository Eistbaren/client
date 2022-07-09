import { Button, Stack } from '@mui/material';
import { CalendarPicker } from '@mui/x-date-pickers';

import { Context } from '../data/Context';
import { useContext, useState } from 'react';

import NumberOfPersonsPicker from '../components/NumberOfPersonsPicker';
import FloatingSidebar from '../components/FloatingSidebar';

import '../css/Landingpage.css';
import QueryTimeslotTimePicker from '../components/QueryTimeslotTimePicker';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Landingpage
 * @return {JSX.Element}
 */
export default function Landingpage() {
  const { query, setQuery } = useContext(Context);
  const [numberOfPersons, setNumberOfPersons] = useState<number>(2);

  /**
   * Sets the date for both times
   * @param  {Date} value
   */
  function handleDateInput(value: Date | null) {
    if (value === null) return;
    const from = new Date((query.time?.from ?? 0) * 1000);
    const to = new Date((query.time?.to ?? 0) * 1000);
    from.setDate(value.getDate());
    from.setMonth(value.getMonth());
    from.setFullYear(value.getFullYear());
    to.setDate(value.getDate());
    to.setMonth(value.getMonth());
    to.setFullYear(value.getFullYear());

    setQuery({
      ...query,
      time: {
        from: Math.floor(from.valueOf() / 1000),
        to: Math.floor(to.valueOf() / 1000),
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
          <RouterLink
            to='/search'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button
              variant='contained'
              color='primary'
              size='large'
              sx={{ boxShadow: 3 }}
            >
              Book a table
            </Button>
          </RouterLink>
          <RouterLink
            to='/search'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button
              variant='outlined'
              color='secondary'
              size='large'
              sx={{ boxShadow: 14 }}
            >
              Start browsing
            </Button>
          </RouterLink>
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
          date={new Date((query.time?.from ?? 0) * 1000)}
          onChange={handleDateInput}
          disablePast
          views={['day']}
          className='calendar-picker'
        />
        <div className='time-picker-container'>
          <QueryTimeslotTimePicker
            query={query}
            setQuery={setQuery}
            label='Start time'
            timestampToChoose='from'
          />
          <QueryTimeslotTimePicker
            query={query}
            setQuery={setQuery}
            label='End time'
            timestampToChoose='to'
            minTime={(query.time?.from ?? 0) + 60 * 30}
          />
        </div>
        <div className='background-image'></div>
        <FloatingSidebar />
      </div>
    </div>
  );
}
