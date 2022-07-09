import React from 'react';
import { Button, Menu, MenuItem, Slider, TextField } from '@mui/material';
import EditLocationIcon from '@mui/icons-material/EditLocation';

import { GeographicCoordinates } from '../data';

/**
 * LocationDropdown
 * @param {number} props
 * @return {JSX.Element}
 */
export default function LocationDropdown(props: {
  location: GeographicCoordinates | undefined;
  setLocation: (coords: GeographicCoordinates) => void;
  radius: number | undefined;
  setRadius: (range: number) => void;
  disabled: boolean;
}) {
  const { location, setLocation, radius, setRadius, disabled } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const valuetext = (value: number) => {
    return `${value} km`;
  };

  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  const changeLocation = () => {
    const loc: GeographicCoordinates = { lon: undefined, lat: undefined };
    setLocation(loc);
    handleClose();
  };

  return (
    <div>
      <TextField
        id='outlined-read-only-input'
        label='Location & Radius'
        value={
          location === undefined
            ? `Choosing...; ${radius} km`
            : `${location.lat?.toFixed(1)}°, ${location.lon?.toFixed(
                1,
              )}°; ${radius}km`
        }
        InputProps={{
          readOnly: true,
        }}
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        disabled={disabled}
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
          <Button
            variant='outlined'
            onClick={changeLocation}
            startIcon={<EditLocationIcon />}
            disabled={disabled}
          >
            Change center
          </Button>
        </MenuItem>
        <MenuItem>
          <Slider
            aria-label='Range'
            value={radius}
            onChange={handleRangeChange}
            getAriaValueText={valuetext}
            valueLabelDisplay='auto'
            step={1}
            min={1}
            max={50}
            disabled={disabled}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
