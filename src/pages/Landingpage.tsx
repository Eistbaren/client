import { Button, Stack } from '@mui/material';
import { CalendarPicker } from '@mui/x-date-pickers';

import { Context } from '../data/Context';
import { useContext, useState } from 'react';

import NumberOfPersonsPicker from '../components/NumberOfPersonsPicker';
import FloatingSidebar from '../components/FloatingSidebar';

import '../css/Landingpage.css';
import QueryTimeslotTimePicker from '../components/QueryTimeslotTimePicker';
import { Link as RouterLink } from 'react-router-dom';
import ImprintModal from '../components/ImprintModal';

import { useNavigate } from 'react-router-dom';

/**
 * Landingpage
 * @return {JSX.Element}
 */
export default function Landingpage() {
  const { query, setQuery } = useContext(Context);

  const [imprintModalOpen, setImprintModalOpen] = useState(false);

  const [invalidFromDate, setInvalidFromDate] = useState(false);
  const [invalidToDate, setInvaliToDate] = useState(false);

  const navigate = useNavigate();

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
    <>
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
          <Button
            variant='contained'
            color='primary'
            size='large'
            sx={{ boxShadow: 3 }}
            disabled={invalidFromDate || invalidToDate}
            onClick={() => navigate('/search')}
          >
            Find a table
          </Button>
        </div>
        <div className='hero-image-container'>
          <p className='label'>Number of Persons</p>
          <NumberOfPersonsPicker
            numberOfPersons={query.numberVisitors}
            setNumberOfPersons={newNumberOfVisiors =>
              setQuery({ ...query, numberVisitors: newNumberOfVisiors })
            }
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
              invalidDate={invalidFromDate}
              setInvalidDate={setInvalidFromDate}
              label='Start time'
              timestampToChoose='from'
            />
            <QueryTimeslotTimePicker
              query={query}
              setQuery={setQuery}
              invalidDate={invalidToDate}
              setInvalidDate={setInvaliToDate}
              label='End time'
              timestampToChoose='to'
              minTime={(query.time?.from ?? 0) + 60 * 30}
            />
          </div>
          <div className='background-image'></div>
          <FloatingSidebar onImprintClicked={() => setImprintModalOpen(true)} />
        </div>
      </div>
      <ImprintModal
        open={imprintModalOpen}
        onClose={() => setImprintModalOpen(false)}
      />
    </>
  );
}
