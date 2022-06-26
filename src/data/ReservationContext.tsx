import { createContext } from 'react';
import { ReservationContextType } from './ReservationDataInterface';
import { Reservation } from './api';

const defaultReservation: Reservation = {};

const defaultFunction = () => {
  return;
};

/**
 * Creates a Reservation Context that is accessible to all nodes wrapped in the context provider
 * @return {React.Context}
 */
export const ReservationContext = createContext<ReservationContextType>({
  reservation: defaultReservation,
  setReservation: defaultFunction,
});
