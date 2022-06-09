import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import PageTemplate from '../components/PageTemplate';

import Landingpage from '../pages/Landingpage';
import Restaurants from '../pages/Restaurants';
import RestaurantDetails from '../pages/RestaurantDetails';
import ReservationDetails from '../pages/ReservationDetails';
import ReservationApproval from '../pages/ReservationApproval';

/**
 * Landingpage component
 * @return {JSX.Element}
 */
export default function Routing() {
  return (
    <BrowserRouter>
      <Header />
      <PageTemplate>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='restaurants' element={<Restaurants />}>
            <Route path=':restaurantId' element={<RestaurantDetails />} />
          </Route>
          <Route path='reservations' element={<ReservationDetails />} />
          <Route
            path='reservation-approval'
            element={<ReservationApproval />}
          />
        </Routes>
      </PageTemplate>
    </BrowserRouter>
  );
}
