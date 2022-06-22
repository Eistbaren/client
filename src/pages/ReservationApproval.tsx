import { Button, Stack, TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

import { useState } from 'react';
import '../css/ReservationApproval.css';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
export default function ReservationApproval() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [timePickerFromValue, setTimePickerFromValue] = useState<Date | null>(
    null,
  );
  const [timePickerToValue, setTimePickerToValue] = useState<Date | null>(null);
  const [numberOfPersons, setNumberOfPersons] = useState<string | null>('1');
  const [name, setName] = useState<string>('Jakob Mayerhofer');
  const [email, setEmail] = useState<string>(
    'jakob.mayerhofer@eist-ist-toll.de',
  );

  return (
    <>
      <div className='booking-summary-container'>
        <h3>Reservation summary</h3>
        <div className='booking-summary-date_person-container'>
          <div>
            <p className='booking-summary-label'>Date</p>
            <DatePicker
              value={value}
              onChange={e => {
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
              value={numberOfPersons}
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
            onChange={e => {
              return;
            }}
            readOnly
            value={timePickerFromValue}
            renderInput={params => <TextField {...params} size='small' />}
            ampm={false}
          />
          <TimePicker
            value={timePickerToValue}
            readOnly
            onChange={e => {
              return;
            }}
            renderInput={params => <TextField {...params} size='small' />}
            ampm={false}
          />
        </div>

        <p className='booking-summary-label'>Name</p>
        <TextField
          id='nameInput'
          value={name}
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
          value={email}
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
          <Button
            variant='contained'
            color='success'
            size='large'
            sx={{ boxShadow: 3, color: 'white' }}
          >
            Accept Reservation
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
    </>
  );
}
