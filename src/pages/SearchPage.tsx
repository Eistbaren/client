import {
  Button,
  TextField,
  Grid,
  Typography,
  Skeleton,
  Card,
  Box,
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import GridViewIcon from '@mui/icons-material/GridView';
import '../css/SearchPage.css';
import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import RestaurantMap from '../components/RestaurantMap';

import RestaurantDetailsModal from '../components/RestaurantDetailsModal';
import { Restaurant } from '../data/api';
import ComboBox from '../components/ComboBox';
import LocationDropdown from '../components/LocationDropdown';
import { Context } from '../data/Context';
import PaginatedApi from '../data/PaginatedApi';

import { GeographicCoordinates, queryToQueryStringArray } from '../data';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
export default function SearchPage() {
  const { restaurantApi, setQuery, query } = React.useContext(Context);

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
      label: 'Rating',
      options: ['Medium', 'Good', 'Excellent'],
    },
    {
      label: 'Time',
      options: [],
    },
  ];

  const [showMap, setShowMap] = React.useState(false);

  const restaurantApiHelp = new PaginatedApi<Restaurant>(
    10,
    pagination =>
      restaurantApi
        .getRestaurants(
          queryToQueryStringArray(query),
          pagination.currentPage,
          pagination.pageSize,
        )
        .then(result => [result, result.results ?? []]),
    showMap && query.radius !== undefined && query.location !== undefined,
  );
  const [isLoading, restaurants, pagination] = restaurantApiHelp.state();

  React.useEffect(() => {
    restaurantApiHelp.initialLoad();
  }, [query, showMap]);

  const [detailModalRestaurant, setDetailModalRestaurant] =
    React.useState<Restaurant>({});
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);

  const openDetailModal = (restaurant: Restaurant) => {
    setDetailModalRestaurant(restaurant);
    setDetailModalOpen(true);
  };
  const handleDetailModalClose = () => setDetailModalOpen(false);

  const toggleMap = () => setShowMap(!showMap);

  const handleLocationChanged = (location: GeographicCoordinates) => {
    if (!showMap) location.lat ?? setShowMap(true);
    setQuery({ ...query, location: location });
  };

  return (
    <>
      <div className='search-container'>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12}>
            <Typography variant='h4' component='div'>
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

          <Grid item xs={2.4}>
            <LocationDropdown
              location={query.location}
              setLocation={handleLocationChanged}
              radius={query.radius}
              setRadius={radius => setQuery({ ...query, radius: radius })}
              disabled={isLoading}
            ></LocationDropdown>
          </Grid>

          <Grid item xs={9.6}>
            <Typography variant='h4' component='div'>
              Results
            </Typography>
          </Grid>

          <Grid item xs>
            <Box display='flex' justifyContent='flex-end'>
              <Button
                variant='contained'
                startIcon={showMap ? <GridViewIcon /> : <LocationOnIcon />}
                onClick={toggleMap}
              >
                {showMap ? 'Show grid' : 'Show map'}
              </Button>
            </Box>
          </Grid>

          {showMap ? (
            <Grid item xs={12}>
              <RestaurantMap
                restaurants={restaurants}
                onClick={restaurant => openDetailModal(restaurant)}
                isLoading={isLoading}
                center={query.location}
                setCenter={handleLocationChanged}
                radius={query.radius}
              ></RestaurantMap>
            </Grid>
          ) : (
            <>
              {restaurants.length === 0 && !isLoading ? (
                <Grid item xs={12} className='center-children'>
                  No restaurant found
                </Grid>
              ) : (
                restaurants.map(restaurant => (
                  <Grid item xs={2.4} key={restaurant.id}>
                    <RestaurantCard
                      restaurant={restaurant}
                      onClick={() => openDetailModal(restaurant)}
                    ></RestaurantCard>
                  </Grid>
                ))
              )}
              {Array.from(new Array(isLoading ? pagination.pageSize : 0)).map(
                (_, index) => (
                  <Grid item xs={2.4} key={index}>
                    <Card>
                      <Skeleton variant='rectangular' height={118} />
                      <Skeleton variant='text' />
                      <Skeleton variant='text' width={'60%'} />
                      <Skeleton variant='text' width={'60%'} />
                    </Card>
                  </Grid>
                ),
              )}
              <Grid item xs={12} className='center-children'>
                <Button
                  onClick={() => {
                    restaurantApiHelp.loadNextPage();
                  }}
                  disabled={restaurantApiHelp.atLastPage() || isLoading}
                >
                  {restaurantApiHelp.atLastPage()
                    ? "That's all!"
                    : isLoading
                    ? 'Loading...'
                    : 'Load more'}
                </Button>
              </Grid>
            </>
          )}

          <Grid item xs={12}></Grid>
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
