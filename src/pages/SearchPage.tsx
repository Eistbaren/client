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
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import '../css/SearchPage.css';

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

  const restaurants = [
    {
      id: 'bla',
      name: 'Restaurant',
      averageRating: 3,
      website: 'https://tum.de',
    },
    {
      id: 'bla1',
      name: 'Restaurant1',
      averageRating: 2,
      website: 'https://tum.de',
    },
    {
      id: 'bla2',
      name: 'Restaurant2',
      averageRating: 4,
      website: 'https://tum.de',
    },
  ];

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

          <Grid item xs={12}>
            <Typography gutterBottom variant='h4' component='div'>
              Results
            </Typography>
          </Grid>

          {restaurants.map(restaurant => (
            <Grid item xs={2.4} key={restaurant.id}>
              <Card>
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
                  <Link href={restaurant.website}>Visit website</Link>
                </CardContent>
                <CardActions>
                  <Button variant='outlined' startIcon={<ChevronRightIcon />}>
                    Reserve
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
