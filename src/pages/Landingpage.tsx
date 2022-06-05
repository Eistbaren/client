import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from '@mui/material';
import { CalendarPicker, TimePicker } from '@mui/x-date-pickers';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useState } from 'react';

import '../css/Landingpage.css';
/**
 * Landingpage component
 * @return {JSX.Element}
 */
export default function Landingpage() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [timePickerFromValue, setTimePickerFromValue] = useState<Date | null>(
    null,
  );
  const [timePickerToValue, setTimePickerToValue] = useState<Date | null>(null);
  const [numberOfPersons, setNumberOfPersons] = useState<string | null>('1');

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <p className='label'>Pick a date & time</p>
          <CalendarPicker
            openTo='day'
            date={value}
            onChange={value => setValue(value)}
            disablePast
            views={['day']}
            className='calendar-picker'
          />
          <div className='time-picker-container'>
            <TimePicker
              value={timePickerFromValue}
              onChange={value => setTimePickerFromValue(value)}
              renderInput={params => (
                <TextField {...params} label='Start time' />
              )}
              minutesStep={30}
              views={['hours', 'minutes']}
              ampm={false}
            />
            <TimePicker
              value={timePickerToValue}
              onChange={value => setTimePickerToValue(value)}
              renderInput={params => <TextField {...params} label='End time' />}
              minutesStep={30}
              views={['hours', 'minutes']}
              ampm={false}
            />
          </div>
        </LocalizationProvider>
        <div className='background-image'></div>
        <div className='social-icons'>
          <InstagramIcon fontSize='large' className='social-icon' />
          <FacebookIcon fontSize='large' className='social-icon' />
          <LanguageIcon fontSize='large' className='social-icon' />
        </div>
      </div>
    </div>
  );
}
