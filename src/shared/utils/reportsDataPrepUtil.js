import {
  calculateTimeDifference,
  calTimeDiffInHrousAndMins,
  formatDate,
  formatTime,
  getDayOfWeek,
  getFormattedISODate,
  getWeekOfMonth,
  millisecondsToHHMM,
} from '@/utils/timeUtils';
import {calculateWage} from '@/utils/wageUtil';
import * as Sentry from '@sentry/nextjs';

export const preparedDeatiledUserReportsData = (data, timezone) => {
  if (!data[0]?.userId) return {};
  let transformedData = {};
  let finalData = {};

  try {
    for (const entry of data) {
      const userId = entry.userId;
      if (!transformedData[userId]) {
        transformedData[userId] = {
          id: entry.id,
          userId: entry.userId,
          employeeName: entry.name,
          employeeEmail: entry.email,
          employeeId: entry.employeeId,
          designation: entry.position,
          hourlyRate: entry.rate,
          totalTrackedHours: entry.totalActiveTime,
          totalWageOfEmployee: entry.totalWage,
          totalBreakHours: entry.totalBreakTime,
          weeks: [],
        };
      } else {
        transformedData[userId].totalTrackedHours += entry.totalActiveTime;
        transformedData[userId].totalWageOfEmployee += entry.totalWage;
        transformedData[userId].totalBreakHours += entry.totalBreakTime;
      }

      const week = getWeekOfMonth(entry.date, timezone);
      const month = getFormattedISODate(entry.date, timezone).month;
      const year = getFormattedISODate(entry.date, timezone).year;
      const weekIdentifier = `${year}-${month}-${week}`;

      const weekData = transformedData[userId].weeks.find(
        (w) => w.weekIdentifier === weekIdentifier
      );

      // check if week doesn't exists
      if (!weekData) {
        transformedData[userId].weeks.push({
          weekIdentifier,
          weekNumber: week,
          weekTotalHours: entry.totalActiveTime,
          weeklyBreakHours: entry.totalBreakTime,
          weekWage: entry.totalWage,
          days: [prepareDayData(entry, timezone)],
        });
        // check if week exists then push day
      } else {
        weekData.days.push(prepareDayData(entry, timezone));
        weekData.weekTotalHours += entry.totalActiveTime;
        weekData.weeklyBreakHours += entry.totalBreakTime;
        weekData.weekWage += entry.totalWage;
      }
    }

    // prepare final data
    finalData = finalizedReportDetailsData(transformedData);
  } catch (error) {
    Sentry.captureException(error);
  }
  return finalData;
};

// prepare day logs
export const prepareDayLogs = (entry, timezone) => {
  const dayLogs = entry.logs.map((log, index) => ({
    startTime:
      entry.isMissedPunchIn && index === 0
        ? '---'
        : formatTime(log.startTime, true, timezone),
    endTime:
      entry.isMissedPunchOut && index === entry.logs.length - 1
        ? '---'
        : formatTime(log.endTime, true, timezone),
    department: log.department,
    status: log.status === 'checkin' ? 'working' : 'break',
    hoursAndMinutes: calTimeDiffInHrousAndMins(log.startTime, log.endTime),
    hours: calculateTimeDifference(
      formatTime(log.startTime),
      formatTime(log.endTime),
      true
    ),
    wage:
      entry.rate === 0
        ? '-'
        : calculateWage(log.startTime, log.endTime, log.status, entry.rate),
  }));

  return dayLogs;
};

// prepare day data
export const prepareDayData = (entry, timezone) => {
  const obj = {
    date: entry.date,
    day: getDayOfWeek(entry.date, timezone),
    dateIn: formatDate(entry.logs[0].startTime, timezone),
    dateOut: formatDate(entry.logs[entry.logs.length - 1].endTime, timezone),
    dayTrackedHours: millisecondsToHHMM(entry.totalActiveTime),
    dayBreakHours: millisecondsToHHMM(entry.totalBreakTime),
    dayWage: entry.rate === 0 ? '-' : entry.totalWage,
    logs: prepareDayLogs(entry, timezone),
    isMissedPunchIn: entry?.isMissedPunchIn,
    isMissedPunchOut: entry?.isMissedPunchOut,
    isEdited: entry.isEdited,
  };

  return obj;
};

// format week data
export const formatWeekData = (data, rate) => {
  let formatedData = [];
  const isRateZero = rate === 0;

  for (const elem of data) {
    const weekTotalHours = millisecondsToHHMM(elem.weekTotalHours);
    const weekWage = isRateZero ? '-' : Number(elem.weekWage).toFixed(2);
    const weeklyBreakHours = millisecondsToHHMM(elem.weeklyBreakHours);

    formatedData.push({...elem, weekTotalHours, weekWage, weeklyBreakHours});
  }

  return formatedData;
};

// prepare finalized detailed report data
export const finalizedReportDetailsData = (data) => {
  let finalData = {};

  Object.entries(data).forEach(([key, value]) => {
    const totalHoursWorked = millisecondsToHHMM(value.totalTrackedHours);
    const totalWages = value.totalWageOfEmployee;
    const totalBreakHours = millisecondsToHHMM(value.totalBreakHours);
    const rate = value.hourlyRate;

    if (!finalData[key]) {
      finalData[key] = value;
      finalData[key].weeks = formatWeekData(value.weeks, rate);
      finalData[key].totalTrackedHours = totalHoursWorked;
      finalData[key].totalWageOfEmployee = totalWages.toFixed(2);
      finalData[key].totalBreakHours = totalBreakHours;
      finalData[key].totalHoursWorked = totalHoursWorked;
    }
  });

  return finalData;
};

// Prepare summary user report data
export const preparedSummaryUserReportsData = (data) => {
  let transformedData = {
    users: [],
    totalHoursWorked: 0,
    totalWages: 0,
  };

  if (
    !data ||
    !Array.isArray(data) ||
    data.length === 0 ||
    !data[0].employeeId
  ) {
    return transformedData;
  }

  try {
    data.forEach((report) => {
      const employeeName = report.name || '-';
      const employeeType = report.position || '-';
      const employeeNumber = report.employeeId || '-';
      const totalHoursWorked = report.totalActiveTime
        ? millisecondsToHHMM(report.totalActiveTime)
        : '-';
      const totalWages =
        typeof report.totalWage === 'number'
          ? Number(report.totalWage.toFixed(2))
          : '-';

      transformedData.users.push({
        employeeName,
        employeeType,
        employeeNumber,
        totalHoursWorked,
        totalWages,
      });

      // Sum up total hours worked and total wages
      transformedData.totalHoursWorked +=
        typeof report.totalActiveTime === 'number' ? report.totalActiveTime : 0;
      transformedData.totalWages +=
        typeof report.totalWage === 'number' ? report.totalWage : 0;
    });

    // Convert total hours worked to HH:MM format
    transformedData.totalHoursWorked = transformedData.totalHoursWorked
      ? millisecondsToHHMM(transformedData.totalHoursWorked)
      : '-';
    // Convert total wages to number and format to 2 decimal places
    transformedData.totalWages = transformedData.totalWages
      ? Number(transformedData.totalWages.toFixed(2))
      : '-';
  } catch (error) {
    Sentry.captureException(error);
  }
  return transformedData;
};
