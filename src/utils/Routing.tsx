import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import PageTemplate from '../components/PageTemplate';

import Landingpage from '../pages/Landingpage';
import SearchPage from '../pages/SearchPage';
import ReservationDetails from '../pages/ReservationDetails';
import TableSelectionPage from '../pages/TableSelectionPage';
import PersonalData from '../pages/PersonalData';

/**
 * Adds Routing to the sites and wrapps pages with the PageTemplate component
 * @return {JSX.Element}
 */
export default function Routing() {
  return (
    <BrowserRouter>
      <Header />
      <PageTemplate>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='table' element={<TableSelectionPage />}></Route>
          <Route path='reservation-details'>
            <Route path=':reservationId' element={<ReservationDetails />} />
          </Route>
          <Route path='personal-data' element={<PersonalData />} />
          <Route path='*' element={<Landingpage />} />
        </Routes>
      </PageTemplate>
    </BrowserRouter>
  );
}
