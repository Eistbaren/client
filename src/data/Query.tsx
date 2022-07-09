import { GeographicCoordinates, Timeslot } from './api';

export enum RestaurantType {
  ITALIAN,
  FRENCH,
  GREEK,
  GERMAN,
  JAPANESE,
  CHINESE,
  SPANISH,
  BRITISH,
  KOREAN,
}

export interface Query {
  query?: string;
  type?: RestaurantType;
  priceCategory?: number;
  location?: GeographicCoordinates;
  radius?: number;
  averageRating?: number;
  time?: Timeslot;
  numberOfVisitors?: number;
}

/**
 * Converts a Query object to an array of strings
 * @param {Query} query the query to convert
 * @return {string} an array of filters
 */
export function queryToQueryStringArray(query: Query) {
  return Object.entries(query).map(([key, value]) => {
    if (value instanceof Object) {
      value = Object.values(value).join(';');
    } else if (key === 'type') {
      value = RestaurantType[value];
    }
    return `${key}=${value}`;
  });
}
