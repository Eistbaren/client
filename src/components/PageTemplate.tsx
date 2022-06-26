import Container from '@mui/material/Container';
import LocalizationProviderWrapper from '../utils/LocalizationProviderWrapper';
import ReservationContextWrapper from '../utils/ReservationContextWrapper';

/**
 * Wrapps the page with all necessary utils
 * @param  {{ children: JSX.Element }} props accepts JSX elements to wrap theme in
 * @return {JSX.Element}
 */
export default function PageTemplate(props: { children: JSX.Element }) {
  const { children } = props;

  return (
    <ReservationContextWrapper>
      <LocalizationProviderWrapper>
        <Container className='root-container' maxWidth='lg'>
          {children}
        </Container>
      </LocalizationProviderWrapper>
    </ReservationContextWrapper>
  );
}
