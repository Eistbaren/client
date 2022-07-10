import { Restaurant } from '../data/api';
import { fromLonLat, getPointResolution, toLonLat } from 'ol/proj';
import { Point, Circle } from 'ol/geom';
import 'ol/ol.css';

import {
  RMap,
  ROSM,
  RLayerVector,
  RFeature,
  ROverlay,
  RFeatureUIEvent,
} from 'rlayers';
import { RStyle, RIcon, RStroke } from 'rlayers/style';

import '../css/RestaurantMap.css';
import RestaurantCard from '../components/RestaurantCard';

import { GeographicCoordinates } from '../data';
import { Fade, useTheme } from '@mui/material';
import { Geometry } from 'ol/geom';
import React, { useCallback } from 'react';

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
  center: GeographicCoordinates | undefined;
  setCenter: (center: GeographicCoordinates) => void;
  radius: number | undefined;
}) {
  const { restaurants, onClick, isLoading, center, setCenter, radius } = params;

  const centerCords = fromLonLat([
    center?.lon ?? 11.574231,
    center?.lat ?? 48.139244,
  ]);

  const [currentRestaurant, setCurrentRestaurant] = React.useState<Restaurant>(
    {},
  );
  const [currentRestaurantCardGeometry, setCurrentRestaurantCardGeometry] =
    React.useState<Geometry>(new Point(centerCords));
  const [showRestaurantPopup, setShowRestaurantPopup] = React.useState(false);
  const [renderRestaurantCard, setRenderRestaurantCard] = React.useState(false);

  return (
    <RMap
      className={
        'restaurant-map' +
        (isLoading ? ' loading' : '') +
        (center?.lat ? '' : ' clickable')
      }
      initial={{ center: centerCords, zoom: 12 }}
      onClick={e => {
        if (!e.map.hasFeatureAtPixel(e.map.getEventPixel(e.originalEvent))) {
          setShowRestaurantPopup(false);
        }
        const c: Array<number> = toLonLat(
          e.map.getCoordinateFromPixel(e.pixel),
        );
        center?.lon ?? setCenter({ lat: c[1], lon: c[0] });
      }}
    >
      <ROSM />
      <RLayerVector
        zIndex={10}
        onPointerEnter={useCallback((e: RFeatureUIEvent) => {
          e.map.getTargetElement().style.cursor = 'pointer';
        }, [])}
        onPointerLeave={useCallback((e: RFeatureUIEvent) => {
          e.map.getTargetElement().style.cursor = 'initial';
        }, [])}
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
              key={`restaurant-pin-${restaurant.id}`}
              onClick={e => {
                if (
                  e.target.getGeometry() !== currentRestaurantCardGeometry ||
                  !showRestaurantPopup
                ) {
                  setCurrentRestaurant(restaurant);
                  setCurrentRestaurantCardGeometry(
                    e.target.getGeometry() ?? currentRestaurantCardGeometry,
                  );
                  setShowRestaurantPopup(true);
                  setRenderRestaurantCard(true);
                } else {
                  setShowRestaurantPopup(false);
                }
              }}
            >
              <RStyle>
                <RIcon
                  src='/images/location.svg'
                  anchor={[0.5, 0.8]}
                  scale={0.2}
                />
              </RStyle>
            </RFeature>
          ) : null,
        )}
      </RLayerVector>
      <RLayerVector zIndex={10}>
        <RFeature geometry={currentRestaurantCardGeometry}>
          <ROverlay className='restaurant-overlay'>
            <Fade
              in={showRestaurantPopup}
              timeout={400}
              addEndListener={() => {
                setTimeout(() => {
                  if (!showRestaurantPopup) setRenderRestaurantCard(false);
                }, 400);
              }}
            >
              <div>
                {renderRestaurantCard && (
                  // It is important, not to render the card when it is hidden!
                  // Otherwise, pins under it are not clickable!
                  <RestaurantCard
                    restaurant={currentRestaurant}
                    onClick={() => onClick(currentRestaurant)}
                    dontShowImages={true}
                  ></RestaurantCard>
                )}
              </div>
            </Fade>
          </ROverlay>
        </RFeature>
      </RLayerVector>
      <RLayerVector zIndex={9}>
        <RFeature
          geometry={
            new Circle(
              centerCords,
              ((radius ?? 0) * 1000) /
                getPointResolution('EPSG:3857', 1, centerCords, 'm'),
            )
          }
        >
          <RStyle>
            <RStroke
              color={
                center?.lat ? useTheme().palette.primary.dark : 'transparent'
              }
              width={4}
            />
          </RStyle>
        </RFeature>
      </RLayerVector>
    </RMap>
  );
}
