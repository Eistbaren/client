import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

/**
 * ComboBox
 * @param  {{id: string, label: string, options: Array<string>}} params accepts id, label and selectable options
 * @return {JSX.Element}
 */
export default function ComboBox(params: {
  id: string;
  label: string;
  options: Map<number, string>;
  defaultValue: number | undefined;
  onChange: (newValue: number) => void;
}) {
  const { id, label, options, defaultValue, onChange } = params;

  const optionsArray: Array<[string, number]> = [];
  options.forEach((value, key) => optionsArray.push([value, key]));

  return (
    <FormControl fullWidth>
      <InputLabel id={`filter-input-${id}-label`}>{label}</InputLabel>
      <Select
        variant='outlined'
        labelId={`filter-input-${id}-label`}
        label={label}
        onChange={e => onChange(e.target.value as number)}
        defaultValue={defaultValue}
      >
        {optionsArray.map(([option, optionKey]) => (
          <MenuItem key={`filter-${id}-option-${optionKey}`} value={optionKey}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
