import { createContext } from 'react';
import { Reservation } from './api';
import { Configuration } from './configuration';

/**
 * Creates a Context that is accessible to all nodes wrapped in the context provider
 * @return {React.Context}
 */
export const Context = createContext<{
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;

  configuration: Configuration;
}>({
  reservation: {},
  setReservation: () => {
    return;
  },
  configuration: {},
});
