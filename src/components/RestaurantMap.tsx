import {
  Button,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Rating,
  Link,
} from '@mui/material';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Restaurant } from '../data/api';
import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

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
  const [map, setMap] = useState<Map>();
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>();
  mapRef.current = map;

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current!,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
      controls: [],
    });
    setMap(initialMap);
  }, []);

  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      ref={mapElement}
      className='map-container'
    />
  );
}
