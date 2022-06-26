import { Reservation } from './api';

/**
 * Defines the ReservationContext interface with a function used to change the context state
 * @return {Type}
 */
export interface ReservationContextType {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}
