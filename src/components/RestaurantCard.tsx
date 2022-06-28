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
export default function RestaurantCard(params: {
  restaurant: Restaurant;
  onClick: () => void;
  dontShowImages?: boolean;
}) {
  const { restaurant, onClick, dontShowImages } = params;
  const { configuration } = React.useContext(Context);

  const image: string =
    restaurant.images?.at(0) ?? '069f72db-2157-43de-8e88-21661b518100';

  return (
    <Card onClick={onClick} className='restaurant-card'>
      {!dontShowImages ? (
        <CardMedia
          component='img'
          height='140'
          image={`${configuration.basePath}/image/${image}`}
        />
      ) : null}
      <CardContent>
        <Typography
          gutterBottom
          variant='h6'
          component='div'
          className='restaurant-card-title'
        >
          {restaurant.name}
        </Typography>
        <Rating
          name='simple-controlled'
          value={restaurant.averageRating}
          readOnly
        />
        <br></br>
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
      <CardActions>
        <Button
          startIcon={<ChevronRightIcon />}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          Reserve
        </Button>
      </CardActions>
    </Card>
  );
}
