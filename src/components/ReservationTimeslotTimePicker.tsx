import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';

import { Reservation, Timeslot } from '../data/api';

interface ReservationTimeslotTimePickerProps {
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
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
export default function ReservationTimeslotTimePicker(
  props: ReservationTimeslotTimePickerProps,
) {
  const {
    reservation,
    setReservation,
    label,
    timestampToChoose,
    minTime,
    maxTime,
  } = props;

  const minDate = minTime === undefined ? undefined : new Date(minTime);
  const maxDate = maxTime === undefined ? undefined : new Date(maxTime);
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
    const newDate = new Date(
      getTimstampType(reservation.time, timestampToChoose),
    );
    newDate.setHours(value?.getHours() ?? 0);
    newDate.setMinutes(value?.getMinutes() ?? 0);

    const newTime: Timeslot = {};
    newTime[timestampNotToChoose] = getTimstampType(
      reservation.time,
      timestampNotToChoose,
    );
    newTime[timestampToChoose] = newDate.valueOf();

    setReservation({
      ...reservation,
      time: newTime,
    });
  };

  return (
    <TimePicker
      value={new Date(getTimstampType(reservation.time, timestampToChoose))}
      onChange={value => handleValueChanged(value)}
      renderInput={params => <TextField {...params} label={label} />}
      minutesStep={30}
      views={['hours', 'minutes']}
      ampm={false}
      minTime={minDate}
      maxTime={maxDate}
    />
  );
}
