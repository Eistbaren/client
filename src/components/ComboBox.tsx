import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

/**
 * ComboBox
 * @param  {{id: string, label: string, options: Array<string>}} params accepts id, label and selectable options
 * @return {JSX.Element}
 */
export default function ComboBox(params: {
  id: string;
  label: string;
  options: Array<string>;
}) {
  const { id, label, options } = params;
  return (
    <FormControl fullWidth>
      <InputLabel id={`filter-input-${id}-label`}>{label}</InputLabel>
      <Select
        variant='outlined'
        labelId={`filter-input-${id}-label`}
        label={label}
      >
        {options.map((option, optionKey) => (
          <MenuItem key={`filter-${id}-option-${optionKey}`} value={optionKey}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
