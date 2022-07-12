import { GeographicCoordinates, Timeslot } from './api';

export enum RestaurantType {
  EMPTY,
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
export function queryToQueryStringArray(query: Query): string[] {
  return Object.entries(query)
    .map(([key, value]) => {
      if (value === undefined) return;
      if (value instanceof Object) {
        value = Object.values(value).join(';');
      } else if (key === 'type') {
        value = RestaurantType[value];
      }
      return `${key}=${value}`;
    })
    .filter((item): item is string => !!item);
}

export const restaurantTypeStrings: Map<number, string> = new Map([
  [RestaurantType.ITALIAN, 'Italian 🍕'],
  [RestaurantType.FRENCH, 'French 🥐'],
  [RestaurantType.GREEK, 'Greek 🐟'],
  [RestaurantType.GERMAN, 'German 🥨'],
  [RestaurantType.JAPANESE, 'Japanese 🍣'],
  [RestaurantType.CHINESE, 'Chinese 🍙'],
  [RestaurantType.SPANISH, 'Spanish 🥘'],
  [RestaurantType.BRITISH, 'British 🫖'],
  [RestaurantType.KOREAN, 'Korean 🍚'],
]);
