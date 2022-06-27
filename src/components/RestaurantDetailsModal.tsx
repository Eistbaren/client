import {
  Button,
  Grid,
  Card,
  Typography,
  Rating,
  Link,
  Modal,
  Fade,
  ImageList,
  Divider,
  ImageListItem,
  Avatar,
  Skeleton,
} from '@mui/material';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';
import { Comment, Restaurant } from '../data/api';
import React from 'react';
import { Context } from '../data/Context';
import PaginatedApi from '../data/PaginatedApi';

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
}) {
  const { open, onClose, restaurant } = params;
  const { configuration, restaurantApi } = React.useContext(Context);

  const restaurantApiHelp = new PaginatedApi<Comment>(10, pagination =>
    restaurantApi
      .getRestaurantComments(
        restaurant.id ?? '',
        pagination.currentPage,
        pagination.pageSize,
      )
      .then(result => [result, result.results ?? []]),
  );
  const [isLoading, comments, pagination] = restaurantApiHelp.state();

  const unixTimestampToTimeOfDay = (unixTimestamp?: number) => {
    if (!unixTimestamp) {
      return '';
    }

    return new Date(unixTimestamp * 1000).toLocaleTimeString('de-DE', {
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Fade in={open}>
        <Card className='restaurant-detail-modal'>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={9}>
              <Typography variant='h4' component='div'>
                {restaurant.name}
              </Typography>
            </Grid>

            <Grid item xs>
              <Button variant='contained' startIcon={<ChevronRightIcon />}>
                Reserve
              </Button>
            </Grid>

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
                    <ImageListItem key={`${restaurant.id}-image-${imageKey}`}>
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

            <Grid item xs={1}>
              <AccessTimeIcon />
            </Grid>

            <Grid item xs={5}>
              <Typography>
                Opening hours:{' '}
                {unixTimestampToTimeOfDay(restaurant?.openingHours?.from)}-
                {unixTimestampToTimeOfDay(restaurant?.openingHours?.to)}
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <PublicIcon />
            </Grid>

            <Grid item xs={5}>
              <Link
                href={restaurant.website}
                target='_blank'
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {restaurant.website}
              </Link>
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
              comments.map(comment => (
                <>
                  <Grid item xs={1}>
                    <Avatar alt={comment.name} />
                  </Grid>
                  <Grid item xs={8}>
                    {comment.name}
                  </Grid>
                  <Grid item xs={3}>
                    <Rating
                      name='simple-controlled'
                      value={comment.rating}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    {comment.comment}
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <Divider />
                  </Grid>
                </>
              ))
            )}

            {Array.from(new Array(isLoading ? pagination.pageSize : 0)).map(
              () => (
                <>
                  <Grid item xs={1}>
                    <Skeleton variant='circular' />
                  </Grid>
                  <Grid item xs={8}>
                    <Skeleton variant='text' />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton variant='text' />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <Skeleton variant='text' />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <Divider />
                  </Grid>
                </>
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
