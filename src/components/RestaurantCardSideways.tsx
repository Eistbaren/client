import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Link,
  Skeleton,
} from '@mui/material';

import { Restaurant } from '../data/api';
import React from 'react';
import { Context } from '../data/Context';

/**
 * OnClick callback
 * @name OnClickCallback
 * @function
 */

/**
 * RestaurantCard
 * @param  {{restaurant: Restaurant, onClick: OnClickCallback}} params accepts restaurant object and onclick callback
 * @return {JSX.Element}
 */
export default function RestaurantCardSideways(params: {
  restaurant?: Restaurant;
  numberOfSeats?: number;
  onClick: () => void;
}) {
  const { restaurant, onClick, numberOfSeats } = params;
  const { configuration } = React.useContext(Context);

  const image: string =
    restaurant?.images?.at(0) ?? '069f72db-2157-43de-8e88-21661b518100';

  return (
    <>
      {restaurant ? (
        <Card
          onClick={onClick}
          className='restaurant-card'
          sx={{ display: 'flex', boxShadow: 14, backgroundColor: 'grey.A200' }}
        >
          <CardMedia
            component='img'
            sx={{ width: 151 }}
            image={`${configuration.basePath}/image/${image}`}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              className='restaurant-card-title'
            >
              {restaurant.name}
            </Typography>
            <Typography gutterBottom variant='body2' component='div'>
              {numberOfSeats ?? '?'} reserved seats
            </Typography>
            <Link
              href={restaurant.website}
              target='_blank'
              onClick={e => {
                e.stopPropagation();
              }}
            >
              Visit website
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{ display: 'flex', boxShadow: 14, backgroundColor: 'grey.A200' }}
        >
          <Skeleton variant='rectangular' width={151} height={151} />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
        </Card>
      )}
    </>
  );
}
