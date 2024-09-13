import * as Yup from 'yup';
import {getCurrentTime} from '@/shared/utils/timeUtils';
export const getUsersReportsSchema = Yup.object().shape({
  dateRange: Yup.object().shape({
    startDate: Yup.date()
      .typeError('Start date is required')
      .required('Start date is required'),
    endDate: Yup.date()
      .typeError('End date is required')
      .required('End date is required'),
  }),
  usersIds: Yup.array(),
  type: Yup.string().required(),
});

export const getSingleUserReportSchema = Yup.object().shape({
  dateRange: Yup.object().shape({
    startDate: Yup.date()
      .typeError('Start date is required')
      .required('Start date is required'),
    endDate: Yup.date()
      .typeError('End date is required')
      .required('End date is required'),
  }),
});

export const modifyReportsSchema = Yup.object().shape({
  userId: Yup.object()
    .required('Employee is required')
    .test('is-required', 'Employee is required', function (value) {
      return !!value;
    }),
  date: Yup.date()
    .typeError('Date is required')
    .required('Date is required')
    .test('is-not-future', 'Date cannot be in the future', function (value) {
      return value <= getCurrentTime().toJSDate(); // Not current and future date
    }),
  logs: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.string()
        .test('is-required', 'Start time is required', function (value) {
          return !!value;
        })
        .test(
          'is-greater',
          "Start time must be greater than previous log's end time",
          function (value, context) {
            const {path, from} = context.options;
            const currentIndex = path.match(/\d+/)[0]; // Extract the current index from the path
            const logs = from[1].value.logs;
            const previousLog = logs[currentIndex - 1];

            // If there's a previous log and it has an endTime, compare it
            if (previousLog?.endTime) {
              return parseInt(value) > parseInt(previousLog.endTime);
            }

            // If no previous log or no endTime on previous log, validation passes
            return true;
          }
        ),
      endTime: Yup.string()
        .required('End time is required')
        .test(
          'is-greater',
          "End time must be greater than current log's start time",
          function (value, context) {
            const {path, from} = context.options;
            const currentIndex = path.match(/\d+/)[0]; // Extract the current index from the path
            const logs = from[1].value.logs;

            return (
              parseInt(logs[currentIndex]?.endTime) >
              parseInt(logs[currentIndex]?.startTime)
            );
          }
        ),
      departmentId: Yup.object()
        .typeError('Department is required')
        .required('Department is required'),
      status: Yup.string().required('Status is required'),
    })
  ),
});
