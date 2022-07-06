import { createContext } from 'react';
import { Restaurant, RestaurantApi, ReservationCreationRequest } from './api';
import { Configuration } from './configuration';
import { Query } from './';

/**
 * Creates a Context that is accessible to all nodes wrapped in the context provider
 * @return {React.Context}
 */
export const Context = createContext<{
  // Populated during search
  query: Query;
  setQuery: (query: Query) => void;

  // Populated when restaurant is chosen
  // used for tables
  restaurant: Restaurant;
  setRestaurant: (query: Restaurant) => void;

  // Populated when the table is chosen
  reservationCreationRequest: ReservationCreationRequest;
  setReservationCreationRequest: (
    reservationCreationRequest: ReservationCreationRequest,
  ) => void;

  // api
  configuration: Configuration;
  restaurantApi: RestaurantApi;
}>({
  query: {},
  setQuery: () => {
    return;
  },
  restaurant: {},
  setRestaurant: () => {
    return;
  },
  reservationCreationRequest: {},
  setReservationCreationRequest: () => {
    return;
  },
  configuration: {},
  restaurantApi: new RestaurantApi(),
});
