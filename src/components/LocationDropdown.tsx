import React from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Slider,
  TextField,
} from '@mui/material';

import EditLocationIcon from '@mui/icons-material/EditLocation';
import ClearIcon from '@mui/icons-material/Clear';

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
  onClear: () => void;
}) {
  const { location, setLocation, radius, setRadius, disabled, onClear } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const noLocationDefined = location === undefined;
  const currentlyChoosingLocation =
    !noLocationDefined && location?.lon === undefined;

  const value = noLocationDefined
    ? undefined
    : currentlyChoosingLocation
    ? 'Choose...'
    : `${location.lat?.toFixed(1)}°, ${location.lon?.toFixed(1)}°; ${radius}km`;

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
        value={value || ''}
        InputProps={{
          readOnly: true,
          endAdornment: !noLocationDefined && !currentlyChoosingLocation && (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
                  onClear();
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
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
            disabled={disabled || currentlyChoosingLocation}
          >
            {noLocationDefined
              ? 'Choose center'
              : currentlyChoosingLocation
              ? 'Click the map'
              : 'Change center'}
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
            disabled={
              disabled || noLocationDefined || currentlyChoosingLocation
            }
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
