import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useState } from 'react';
/**
 * Landingpage component
 * @return {JSX.Element}
 */
export default function Landingpage() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <>
      <Button variant='contained'>1</Button>
      <Button variant='contained'>2</Button>
      <Button variant='contained'>3</Button>
      <Button variant='contained'>4</Button>
      <Button variant='contained'>5</Button>
      <Button variant='contained'>6</Button>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          onChange={value => setValue(value)}
          renderInput={params => <TextField {...params} />}
        ></DatePicker>
      </LocalizationProvider>
      <Button variant='contained'>CONFIRM</Button>
    </>
  );
}
