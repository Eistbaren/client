import {
  Button,
  Grid,
  Card,
  Typography,
  Link,
  Modal,
  Fade,
  ImageList,
  Divider,
  ImageListItem,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Comment, Restaurant } from '../data/api';
import React from 'react';
import { Context } from '../data/Context';
import PaginatedApi from '../data/PaginatedApi';
import {
  RestaurantComment,
  RestaurantCommentSkeleton,
} from '../components/RestaurantComment';
import TimeslotText from './TimeslotText';

/**
 * OnClose callback
 * @name OnCloseCallback
 * @function
 */

/**
 * RestaurantDetailsModal
 * @param  {{open: boolean, onClose: OnCloseCallback, restaurant: Restaurant}} params all params
 * @return {JSX.Element}
 */
export default function RestaurantDetailsModal(params: {
  open: boolean;
  onClose: () => void;
  restaurant: Restaurant;
  hideReservationButton?: boolean;
}) {
  const { open, onClose, restaurant, hideReservationButton } = params;
  if (restaurant.id === undefined) {
    return <></>;
  }

  const { configuration, restaurantApi, setRestaurant } =
    React.useContext(Context);

  const restaurantApiHelp = new PaginatedApi<Comment>(10, pagination =>
    restaurantApi
      .getRestaurantComments(
        restaurant.id === undefined ? '' : restaurant.id,
        pagination.currentPage,
        pagination.pageSize,
      )
      .then(result => [result, result.results ?? []]),
  );
  const [isLoading, comments, pagination] = restaurantApiHelp.state();

  React.useEffect(() => {
    if (open) restaurantApiHelp.initialLoad();
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Fade in={open}>
        <Card className='restaurant-detail-modal' style={{ outline: 'none' }}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={9}>
              <Typography variant='h4' component='div'>
                {restaurant.name}
              </Typography>
            </Grid>

            {!hideReservationButton && (
              <Grid item xs>
                <RouterLink
                  to='/table'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onClick={() => {
                    setRestaurant(restaurant);
                  }}
                >
                  <Button variant='contained' startIcon={<ChevronRightIcon />}>
                    Reserve
                  </Button>
                </RouterLink>
              </Grid>
            )}

            <Grid item xs={12}>
              <ImageList
                sx={{
                  gridAutoFlow: 'column',
                  gridTemplateColumns:
                    'repeat(auto-fill,minmax(300px,300px)) !important',
                  gridAutoColumns: 'minmax(300px, 1fr)',
                  height:
                    (restaurant?.images?.length ?? 0) > 0 ? '200px' : '30px',
                }}
              >
                {(restaurant?.images?.length ?? 0) > 0 ? (
                  (restaurant?.images || []).map((image, imageKey) => (
                    <ImageListItem
                      key={`details-modal-${restaurant.id}-image-${imageKey}`}
                    >
                      <img src={`${configuration.basePath}/image/${image}`} />
                    </ImageListItem>
                  ))
                ) : (
                  <Grid item xs={12}>
                    No images found.
                  </Grid>
                )}
              </ImageList>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={0.6}>
              <AccessTimeIcon />
            </Grid>

            <Grid item xs={3.4}>
              Opening hours: <TimeslotText timeslot={restaurant.openingHours} />
            </Grid>

            <Grid item xs={0.6}>
              <PublicIcon />
            </Grid>

            <Grid item xs={3}>
              <Link
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
            </Grid>

            <Grid item xs={0.6}>
              <LocationOnIcon />
            </Grid>

            <Grid item xs={3.8}>
              <Link
                href={`https://www.google.com/maps/place/${restaurant.location?.lat}+${restaurant.location?.lon}`}
                target='_blank'
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                View on Google Maps
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom variant='h5' component='div'>
                Comments
              </Typography>
            </Grid>

            {comments.length === 0 && !isLoading ? (
              <Grid item xs={12}>
                No comments yet.
              </Grid>
            ) : (
              comments.map((comment, commentKey) => (
                <RestaurantComment
                  key={`details-modal-${restaurant.id}-comment-${commentKey}`}
                  comment={comment}
                ></RestaurantComment>
              ))
            )}

            {Array.from(new Array(isLoading ? pagination.pageSize : 0)).map(
              (_, key) => (
                <RestaurantCommentSkeleton
                  key={`details-modal-${restaurant.id}-comment-skeleton-${key}`}
                ></RestaurantCommentSkeleton>
              ),
            )}

            <Grid item xs={12} className='center-children'>
              <Button
                onClick={() => {
                  restaurantApiHelp.loadNextPage();
                }}
                disabled={restaurantApiHelp.atLastPage()}
              >
                {restaurantApiHelp.atLastPage() ? "That's all!" : 'Load more'}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Fade>
    </Modal>
  );
}
