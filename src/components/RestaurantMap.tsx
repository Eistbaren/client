import { Restaurant } from '../data/api';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import 'ol/ol.css';

import { RMap, ROSM, RLayerVector, RFeature, RPopup } from 'rlayers';
import { RStyle, RIcon } from 'rlayers/style';

import '../css/RestaurantMap.css';
import RestaurantCard from '../components/RestaurantCard';

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
}) {
  const { restaurants, onClick } = params;
  const center = fromLonLat([11.574231, 48.139244]);
  const locationIcon =
    'https://cdn.jsdelivr.net/npm/rlayers/examples/./svg/location.svg';

  return (
    <RMap className='restaurant-map' initial={{ center: center, zoom: 12 }}>
      <ROSM />
      <RLayerVector zIndex={10}>
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
                <RIcon src={locationIcon} anchor={[0.5, 0.8]} />
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
    </RMap>
  );
}
