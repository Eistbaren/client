import { jsx } from '@emotion/react';
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Tooltip,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Rating,
  Link,
  Modal,
  Box,
  Fade,
  ImageList,
  Divider,
  ImageListItem,
  ImageListItemBar,
  Avatar,
} from '@mui/material';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';

import '../css/SearchPage.css';
import React from 'react';
import internal from 'stream';

interface Timeslot {
  from: number;
  to: number;
}
interface Restaurant {
  id: string;
  name: string;
  averageRating: number;
  website: string;
  images: string[];
  openingHours: Timeslot;
}

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
export default function SearchPage() {
  const filterFormItems = [
    {
      label: 'Type',
      options: ['Italian'],
    },
    {
      label: 'Price',
      options: ['€', '€€', '€€€'],
    },
    {
      label: 'Location & Distance',
      options: [],
    },
    {
      label: 'Rating',
      options: ['Medium', 'Good', 'Excellent'],
    },
    {
      label: 'Time',
      options: [],
    },
  ];

  const restaurants: Restaurant[] = [
    {
      id: 'bla',
      name: 'Restaurant',
      averageRating: 3,
      website: 'https://tum.de',
      images: [
        '/images/background_3.jpg',
        'images/hero.jpg',
        '/images/background_3.jpg',
        'images/hero.jpg',
      ],
      openingHours: {
        from: 36000, // 11:00
        to: 72000, // 21:00
      },
    },
    {
      id: 'bla1',
      name: 'Restaurant1',
      averageRating: 2,
      website: 'https://tum.de',
      images: [
        '/images/background_3.jpg',
        'images/hero.jpg',
        '/images/background_3.jpg',
        'images/hero.jpg',
      ],
      openingHours: {
        from: 36000, // 11:00
        to: 75600, // 22:00
      },
    },
    {
      id: 'bla2',
      name: 'Restaurant2',
      averageRating: 4,
      website: 'https://tum.de',
      images: [
        '/images/background_3.jpg',
        'images/hero.jpg',
        '/images/background_3.jpg',
        'images/hero.jpg',
      ],
      openingHours: {
        from: 36000, // 11:00
        to: 79200, // 23:00
      },
    },
  ];

  const [detailModalRestaurant, setDetailModalRestaurant] =
    React.useState<Restaurant>({
      id: '',
      name: '',
      averageRating: 0,
      website: '',
      images: [],
      openingHours: {
        from: 0,
        to: 0,
      },
    });
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);

  const openDetailModal = (restaurant: Restaurant) => {
    setDetailModalRestaurant(restaurant);
    setDetailModalOpen(true);
  };
  const handleDetailModalClose = () => setDetailModalOpen(false);

  return (
    <>
      <div className='search-container'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant='h4' component='div'>
              Search
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='Search for restaurants'
              fullWidth
            />
          </Grid>

          {filterFormItems.map((item, filterKey) => (
            <Grid item xs={2.4} key={filterKey}>
              <FormControl fullWidth>
                <InputLabel id={`filter-input-${filterKey}-label`}>
                  {item.label}
                </InputLabel>
                <Select
                  variant='outlined'
                  labelId={`filter-input-${filterKey}-label`}
                >
                  {item.options.map((option, optionKey) => (
                    <MenuItem
                      key={`filter-${filterKey}-option-${optionKey}`}
                      value={optionKey}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}

          <Grid item xs={9.6}>
            <Typography gutterBottom variant='h4' component='div'>
              Results
            </Typography>
          </Grid>

          <Grid item xs>
            <Button variant='contained' startIcon={<LocationOnIcon />}>
              View on map
            </Button>
          </Grid>

          {restaurants.map(restaurant => (
            <Grid item xs={2.4} key={restaurant.id}>
              <Card
                onClick={() => {
                  openDetailModal(restaurant);
                }}
                className='restaurant-card'
              >
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
            </Grid>
          ))}
        </Grid>
      </div>

      <Modal
        open={detailModalOpen}
        onClose={handleDetailModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fade in={detailModalOpen}>
          <Card className='restaurant-detail-modal'>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Typography gutterBottom variant='h4' component='div'>
                  {detailModalRestaurant.name}
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
                      'repeat(auto-fill,minmax(160px,1fr)) !important',
                    gridAutoColumns: 'minmax(160px, 1fr)',
                  }}
                >
                  {detailModalRestaurant.images.map((image, imageKey) => (
                    <ImageListItem key={`image-${imageKey}`}>
                      <img src={image} />
                      <ImageListItemBar title={image} />
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
                  {new Date(
                    detailModalRestaurant.openingHours.from * 1000,
                  ).toLocaleTimeString('de-DE', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                  -
                  {new Date(
                    detailModalRestaurant.openingHours.to * 1000,
                  ).toLocaleTimeString('de-DE', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <PublicIcon />
              </Grid>

              <Grid item xs={5}>
                <Link
                  href={detailModalRestaurant.website}
                  target='_blank'
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  {detailModalRestaurant.website}
                </Link>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant='h4' component='div'>
                  Comments
                </Typography>
              </Grid>

              {[
                {
                  rating: 3,
                  comment: 'Essen ok, aber zu wenig!',
                  name: 'Hungry Client',
                },
                {
                  rating: 5,
                  comment: 'Exzellentes Essen!',
                  name: 'Exzellenter Mensch',
                },
              ].map((comment, commentKey) => (
                <>
                  <Grid item xs={1}>
                    <Avatar
                      alt={comment.name}
                      src='/static/images/avatar/1.jpg'
                    />
                  </Grid>
                  <Grid item>{comment.name}</Grid>
                  <Grid item>
                    <Rating
                      name='simple-controlled'
                      value={comment.rating}
                      readOnly
                    />
                  </Grid>
                  <Grid xs={12}>{comment.comment}</Grid>
                </>
              ))}
            </Grid>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}
