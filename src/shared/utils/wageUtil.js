import {calTimeDiffInMilliseconds} from '@/utils/timeUtils';

export const calculateWage = (startTime, endTime, logStatus, hourlyRate) => {
  if (!startTime || !endTime || !logStatus || !hourlyRate) return '-';
  if (logStatus.toLowerCase() === 'break') {
    return '-';
  }

  const ratePerMili = hourlyRate / 3600000;

  const logInMili = calTimeDiffInMilliseconds(startTime, endTime);

  // Calculate the wage
  const wage = ratePerMili * logInMili;
  return `$${wage.toFixed(2)}`; // Round to 2 decimal places
};
