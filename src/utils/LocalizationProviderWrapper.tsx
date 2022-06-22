import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

/**
 * @param  {{ children: JSX.Element }} props
 * @return {JSX.Element}
 */
export default function LocalizationProviderWrapper(props: {
  children: JSX.Element;
}) {
  const { children } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </LocalizationProvider>
  );
}
