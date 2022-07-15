import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';

interface ComboBoxProps {
  id: string;
  label: string;
  options: Map<number, string>;
  value: number | undefined;
  onChange: (newValue: number) => void;
  onClear: () => void;
}

/**
 * ComboBox
 * @param  {ComboBoxProps} params accepts id, label and selectable options
 * @return {JSX.Element}
 */
export default function ComboBox(params: ComboBoxProps) {
  const { id, label, options, value, onChange, onClear } = params;

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
        value={value || ''}
        endAdornment={
          value === undefined ? undefined : (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
                  onClear();
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }
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
