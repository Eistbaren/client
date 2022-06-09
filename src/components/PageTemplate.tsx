import Container from '@mui/material/Container';

/**
 * Bootstrap function
 * @param  {{ children: JSX.Element }} props accepts JSX elements to wrap theme in
 * @return {JSX.Element}
 */
export default function PageTemplate(props: { children: JSX.Element }) {
  const { children } = props;

  return (
    <Container className='root-container' maxWidth='lg'>
      {children}
    </Container>
  );
}
