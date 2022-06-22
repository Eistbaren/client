import { Type } from 'typescript';
import { v4 as uuid } from 'uuid';

/**
 * @return {Type}
 */
export interface Reservation {
  id: typeof uuid | null;
  tables: typeof uuid[] | null;
  time: {
    from: Date | null;
    to: Date | null;
  };
  userName: string | null;
  userEmail: string | null;
  confirmed: boolean;
}

/**
 * @return {Type}
 */
export interface ReservationContextType {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
}
