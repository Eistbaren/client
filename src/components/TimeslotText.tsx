import { Typography } from '@mui/material';
import { Timeslot } from '../data/api';

interface TimeslotTextProps {
  timeslot: Timeslot | undefined;
}

/**
 * Convert a timeslot to a text element in the form of 00:00-01:00
 * @param {TimeslotTextProps} props
 * @return {JSX.Element}
 */
export default function TimeslotText(props: TimeslotTextProps) {
  const { timeslot } = props;

  const unixTimestampToTimeOfDay = (unixTimestamp?: number) => {
    if (!unixTimestamp) {
      return '';
    }

    return new Date(unixTimestamp * 1000).toLocaleTimeString('de-DE', {
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <Typography>
      {unixTimestampToTimeOfDay(timeslot?.from)}-
      {unixTimestampToTimeOfDay(timeslot?.to)}
    </Typography>
  );
}
