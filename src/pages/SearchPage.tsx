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
import TimeDatePeopleDropdown from '../components/TimeDatePeopleDropdown';

import {
  GeographicCoordinates,
  queryToQueryStringArray,
  restaurantTypeStrings,
} from '../data';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
export default function SearchPage() {
  const { restaurantApi, setQuery, query } = React.useContext(Context);

  const filterFormItems: Array<{
    id: 'type' | 'priceCategory' | 'averageRating';
    label: string;
    options: Map<number, string>;
  }> = [
    {
      id: 'type',
      label: 'Type',
      options: restaurantTypeStrings,
    },
    {
      id: 'priceCategory',
      label: 'Price',
      options: new Map([
        [1, '💲'],
        [2, '💲💲'],
        [3, '💲💲💲'],
      ]),
    },
    {
      id: 'averageRating',
      label: 'Rating',
      options: new Map([
        [1, '⭐'],
        [2, '⭐⭐'],
        [3, '⭐⭐⭐'],
        [4, '⭐⭐⭐⭐'],
        [5, '⭐⭐⭐⭐⭐'],
      ]),
    },
  ];

  const [showMap, setShowMap] = React.useState(false);
  const [detailModalRestaurant, setDetailModalRestaurant] =
    React.useState<Restaurant>({});
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  const reloadTimeoutRef = React.useRef(0);

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
    showMap,
  );
  const [isLoading, restaurants, pagination] = restaurantApiHelp.state();

  React.useEffect(() => {
    restaurantApiHelp.initialLoad();
  }, []);

  // Only reload after there was no activity for 0.5 seconds!
  React.useEffect(() => {
    window.clearTimeout(reloadTimeoutRef.current);
    reloadTimeoutRef.current = window.setTimeout(() => {
      if (!isLoading) restaurantApiHelp.initialLoad();
    }, 500);
  }, [query]);

  React.useEffect(() => {
    if (showMap) restaurantApiHelp.initialLoad();
  }, [showMap]);

  const openDetailModal = (restaurant: Restaurant) => {
    setDetailModalRestaurant(restaurant);
    setDetailModalOpen(true);
  };
  const handleDetailModalClose = () => setDetailModalOpen(false);

  const toggleMap = () => setShowMap(!showMap);

  const handleLocationChanged = (location: GeographicCoordinates) => {
    if (!showMap) location.lat ?? setShowMap(true);
    if (query.radius === undefined)
      setQuery({ ...query, location: location, radius: 5 });
    else setQuery({ ...query, location: location });
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
              onChange={e =>
                setQuery({
                  ...query,
                  query: e.target.value,
                })
              }
              defaultValue={query.query ?? ''}
              fullWidth
            />
          </Grid>

          {filterFormItems.map((item, filterKey) => (
            <Grid item xs={2.4} key={`filter-${filterKey}-${item.id}`}>
              <ComboBox
                id={`filter-${filterKey}-${item.id}-comboBox`}
                label={item.label}
                options={item.options}
                value={query[item.id]}
                onChange={value =>
                  setQuery({
                    ...query,
                    [item.id]: value,
                  })
                }
                onClear={() =>
                  setQuery({
                    ...query,
                    [item.id]: undefined,
                  })
                }
              />
            </Grid>
          ))}

          <Grid item xs={2.4}>
            <TimeDatePeopleDropdown
              timeslot={query.time}
              numberOfVisitors={query.numberOfVisitors}
            />
          </Grid>

          <Grid item xs={2.4}>
            <LocationDropdown
              location={query.location}
              setLocation={handleLocationChanged}
              radius={query.radius}
              setRadius={radius => setQuery({ ...query, radius: radius })}
              disabled={isLoading}
              onClear={() =>
                setQuery({ ...query, radius: undefined, location: undefined })
              }
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
                  <Grid item xs={2.4} key={`restaurant-card-${restaurant.id}`}>
                    <RestaurantCard
                      restaurant={restaurant}
                      onClick={() => openDetailModal(restaurant)}
                    ></RestaurantCard>
                  </Grid>
                ))
              )}
              {Array.from(new Array(isLoading ? pagination.pageSize : 0)).map(
                (_, index) => (
                  <Grid item xs={2.4} key={`restaurant-card-skeleton-${index}`}>
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
