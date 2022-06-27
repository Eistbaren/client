import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { userInfo } from 'os';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/PersonalData.css';
import { Context } from '../data/Context';

/**
 * Personal Data Page
 * @return {JSX.Element}
 */
export default function PersonalData() {
  const { reservation, setReservation } = useContext(Context);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

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
    setReservation({
      ...reservation,
      userEmail: e.target.value,
    });
  };

  // handles submitting the form
  const handleSubmit = () => {
    if (!submitted) {
      setSubmitted(true);
    }
    if (!reservation.userEmail?.match(/^([a-z]|-|\.)+@([a-z]|-)+\.[a-z]+$/g)) {
      setEmailError(true);
    } else {
      // await call api call
      navigate('/reservation-approval');
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
          value={reservation.userName ?? ''}
          onChange={e =>
            setReservation({ ...reservation, userName: e.target.value })
          }
          type='text'
          label='Name'
        />
        <TextField
          id='emailInput'
          value={reservation.userEmail ?? ''}
          onChange={handleEmailInput}
          type='email'
          error={emailError}
          helperText={emailError ? 'Email adress not valid' : ''}
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
