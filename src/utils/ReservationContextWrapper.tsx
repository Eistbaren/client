import { ReservationContext } from '../data/ReservationContext';
import { useState } from 'react';
import { Reservation } from '../data/api';

/**
 * Sets a Reservation Context for its children
 * @param  {{ children: JSX.Element }} props
 * @return {JSX.Element}
 */
export default function ReservationContextWrapper(props: {
  children: JSX.Element;
}) {
  const { children } = props;

  const from = new Date();
  from.setMinutes(from.getMinutes() + 30);
  from.setMinutes(0);
  const to = new Date(from);
  to.setHours(to.getHours() + 1);

  const [reservation, setReservation] = useState<Reservation>({
    time: {
      from: from.valueOf(),
      to: to.valueOf(),
    },
  });

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}
