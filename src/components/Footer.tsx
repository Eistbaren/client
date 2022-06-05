import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';

import '../css/Footer.css';

/**
 * Landingpage component
 * @return {JSX.Element}
 */
export default function Footer() {
  return (
    <footer>
      <Container maxWidth='lg' className='footer-container'>
        <img
          className='logo'
          src={process.env.PUBLIC_URL + '/images/logo.jpeg'}
        />
        <ul className='sitemap'>
          <li>
            <NavLink to='/'>HOME</NavLink>
          </li>
          <li>
            <NavLink to='/impressum'>Impressum</NavLink>
          </li>
          <li>
            <NavLink to='/docs'>DOCS</NavLink>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
