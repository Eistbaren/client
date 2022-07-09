import {
  TextField,
  Collapse,
  Alert,
  AlertColor,
  IconButton,
  AlertTitle,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

import '../css/PersonalData.css';
import { Context } from '../data/Context';

import CloseIcon from '@mui/icons-material/Close';

/**
 * Personal Data Page
 * @return {JSX.Element}
 */
export default function PersonalData() {
  const {
    reservationCreationRequest,
    setReservationCreationRequest,
    reservationApi,
  } = useContext(Context);

  const [formErrors, setFormErrors] = useState({
    userName: true,
    userEmail: true,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    severity?: AlertColor;
    title?: string;
    body?: string;
  }>();
  const navigate = useNavigate();

  const emailRegex = /^\S+@\S+\.\S+$/g;
  const nameRegex = /^\S+ .+$/g;

  // reavlidate form fields on changes
  useEffect(() => {
    setFormErrors({
      userName: !reservationCreationRequest.userName?.match(nameRegex),
      userEmail: !reservationCreationRequest.userEmail?.match(emailRegex),
    });
    console.log('test');
  }, [reservationCreationRequest]);

  // handles submitting the form
  const handleSubmit = () => {
    if (!submitted) {
      setSubmitted(true);
    }

    for (const error of Object.values(formErrors)) {
      if (error) return;
    }

    // await call api call and navigate on success
    setIsLoading(true);
    reservationApi
      .createReservation(reservationCreationRequest)
      .then(reservation => {
        navigate(`/reservation-details/${reservation.id}`);
      })
      .catch(e => {
        console.log(`Error creating reservation: ${e}`);
        if (e instanceof Response) {
          e.json().then(j => {
            if ((j.status as number) === 400) {
              errorAlert(
                j.message,
                'Plase check your provided data and try again.',
              );
            } else {
              errorAlert();
            }
          });
        }
        setShowAlert(true);
      })
      .finally(() => setIsLoading(false));
  };

  const errorAlert = (title?: string, body?: string) => {
    setAlert({
      severity: 'error',
      title: title,
      body: body,
    });
    setShowAlert(true);
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
        <img src='/logo-big.png' className='personal-data-image' />
      </div>
      <form className='personal-data-form'>
        <Collapse in={showAlert}>
          <Alert
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  return setShowAlert(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            severity={alert?.severity}
            variant='outlined'
            sx={{ mb: 2 }}
          >
            <AlertTitle>{alert?.title ?? 'An error occured!'}</AlertTitle>
            {alert?.body ??
              'Your reservation could not be completed! Please try again later.'}
          </Alert>
        </Collapse>

        <TextField
          id='nameInput'
          value={reservationCreationRequest.userName ?? ''}
          onChange={e => {
            setReservationCreationRequest({
              ...reservationCreationRequest,
              userName: e.target.value,
            });
          }}
          type='text'
          label='Name'
          disabled={isLoading}
          error={formErrors.userName && submitted}
          helperText={
            formErrors.userName && submitted
              ? 'Please enter your first and last name'
              : ''
          }
        />

        <TextField
          id='emailInput'
          value={reservationCreationRequest.userEmail ?? ''}
          onChange={e => {
            setReservationCreationRequest({
              ...reservationCreationRequest,
              userEmail: e.target.value,
            });
          }}
          type='email'
          label='Email'
          disabled={isLoading}
          error={formErrors.userEmail && submitted}
          helperText={
            formErrors.userEmail && submitted ? 'Email adress not valid' : ''
          }
          onKeyUp={e => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />

        <LoadingButton
          variant='contained'
          size='large'
          onClick={handleSubmit}
          loading={isLoading}
        >
          Submit
        </LoadingButton>
      </form>
    </div>
  );
}
