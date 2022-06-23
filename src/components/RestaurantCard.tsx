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
}) {
  const { restaurant, onClick } = params;
  return (
    <Card onClick={onClick} className='restaurant-card'>
      <CardMedia
        component='img'
        height='140'
        image='/images/hero.jpg'
        alt='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
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
