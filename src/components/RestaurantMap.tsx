import { Restaurant } from '../data/api';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Point, Circle } from 'ol/geom';
import 'ol/ol.css';

import { RMap, ROSM, RLayerVector, RFeature, RPopup } from 'rlayers';
import { RStyle, RIcon, RStroke } from 'rlayers/style';

import '../css/RestaurantMap.css';
import RestaurantCard from '../components/RestaurantCard';

import { GeographicCoordinates } from '../data';
import { useTheme } from '@mui/material';

/**
 * OnClick callback
 * @param {Restaurant} restaurant clicked restaurant
 * @name OnClickCallback
 * @function
 */

/**
 * RestaurantMap
 * @param  {{restaurants: Array<Restaurant>, onClick: OnClickCallback}} params accepts restaurant object and onclick callback
 * @return {JSX.Element}
 */
export default function RestaurantMap(params: {
  restaurants: Array<Restaurant>;
  onClick: (restaurant: Restaurant) => void;
  isLoading: boolean;
  center: GeographicCoordinates;
  setCenter: (center: GeographicCoordinates) => void;
  range: number;
}) {
  const { restaurants, onClick, isLoading, center, setCenter, range } = params;

  const centerCords = fromLonLat([
    center.lon ?? 11.574231,
    center.lat ?? 48.139244,
  ]);
  return (
    <RMap
      className={
        'restaurant-map' +
        (isLoading ? ' loading' : '') +
        (center.lat ? '' : ' clickable')
      }
      initial={{ center: centerCords, zoom: 12 }}
      onClick={e => {
        const c: Array<number> = toLonLat(
          e.map.getCoordinateFromPixel(e.pixel),
        );
        center.lon ?? setCenter({ lat: c[1], lon: c[0] });
      }}
    >
      <ROSM />
      <RLayerVector
        zIndex={10}
        onPointerEnter={e => {
          e.map.getTargetElement().style.cursor = 'pointer';
        }}
        onPointerLeave={e => {
          e.map.getTargetElement().style.cursor = '';
        }}
      >
        {restaurants.map(restaurant =>
          restaurant.location &&
          restaurant.location.lat &&
          restaurant.location.lon ? (
            <RFeature
              geometry={
                new Point(
                  fromLonLat([
                    restaurant.location.lon,
                    restaurant.location.lat,
                  ]),
                )
              }
              key={restaurant.id}
            >
              <RStyle>
                <RIcon
                  src='/images/location.svg'
                  anchor={[0.5, 0.8]}
                  scale={0.2}
                />
              </RStyle>
              <RPopup trigger={'click'} className='restaurant-overlay'>
                <RestaurantCard
                  restaurant={restaurant}
                  onClick={() => onClick(restaurant)}
                  dontShowImages={true}
                ></RestaurantCard>
              </RPopup>
            </RFeature>
          ) : null,
        )}
      </RLayerVector>
      <RLayerVector zIndex={9}>
        <RFeature geometry={new Circle(centerCords, range * 1000)}>
          <RStyle>
            <RStroke
              color={
                center.lat ? useTheme().palette.primary.main : 'transparent'
              }
              width={4}
            />
          </RStyle>
        </RFeature>
      </RLayerVector>
    </RMap>
  );
}
