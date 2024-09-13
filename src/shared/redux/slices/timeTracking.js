import {createSlice} from '@reduxjs/toolkit';
import {handleAsyncRequest} from '@/shared/redux/utils';
import {getRequest, postRequest} from '@/shared/utils/requests';
import {
  trackingModes,
  reportTypes,
} from '@/shared/constants/timeTrackingConstant';
import {
  preparedDeatiledUserReportsData,
  preparedSummaryUserReportsData,
} from '@/shared/utils/reportsDataPrepUtil';

// ----------------------------------------------------------------------
const defaultState = {
  isLoading: false,
  error: null,
  trackingMode: trackingModes.flexible.value, // default is flexible mode
  currentTimeTrack: {},
  detailedReportsPreparedData: {},
  summaryReportsPreparedData: {},
  selectedReportType: null,
  dateRangeValue: {},
  isTrackingActivated: false,
};

const slice = createSlice({
  name: 'timeTracking',
  initialState: defaultState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },

    updateTimeTracking(state, action) {
      state.currentTimeTrack = action.payload;
    },
    setDetailedReportsPreparedData(state, action) {
      const {reports, timezone} = action.payload;
      state.detailedReportsPreparedData =
        reports && reports?.length > 0
          ? preparedDeatiledUserReportsData(reports, timezone)
          : {};
    },
    setSummaryReportsPreparedData(state, action) {
      state.summaryReportsPreparedData =
        action.payload.length > 0
          ? preparedSummaryUserReportsData(action.payload)
          : {};
    },
    setReportTypeOfUser(state, action) {
      state.selectedReportType = action.payload !== '' ? action.payload : null;
    },
    setDateRangeForReports(state, action) {
      state.dateRangeValue = action.payload;
    },
    clearReportData(state, action) {
      state.detailedReportsPreparedData = {};
      state.summaryReportsPreparedData = {};
    },

    updateTrackingMode(state, action) {
      state.trackingMode = action.payload;
    },

    updateActivatedTracking(state, action) {
      state.isTrackingActivated = action.payload;
    },

    resetState(state) {
      const {trackingMode, isTrackingActivated, currentTimeTrack} = state;
      Object.assign(state, {
        ...defaultState,
        trackingMode,
        isTrackingActivated,
        currentTimeTrack,
      });
    },
  },
});

// Reducer
export default slice.reducer;

export const actions = slice.actions;

export const fetchAllReports =
  ({startDate, endDate, usersIds, type}) =>
  async (dispatch, getState) => {
    dispatch(actions.clearReportData());
    const state = getState();
    const currentOrg = state.organization?.currentOrganization;
    const organizationId = currentOrg?.id;
    const timezone = currentOrg?.timezone;

    const payload = {organizationId, startDate, endDate, usersIds, type};

    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: '/time-tracking/reports',
      payload,
      toastMessage: {success: {show: false}, error: {show: true}},
    });
    if (!error) {
      dispatch(actions.setReportTypeOfUser(type));
      dispatch(
        actions.setDateRangeForReports({startDate: startDate, endDate: endDate})
      );
      if (type === reportTypes.detail.value) {
        dispatch(
          actions.setDetailedReportsPreparedData(
            {reports: body?.reports, timezone} || {}
          )
        );
      } else {
        dispatch(actions.setSummaryReportsPreparedData(body.reports || {}));
      }
    }
  };

export const fetchLoggedInUserReports =
  ({startDate, endDate}) =>
  async (dispatch) => {
    dispatch(actions.clearReportData());

    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: getRequest,
      endpoint: `/time-tracking/reports/getOne?startDate=${startDate}&endDate=${endDate}`,
      toastMessage: {success: {show: false}, error: {show: true}},
    });
    if (!error) {
      dispatch(actions.setReportTypeOfUser(reportTypes.detail.value));
      dispatch(
        actions.setDateRangeForReports({startDate: startDate, endDate: endDate})
      );
      dispatch(
        actions.setDetailedReportsPreparedData(
          {reports: body?.reports, timezone} || {}
        )
      );
    }
  };

