import { ToggleButton, ToggleButtonGroup } from '@mui/material';

/**
 * Wrapps the page with all necessary utils
 * @param  {{numberOfPersons: number, setNumberOfPersons: void}} props state and setState for NumberOfPersons
 * @return {JSX.Element}
 */
export default function NumberOfPersonsPicker(props: {
  numberOfPersons: number;
  setNumberOfPersons: (person: number) => void;
}) {
  const { numberOfPersons, setNumberOfPersons } = props;

  return (
    <ToggleButtonGroup
      value={numberOfPersons}
      exclusive
      onChange={(e, person) => setNumberOfPersons(person)}
    >
      <ToggleButton value={1}>1</ToggleButton>
      <ToggleButton value={2}>2</ToggleButton>
      <ToggleButton value={3}>3</ToggleButton>
      <ToggleButton value={4}>4</ToggleButton>
      <ToggleButton value={5}>5</ToggleButton>
      <ToggleButton value={6}>6</ToggleButton>
    </ToggleButtonGroup>
  );
}
