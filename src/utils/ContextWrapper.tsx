import { Context } from '../data/Context';
import { useState } from 'react';
import { Reservation, RestaurantApi } from '../data/api';
import { Configuration, ConfigurationParameters } from '../data';

/**
 * Sets Context for its children
 * @param  {{ children: JSX.Element }} props
 * @return {JSX.Element}
 */
export default function ContextWrapper(props: { children: JSX.Element }) {
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

  const parameters: ConfigurationParameters = {};

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    parameters.basePath = 'https://reservation-bear.de/api';
  }

  const configuration = new Configuration(parameters);

  const restaurantApi = new RestaurantApi(configuration);

  return (
    <Context.Provider
      value={{ reservation, setReservation, configuration, restaurantApi }}
    >
      {children}
    </Context.Provider>
  );
}
