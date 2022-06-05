import Container from '@mui/material/Container';

/**
 * Bootstrap function
 * @param  {any} props accepts JSX elements to wrap theme in
 * @return {JSX.Element}
 */
export default function PageTemplate(props: any) {
  const { children } = props;

  return <Container maxWidth='lg'>{children}</Container>;
}