export const fetchTimeTrack = () => async (dispatch, getState) => {
  const state = getState();

  const organizationId = state.organization.objOfSubDomain?.id;
  const employeeId = state.user.employeeIdForTracking;
  const departmentId = state.department.selectDepartmentForTracking?.id;

  if (!organizationId || !employeeId || !departmentId) return;

  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: `/time-tracking/organizationId/${organizationId}/employeeId/${employeeId}`,
    toastMessage: {success: {show: false}, error: {show: true}},
  });

  if (!error) dispatch(actions.updateTimeTracking(body.tracking || {}));
};

export const startTracking =
  ({status}) =>
  async (dispatch, getState) => {
    const state = getState();

    const organizationId = state.organization.objOfSubDomain?.id;
    const employeeId = state.user.employeeIdForTracking;
    const departmentId = state.department.selectDepartmentForTracking?.id;

    if (!organizationId || !employeeId || !departmentId) return;

    const payload = {
      organizationId,
      departmentId,
      employeeId,
      status,
    };

    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: `/time-tracking`,
      payload,
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (error) throw error;

    dispatch(actions.updateTimeTracking(body.tracking));
  };

export const activateTracking = () => async (dispatch) => {
  const {error} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: postRequest,
    endpoint: `/time-tracking/activate`,
    toastMessage: {success: {show: true}, error: {show: true}},
  });

  if (error) throw error;
  dispatch(actions.updateTrackingMode(trackingModes.strict.value));
  dispatch(actions.updateActivatedTracking(true));
};

export const verifyActivatedTracking = () => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: `/time-tracking/verify-activation`,
    toastMessage: {success: {show: false}, error: {show: true}},
  });

  if (!error) {
    dispatch(
      actions.updateActivatedTracking(body?.tracking?.isActivated || false)
    );
  }
};

export const deactivateTracking = () => async (dispatch) => {
  const {error} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: postRequest,
    endpoint: `/time-tracking/deactivate`,
    toastMessage: {success: {show: true}, error: {show: true}},
  });

  if (error) throw error;
  dispatch(actions.updateTrackingMode(trackingModes.flexible.value));
  dispatch(actions.updateTimeTracking({}));
  dispatch(actions.updateActivatedTracking(false));
};

export const deactivateTrackingFromAllDevices = () => async (dispatch) => {
  const {error} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: postRequest,
    endpoint: `/time-tracking/deactivate-all-active-timers`,
    toastMessage: {success: {show: true}, error: {show: true}},
  });

  if (error) throw error;
  dispatch(actions.updateTrackingMode(trackingModes.flexible.value));
  dispatch(actions.updateTimeTracking({}));
  dispatch(actions.updateActivatedTracking(false));
};

export const modifyEntries = (payload) => async (dispatch) => {
  const {error} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: postRequest,
    endpoint: `/time-tracking/entries`,
    payload,
    toastMessage: {success: {show: true}, error: {show: true}},
  });
  if (error) throw error;
};

export const cleanReports = () => async (dispatch) => {
  dispatch(actions.setDetailedReportsPreparedData({}));
  dispatch(actions.setSummaryReportsPreparedData({}));
};

export const isTimeTrackingLoading = (state) => state.timeTracking.isLoading;
export const getTimeTrackingErrors = (state) => state.timeTracking.error;

export const getCurrentTimeTracking = (state) =>
  state.timeTracking.currentTimeTrack;

export const getTrackingMode = (state) => state.timeTracking.trackingMode;

export const getPreparedData = (state) =>
  state.timeTracking.detailedReportsPreparedData;

export const getSummaryReportPreparedData = (state) =>
  state.timeTracking.summaryReportsPreparedData;

export const getSelectedReportType = (state) =>
  state.timeTracking.selectedReportType;

export const getReportDateRange = (state) => state.timeTracking.dateRangeValue;

export const hasTrackingActivated = (state) =>
  state.timeTracking.isTrackingActivated;
