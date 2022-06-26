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
  const { restaurantApi } = React.useContext(Context);

  const [comments, setComments] = React.useState<Comment[] | undefined>();

  React.useEffect(() => {
    if (!restaurant.id || !open) {
      return;
    }
    setComments(undefined);

    restaurantApi
      .getRestaurantComments(restaurant.id)
      .then(paginated => paginated.results)
      .then(result => setComments(result ?? []));
  }, [restaurant, open]);

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
                  height: '200px',
                }}
              >
                {(restaurant?.images || []).map((image, imageKey) => (
                  <ImageListItem key={`image-${imageKey}`}>
                    <img src={image} />
                  </ImageListItem>
                ))}
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

            {comments ? (
              comments.length === 0 ? (
                <Grid item xs={12}>
                  No comments yet.
                </Grid>
              ) : (
                comments.map(comment => (
                  <>
                    <Grid item xs={1}>
                      <Avatar
                        alt={comment.name}
                        src='/static/images/avatar/1.jpg'
                      />
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
              )
            ) : (
              Array.from(new Array(1)).map(() => (
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
              ))
            )}
          </Grid>
        </Card>
      </Fade>
    </Modal>
  );
}
