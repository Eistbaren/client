import React from 'react';
import { Button, Menu, MenuItem, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { timeslotToText, timeslotToDate } from './TimeslotText';

import { Timeslot } from '../data';

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

  const value = `${timeslotToText(timeslot)} ${timeslotToDate(
    timeslot,
  )} ${numberOfVisitors} ${
    (numberOfVisitors ?? 1) > 1 ? 'visitors' : 'visitor'
  }`;

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
        <MenuItem>
          <Typography>
            To change this, you need
            <br />
            to go one step back
          </Typography>
        </MenuItem>
        <MenuItem>
          <Button variant='outlined' onClick={changeTimeDatePeople}>
            Go back
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}
