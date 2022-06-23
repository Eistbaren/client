import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../css/SearchPage.css';
import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import RestaurantDetailsModal from '../components/RestaurantDetailsModal';
import { Restaurant } from '../data/api';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
export default function SearchPage() {
  const filterFormItems = [
    {
      label: 'Type',
      options: ['Italian'],
    },
    {
      label: 'Price',
      options: ['€', '€€', '€€€'],
    },
    {
      label: 'Location & Distance',
      options: [],
    },
    {
      label: 'Rating',
      options: ['Medium', 'Good', 'Excellent'],
    },
    {
      label: 'Time',
      options: [],
    },
  ];

  const restaurants: Restaurant[] = [
    {
      id: 'bla',
      name: 'Restaurant',
      averageRating: 3,
      website: 'https://tum.de',
      images: [
        '/images/background_3.jpg',
        'images/hero.jpg',
        '/images/background_3.jpg',
        'images/hero.jpg',
      ],
      openingHours: {
        from: 36000, // 11:00
        to: 72000, // 21:00
      },
    },
    {
      id: 'bla1',
      name: 'Restaurant1',
      averageRating: 2,
      website: 'https://tum.de',
      images: [
        '/images/background_3.jpg',
        'images/hero.jpg',
        '/images/background_3.jpg',
        'images/hero.jpg',
      ],
      openingHours: {
        from: 36000, // 11:00
        to: 75600, // 22:00
      },
    },
    {
      id: 'bla2',
      name: 'Restaurant2',
      averageRating: 4,
      website: 'https://tum.de',
      images: [
        '/images/background_3.jpg',
        'images/hero.jpg',
        '/images/background_3.jpg',
        'images/hero.jpg',
      ],
      openingHours: {
        from: 36000, // 11:00
        to: 79200, // 23:00
      },
    },
  ];

  const [detailModalRestaurant, setDetailModalRestaurant] =
    React.useState<Restaurant>({
      id: '',
      name: '',
      averageRating: 0,
      website: '',
      images: [],
      openingHours: {
        from: 0,
        to: 0,
      },
    });
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);

  const openDetailModal = (restaurant: Restaurant) => {
    setDetailModalRestaurant(restaurant);
    setDetailModalOpen(true);
  };
  const handleDetailModalClose = () => setDetailModalOpen(false);

  return (
    <>
      <div className='search-container'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant='h4' component='div'>
              Search
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='Search for restaurants'
              fullWidth
            />
          </Grid>

          {filterFormItems.map((item, filterKey) => (
            <Grid item xs={2.4} key={filterKey}>
              <FormControl fullWidth>
                <InputLabel id={`filter-input-${filterKey}-label`}>
                  {item.label}
                </InputLabel>
                <Select
                  variant='outlined'
                  labelId={`filter-input-${filterKey}-label`}
                >
                  {item.options.map((option, optionKey) => (
                    <MenuItem
                      key={`filter-${filterKey}-option-${optionKey}`}
                      value={optionKey}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}

          <Grid item xs={9.6}>
            <Typography gutterBottom variant='h4' component='div'>
              Results
            </Typography>
          </Grid>

          <Grid item xs>
            <Button variant='contained' startIcon={<LocationOnIcon />}>
              View on map
            </Button>
          </Grid>

          {restaurants.map(restaurant => (
            <Grid item xs={2.4} key={restaurant.id}>
              <RestaurantCard
                restaurant={restaurant}
                onClick={() => openDetailModal(restaurant)}
              ></RestaurantCard>
            </Grid>
          ))}
        </Grid>
      </div>

      <RestaurantDetailsModal
        open={detailModalOpen}
        onClose={handleDetailModalClose}
        restaurant={detailModalRestaurant}
      ></RestaurantDetailsModal>
    </>
  );
}
