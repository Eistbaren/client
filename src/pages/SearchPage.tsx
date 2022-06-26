import {
  Button,
  TextField,
  Grid,
  Typography,
  Skeleton,
  Card,
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../css/SearchPage.css';
import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import RestaurantDetailsModal from '../components/RestaurantDetailsModal';
import { Restaurant } from '../data/api';
import ComboBox from '../components/ComboBox';
import { Context } from '../data/Context';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
export default function SearchPage() {
  const { restaurantApi } = React.useContext(Context);

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

  const [restaurants, setRestaurants] = React.useState<
    Restaurant[] | undefined
  >(undefined);

  const [detailModalRestaurant, setDetailModalRestaurant] =
    React.useState<Restaurant>({});
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);

  React.useEffect(() => {
    restaurantApi
      .getRestaurants()
      .then(paginated => paginated.results)
      .then(result => setRestaurants(result ?? []));
  }, []);

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
              <ComboBox
                id={`${filterKey}`}
                label={item.label}
                options={item.options}
              />
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

          {restaurants
            ? restaurants.map(restaurant => (
                <Grid item xs={2.4} key={restaurant.id}>
                  <RestaurantCard
                    restaurant={restaurant}
                    onClick={() => openDetailModal(restaurant)}
                  ></RestaurantCard>
                </Grid>
              ))
            : Array.from(new Array(10)).map((item, index) => (
                <Grid item xs={2.4} key={index}>
                  <Card>
                    <Skeleton variant='rectangular' height={118} />
                    <Skeleton variant='text' />
                    <Skeleton variant='text' width={'60%'} />
                    <Skeleton variant='text' width={'60%'} />
                  </Card>
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
