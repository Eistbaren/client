import { Grid, Avatar, Rating, Divider, Skeleton } from '@mui/material';
import { Comment } from '../data/api';

/**
 *
 * @param {{comment: Comment}} props the comment
 * @return {JSX.Element}
 */
export function RestaurantComment(props: { comment: Comment }) {
  const { comment } = props;
  return (
    <>
      <Grid item xs={1}>
        <Avatar alt={comment.name} />
      </Grid>
      <Grid item xs={8}>
        {comment.name}
      </Grid>
      <Grid item xs={3}>
        <Rating name='simple-controlled' value={comment.rating} readOnly />
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
  );
}

/**
 *
 * @return {JSX.Element}
 */
export function RestaurantCommentSkeleton() {
  return (
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
  );
}
