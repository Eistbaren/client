import { Typography } from '@mui/material';
import { Timeslot } from '../data/api';

interface TimeslotTextProps {
  timeslot: Timeslot | undefined;
}

/**
 * Convert a timeslot to a string
 * @param {Timeslot} timeslot The timeslot to convert
 * @return {string}
 */
export function timeslotToText(timeslot?: Timeslot) {
  const unixTimestampToTimeOfDay = (unixTimestamp?: number) => {
    if (!unixTimestamp) {
      return '';
    }

    return new Date(unixTimestamp * 1000).toLocaleTimeString('de-DE', {
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return `${unixTimestampToTimeOfDay(
    timeslot?.from,
  )}-${unixTimestampToTimeOfDay(timeslot?.to)}`;
}

/**
 *
 * @param {Timeslot} timeslot
 * @return {string}
 */
export function timeslotToDate(timeslot?: Timeslot) {
  const unixTimestampToDate = (unixTimestamp?: number) => {
    if (!unixTimestamp) {
      return '';
    }

    return new Date(unixTimestamp * 1000)
      .toLocaleTimeString('de-DE', {
        day: 'numeric',
        month: 'numeric',
      })
      .split(',')[0];
  };

  const from = unixTimestampToDate(timeslot?.from);
  const to = unixTimestampToDate(timeslot?.to);
  if (from === to) {
    return from;
  }

  return `${from}-${to}`;
}

/**
 * Convert a timeslot to a text element in the form of 00:00-01:00
 * @param {TimeslotTextProps} props
 * @return {JSX.Element}
 */
export default function TimeslotText(props: TimeslotTextProps) {
  const { timeslot } = props;

  return <Typography>{timeslotToText(timeslot)}</Typography>;
}
