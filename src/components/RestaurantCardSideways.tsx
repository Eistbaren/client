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
      <Card
        onClick={onClick}
        className='restaurant-card'
        sx={{ display: 'flex', boxShadow: 14, backgroundColor: 'grey.A200' }}
      >
        {restaurant ? (
          <CardMedia
            component='img'
            sx={{ width: 151 }}
            image={`${configuration.basePath}/image/${image}`}
          />
        ) : (
          <Skeleton variant='rectangular' width={151} height={127} />
        )}
        <CardContent style={{ width: '100%' }}>
          <Typography
            gutterBottom
            variant='h6'
            component='div'
            className='restaurant-card-title'
            width='100%'
          >
            {restaurant?.name ?? <Skeleton variant='text' width='100%' />}
          </Typography>
          <Typography gutterBottom variant='body2' component='div' width='100%'>
            {numberOfSeats ? (
              `${numberOfSeats} reserved seats`
            ) : (
              <Skeleton variant='text' />
            )}
          </Typography>
          {restaurant ? (
            <Link
              width='100%'
              href={
                restaurant.website?.includes('://')
                  ? restaurant.website
                  : `//${restaurant.website}`
              }
              target='_blank'
              onClick={e => {
                e.stopPropagation();
              }}
            >
              Visit website
            </Link>
          ) : (
            <Skeleton variant='text' />
          )}
        </CardContent>
      </Card>
    </>
  );
}
