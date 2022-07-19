import { Context } from '../data/Context';
import { useEffect, useState } from 'react';
import {
  RestaurantApi,
  BASE_PATH,
  Restaurant,
  ReservationCreationRequest,
  ReservationApi,
  TableApi,
} from '../data';
import { Configuration, ConfigurationParameters } from '../data';
import { Query } from '../data';

interface StoredContext {
  query: Query;
  restaurant: Restaurant;
  reservationCreationRequest: ReservationCreationRequest;
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
  from.setMinutes(0);
  from.setDate(from.getDate() + 1);
  const to = new Date(from);
  to.setHours(to.getHours() + 1);

  let storedContext: StoredContext = {
    query: {
      time: {
        from: Math.floor(from.valueOf() / 1000),
        to: Math.floor(to.valueOf() / 1000),
      },
      numberVisitors: 1,
    },
    restaurant: {},
    reservationCreationRequest: {},
  };

  // load old values from localstorage
  const storedContextJSON = localStorage.getItem('de.reservation-bear.context');
  if (storedContextJSON !== null) {
    storedContext = {
      ...storedContext,
      ...JSON.parse(storedContextJSON),
    };
  }

  const [query, setQuery] = useState(storedContext.query);
  const [restaurant, setRestaurant] = useState(storedContext.restaurant);
  const [reservationCreationRequest, setReservationCreationRequest] = useState(
    storedContext.reservationCreationRequest,
  );

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

  const reservationApi = new ReservationApi(configuration);

  const tableApi = new TableApi(configuration);

  useEffect(() => {
    localStorage.setItem(
      'de.reservation-bear.context',
      JSON.stringify({
        query: query,
        restaurant: restaurant,
        reservationCreationRequest: reservationCreationRequest,
      }),
    );
  }, [query, restaurant, reservationCreationRequest]);

  return (
    <Context.Provider
      value={{
        query,
        setQuery,
        restaurant,
        setRestaurant,
        reservationCreationRequest,
        setReservationCreationRequest,
        configuration,
        restaurantApi,
        reservationApi,
        tableApi,
      }}
    >
      {children}
    </Context.Provider>
  );
}
