import {DateTime, Duration} from 'luxon';

export const getFormattedTime = (milliseconds) => {
  if (milliseconds === 0) return '00:00:00';
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsInMinutes = remainingSeconds % 60;
  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');
  const ss = remainingSecondsInMinutes.toString().padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
};

export const getCurrentTime = (zone) => {
  return DateTime.now().setZone(zone);
};

export const millisecondsToHHMM = (milliseconds) => {
  const duration = Duration.fromMillis(milliseconds);
  const formattedDuration = duration.toFormat('hh:mm');
  return formattedDuration;
};

export const getFormattedDate = (date, format) => {
  return DateTime.fromJSDate(date).toFormat(format);
};

export const getFormattedISODate = (date, timezone) => {
  return DateTime.fromISO(date, {zone: timezone});
};

export const calculateTimeDifference = (
  startTime,
  endTime,
  returnHours = false
) => {
  if (
    !startTime ||
    !endTime ||
    typeof startTime !== 'string' ||
    typeof endTime !== 'string'
  ) {
    return '-';
  }

  // Parse start and end times using Luxon's DateTime
  const start = DateTime.fromFormat(startTime, 'HH:mm');
  const end = DateTime.fromFormat(endTime, 'HH:mm');

  // Calculate the difference in milliseconds
  let diffMilliseconds = end.diff(start).toMillis();

  // If the difference is negative, adjust for next day scenario
  if (diffMilliseconds < 0) {
    diffMilliseconds += Duration.fromObject({hours: 24}).toMillis();
  }

  // If returnHours is true, return the difference in hours as a decimal representation
  if (returnHours) {
    const diffHours = Duration.fromMillis(diffMilliseconds).as('hours');
    return diffHours.toFixed(1);
  }

  // Calculate hours and minutes from the total difference in milliseconds
  const duration = Duration.fromMillis(diffMilliseconds);
  const diffHours = Math.floor(duration.as('hours'));
  const remainingMinutes = Math.floor(duration.as('minutes')) % 60;

  // Format hours and minutes to ensure two digits
  const formattedHours = String(diffHours).padStart(2, '0');
  const formattedMinutes = String(remainingMinutes).padStart(2, '0');

  // Return the formatted time difference
  return `${formattedHours}:${formattedMinutes}`;
};

export const convertDateFormat = (date) => {
  if (!date || typeof date !== 'string') return '-';

  // Parse the date using Luxon's DateTime
  const parsedDate = DateTime.fromFormat(date, 'yyyy-MM-dd');

  // Check if the date is valid
  if (!parsedDate.isValid) return '-';

  // Format the date to MM-dd-yyyy
  const formattedDate = parsedDate.toFormat('MM-dd-yyyy');

  return formattedDate;
};

export const formatDate = (dateString, timezone) => {
  if (!dateString) return '';

  // Parse the date string using Luxon's DateTime
  const date = DateTime.fromISO(dateString).setZone(timezone);

  // Check if date parsing was successful
  if (!date.isValid) return '';

  // Format the date to MM/dd/yyyy
  const formattedDate = date.toFormat('MM/dd/yyyy');

  return formattedDate;
};

export const formatTime = (timeString, showAMandPM = false, timezone) => {
  if (!timeString) return '';

  // Parse the time string using Luxon's DateTime
  const time = DateTime.fromISO(timeString).setZone(timezone);

  // Check if time parsing was successful
  if (!time.isValid) return '';

  // Define the format based on the showAMandPM flag
  const format = showAMandPM ? 'hh:mm a' : 'HH:mm';

  // Format the time using Luxon's toFormat method
  return time.toFormat(format);
};

export const getDayOfWeek = (dateString, timezone) => {
  if (!dateString) return '';

  // Parse the date string using Luxon's DateTime
  const date = DateTime.fromISO(dateString, {setZone: timezone});

  // Check if date parsing was successful
  if (!date.isValid) return '';

  // Get the abbreviated name of the day
  return date.toFormat('ccc');
};

export const getWeekOfMonth = (dateStr, timezone) => {
  // Parse the date string using Luxon's DateTime
  const date = DateTime.fromISO(dateStr, {setZone: timezone});

  // Check if the parsed date is valid
  if (!date.isValid) {
    return '-';
  }

  // Get the day of the month
  const dayOfMonth = date.day;

  // Get the day of the week for the first day of the month
  const firstDayOfWeek = date.startOf('month').weekday; // 1 (Monday) to 7 (Sunday)

  // Calculate the week number based on the day of the month and the day of the week of the first day of the month
  const weekNumber = Math.ceil((dayOfMonth + firstDayOfWeek - 1) / 7);

  return String(weekNumber); // Ensure the return type is a string
};

export const calTimeDiffInMilliseconds = (startTime, endTime) => {
  // Parse the ISO strings into Luxon DateTime objects
  const start = DateTime.fromISO(startTime);
  const end = DateTime.fromISO(endTime);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = end.diff(start, 'milliseconds').milliseconds;

  return diffInMilliseconds;
};

export const calTimeDiffInHrousAndMins = (startTime, endTime) => {
  // Calculate the difference in milliseconds
  const diffInMilliseconds = calTimeDiffInMilliseconds(startTime, endTime);

  // Calculate the difference in hours and minutes
  const formattedDuration = millisecondsToHHMM(diffInMilliseconds);

  return formattedDuration;
};
