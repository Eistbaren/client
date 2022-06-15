import TextField from '@mui/material/TextField';

/**
 * Bootstrap function
 * @return {JSX.Element}
 */
export default function SearchPage() {
  return (
    <>
      <h2>Search</h2>
      <TextField variant='outlined' placeholder='Search for restaurants' />
    </>
  );
}
