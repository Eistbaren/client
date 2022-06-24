import { v4 as uuid } from 'uuid';

/**
 * Defines the Reservation interface
 * @return {Type}
 */
export interface Reservation {
  id: typeof uuid | null;
  tables: typeof uuid[] | null;
  time: {
    from: Date;
    to: Date;
  };
  userName: string | null;
  userEmail: string | null;
  confirmed: boolean;
}

/**
 * Defines the ReservationContext interface with a function used to change the context state
 * @return {Type}
 */
export interface ReservationContextType {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}
