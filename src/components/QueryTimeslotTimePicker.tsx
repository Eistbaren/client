import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { useEffect } from 'react';

import { Query, Timeslot } from '../data';

interface QueryTimeslotTimePickerProps {
  query: Query;
  setQuery: (query: Query) => void;
  invalidDate: string;
  setInvalidDate: (invalid: string) => void;
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
  const {
    query,
    setQuery,
    invalidDate,
    setInvalidDate,
    label,
    timestampToChoose,
    minTime,
    maxTime,
  } = props;

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

  useEffect(() => {
    const diff =
      (getTimstampType(query.time, timestampToChoose) -
        new Date().getTime() / 1000) /
      3600;
    if (diff < 12) {
      setInvalidDate('must be at least 12h in the future!');
      return;
    }
    if (
      new Date(
        getTimstampType(query.time, timestampToChoose) * 1000,
      ).getMinutes() %
        30 !==
      0
    ) {
      setInvalidDate('must be in 30 min intervals!');
    } else {
      setInvalidDate('');
    }
  }, [query]);

  const handleValueChanged = (value: Date | null) => {
    if (!(value instanceof Date) || isNaN(value?.getHours())) {
      return;
    }
    const newDate = new Date(
      getTimstampType(query.time, timestampToChoose) * 1000,
    );
    newDate.setHours(value?.getHours() ?? 0);
    newDate.setMinutes(value?.getMinutes() ?? 0);
    newDate.setSeconds(0);

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
          label={label}
          error={invalidDate !== ''}
          helperText={invalidDate}
          {...params}
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
