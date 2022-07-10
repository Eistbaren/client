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
import Feature from 'ol/Feature';
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
  center: GeographicCoordinates;
  setCenter: (center: GeographicCoordinates) => void;
  range: number;
}) {
  const { restaurants, onClick, isLoading, center, setCenter, range } = params;

  const [currentRestaurant, setCurrentRestaurant] =
    React.useState<Feature<Geometry>>();
  const [showRestaurantPopup, setShowRestaurantPopup] = React.useState(false);

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
        if (!e.map.hasFeatureAtPixel(e.map.getEventPixel(e.originalEvent))) {
          setShowRestaurantPopup(false);
        }
        const c: Array<number> = toLonLat(
          e.map.getCoordinateFromPixel(e.pixel),
        );
        center.lon ?? setCenter({ lat: c[1], lon: c[0] });
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
              key={restaurant.id}
              onClick={e => {
                if (e.target !== currentRestaurant || !showRestaurantPopup) {
                  /* if (showRestaurantPopup) {
                   *   setShowRestaurantPopup(false);
                   * } */
                  e.target.set('restaurant', restaurant);
                  setCurrentRestaurant(e.target);
                  setShowRestaurantPopup(true);
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
        {currentRestaurant !== undefined ? (
          <RFeature geometry={currentRestaurant.getGeometry()}>
            <ROverlay className='restaurant-overlay' autoPosition={true}>
              <Fade in={showRestaurantPopup} timeout={400}>
                <div>
                  <RestaurantCard
                    restaurant={currentRestaurant?.get('restaurant')}
                    onClick={() =>
                      onClick(currentRestaurant?.get('restaurant'))
                    }
                    dontShowImages={true}
                  ></RestaurantCard>
                </div>
              </Fade>
            </ROverlay>
          </RFeature>
        ) : null}
      </RLayerVector>
      <RLayerVector zIndex={9}>
        <RFeature
          geometry={
            new Circle(
              centerCords,
              (range * 1000) /
                getPointResolution('EPSG:3857', 1, centerCords, 'm'),
            )
          }
        >
          <RStyle>
            <RStroke
              color={
                center.lat ? useTheme().palette.primary.dark : 'transparent'
              }
              width={4}
            />
          </RStyle>
        </RFeature>
      </RLayerVector>
    </RMap>
  );
}
