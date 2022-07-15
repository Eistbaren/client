import React from 'react';
import { Button, Menu, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { timeslotToText, timeslotToDate } from './TimeslotText';

import { Timeslot } from '../data';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

/**
 * TimeDatePeopleDropdown
 * @param {number} props
 * @return {JSX.Element}
 */
export default function TimeDatePeopleDropdown(props: {
  timeslot: Timeslot | undefined;
  numberOfVisitors: number | undefined;
}) {
  const { timeslot, numberOfVisitors } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const value = `${timeslotToText(timeslot)} | ${timeslotToDate(timeslot)} | ${
    numberOfVisitors ?? 1
  } ${(numberOfVisitors ?? 1) > 1 ? 'visitors' : 'visitor'}`;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeTimeDatePeople = () => {
    navigate('/');
  };

  return (
    <div>
      <TextField
        id='outlined-read-only-input'
        label='Time, Date & Visitors'
        value={value || ''}
        InputProps={{
          readOnly: true,
        }}
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        sx={{ width: '100%' }}
      />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div style={{ padding: '6px 16px', width: '100%' }}>
          <Typography>
            To change this, you need
            <br />
            to go one step back
          </Typography>
        </div>
        <div style={{ padding: '6px 16px', width: '100%' }}>
          <Button
            sx={{ width: '100%' }}
            variant='outlined'
            onClick={changeTimeDatePeople}
            startIcon={<ChevronLeftIcon />}
          >
            Go back
          </Button>
        </div>
      </Menu>
    </div>
  );
}
