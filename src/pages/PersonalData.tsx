import {
  TextField,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useState } from 'react';

import '../css/PersonalData.css';

/**
 * Personal Data Page
 * @return {JSX.Element}
 */
export default function PersonalData() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // checks if input is submitted and a valid email
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      submitted &&
      !e.target.value?.match(/^([a-z]|-|\.)+@([a-z]|-)+\.[a-z]+$/g)
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(e.target.value);
  };

  // handles submitting the form
  const handleSubmit = () => {
    if (!submitted) {
      setSubmitted(true);
    }
    if (!email.match(/^([a-z]|-|\.)+@([a-z]|-)+\.[a-z]+$/g)) {
      setEmailError(true);
    } else {
      // call api call
    }
  };

  return (
    <div className='personal-data-container'>
      <div className='personal-data-body'>
        <h1>Nearly there!</h1>
        <p>
          Before you can taste your favourite dish, we need your contact
          information. This data will only be used for reference and approval of
          the reservation.
        </p>
        <img src='images/dish.png' className='personal-data-image' />
      </div>
      <form className='personal-data-form'>
        <TextField
          id='nameInput'
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          label='Name'
        />
        <TextField
          id='emailInput'
          value={email}
          onChange={handleEmailInput}
          type='email'
          error={emailError}
          helperText={emailError ? 'There is a mistake' : ''}
          label='Email'
        />
        <FormControlLabel
          label='I have read the terms and conditions of Eistbaeren'
          sx={{ color: 'white' }}
          control={<Checkbox disableRipple />}
        />

        <Button variant='contained' size='large' onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
