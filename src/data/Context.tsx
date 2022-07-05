import { createContext } from 'react';
import {
  Reservation,
  Restaurant,
  RestaurantApi,
  ReservationCreationRequest,
} from './api';
import { Configuration } from './configuration';

interface Query {
  restaurant: Restaurant;
}

/**
 * Creates a Context that is accessible to all nodes wrapped in the context provider
 * @return {React.Context}
 */
export const Context = createContext<{
  restaurant: Restaurant;
  setRestaurant: (restaurant: Restaurant) => void;

  reservationCreationRequest: ReservationCreationRequest;
  setReservationCreationRequest: (
    reservationCreationRequest: ReservationCreationRequest,
  ) => void;

  // api
  configuration: Configuration;
  restaurantApi: RestaurantApi;
}>({
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
