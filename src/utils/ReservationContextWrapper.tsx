import { ReservationContext } from '../data/ReservationContext';
import { useState } from 'react';
import { Reservation } from '../data/ReservationDataInterface';

/**
 * @param  {{ children: JSX.Element }} props
 * @return {JSX.Element}
 */
export default function ReservationContextWrapper(props: {
  children: JSX.Element;
}) {
  const { children } = props;

  const [reservation, setReservation] = useState<Reservation>({
    id: null,
    tables: null,
    time: {
      from: null,
      to: null,
    },
    userName: null,
    userEmail: null,
    confirmed: false,
  });

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}
