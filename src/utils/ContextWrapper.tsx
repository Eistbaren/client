import { Context } from '../data/Context';
import { useEffect, useState } from 'react';
import { Reservation, RestaurantApi, BASE_PATH } from '../data/api';
import { Configuration, ConfigurationParameters } from '../data';

interface StoredContext {
  reservation: Reservation;
}

/**
 * Sets Context for its children
 * @param  {{ children: JSX.Element }} props
 * @return {JSX.Element}
 */
export default function ContextWrapper(props: { children: JSX.Element }) {
  const { children } = props;

  // default values
  const from = new Date();
  from.setMinutes(from.getMinutes() + 30);
  from.setMinutes(0);
  const to = new Date(from);
  to.setHours(to.getHours() + 1);

  let storedContext: StoredContext = {
    reservation: {
      time: {
        from: from.valueOf(),
        to: to.valueOf(),
      },
    },
  };

  // load old values from localstorage
  const storedContextJSON = localStorage.getItem('de.reservation-bear.context');
  if (storedContextJSON !== null) {
    storedContext = JSON.parse(storedContextJSON);
  }

  const [reservation, setReservation] = useState(storedContext.reservation);

  const parameters: ConfigurationParameters = {};

  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ||
    location.hostname.endsWith('pages.dev')
  ) {
    parameters.basePath = 'https://reservation-bear.de/api';
  } else {
    parameters.basePath = BASE_PATH;
  }

  const configuration = new Configuration(parameters);

  const restaurantApi = new RestaurantApi(configuration);

  useEffect(() => {
    localStorage.setItem(
      'de.reservation-bear.context',
      JSON.stringify({
        reservation: reservation,
      }),
    );
  }, [reservation]);

  return (
    <Context.Provider
      value={{
        reservation,
        setReservation,
        configuration,
        restaurantApi,
      }}
    >
      {children}
    </Context.Provider>
  );
}
