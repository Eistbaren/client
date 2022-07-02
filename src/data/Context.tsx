import { createContext } from 'react';
import { Reservation, Restaurant, RestaurantApi } from './api';
import { Configuration } from './configuration';

/**
 * Creates a Context that is accessible to all nodes wrapped in the context provider
 * @return {React.Context}
 */
export const Context = createContext<{
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;

  restaurant: Restaurant;
  setRestaurant: (restaurant: Restaurant) => void;

  // api
  configuration: Configuration;
  restaurantApi: RestaurantApi;
}>({
  reservation: {},
  setReservation: () => {
    return;
  },
  restaurant: {},
  setRestaurant: () => {
    return;
  },
  configuration: {},
  restaurantApi: new RestaurantApi(),
});
