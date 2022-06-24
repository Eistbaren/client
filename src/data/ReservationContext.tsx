import { createContext } from 'react';
import {
  Reservation,
  ReservationContextType,
} from './ReservationDataInterface';

const defaultReservation: Reservation = {
  id: null,
  tables: null,
  time: {
    from: new Date(),
    to: new Date(),
  },
  userName: null,
  userEmail: null,
  confirmed: false,
};

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
