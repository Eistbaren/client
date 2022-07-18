import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import React from 'react';

import { Query, Timeslot } from '../data';

interface QueryTimeslotTimePickerProps {
  query: Query;
  setQuery: (query: Query) => void;
  label: string;
  timestampToChoose: 'from' | 'to';
  minTime?: number;
  maxTime?: number;
}

/**
 *
 * @param {number} props
 * @return {JSX.Element}
 */
export default function QueryTimeslotTimePicker(
  props: QueryTimeslotTimePickerProps,
) {
  const { query, setQuery, label, timestampToChoose, minTime, maxTime } = props;

  const [error, setError] = React.useState(false);

  const minDate = minTime === undefined ? undefined : new Date(minTime * 1000);
  const maxDate = maxTime === undefined ? undefined : new Date(maxTime * 1000);
  const timestampNotToChoose = timestampToChoose === 'from' ? 'to' : 'from';

  const getTimstampType = (
    timeslot: Timeslot | undefined,
    ttc: 'from' | 'to',
  ): number => {
    if (timeslot === undefined) {
      return 0;
    }

    return timeslot[ttc] ?? 0;
  };

  const handleValueChanged = (value: Date | null) => {
    if (!(value instanceof Date) || isNaN(value?.getHours())) {
      return;
    }
    const newDate = new Date(
      getTimstampType(query.time, timestampToChoose) * 1000,
    );
    newDate.setHours(value?.getHours() ?? 0);
    newDate.setMinutes(value?.getMinutes() ?? 0);

    const diff = (newDate.getTime() - new Date().getTime()) / 3600000;
    console.log(diff);
    if (diff < 12) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    const newTime: Timeslot = {};
    newTime[timestampNotToChoose] = getTimstampType(
      query.time,
      timestampNotToChoose,
    );
    newTime[timestampToChoose] = Math.floor(newDate.valueOf() / 1000);

    setQuery({
      ...query,
      time: newTime,
    });
  };

  return (
    <TimePicker
      value={new Date(getTimstampType(query.time, timestampToChoose) * 1000)}
      onChange={handleValueChanged}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={error && 'Must be at least 12h in the future'}
        />
      )}
      minutesStep={30}
      views={['hours', 'minutes']}
      ampm={false}
      minTime={minDate}
      maxTime={maxDate}
    />
  );
}
