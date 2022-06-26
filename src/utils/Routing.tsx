import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import PageTemplate from '../components/PageTemplate';

import Landingpage from '../pages/Landingpage';
import SearchPage from '../pages/SearchPage';
import RestaurantDetails from '../pages/RestaurantDetails';
import ReservationDetails from '../pages/ReservationDetails';
import ReservationApproval from '../pages/ReservationApproval';
import TableSelectionPage from '../pages/TableSelectionPage';

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
          <Route path='search' element={<SearchPage />}>
            <Route path=':restaurantId' element={<RestaurantDetails />} />
          </Route>
          <Route path='table' element={<TableSelectionPage />}></Route>
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
