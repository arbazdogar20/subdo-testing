import {createSlice} from '@reduxjs/toolkit';
import {handleAsyncRequest} from '@/shared/redux/utils';
import {getRequest, patchRequest} from '@/shared/utils/requests';

import {actions as timeTrackingActions} from '@/shared/redux/slices/timeTracking';
import {
  fetchDepartments,
  actions as departmentActions,
} from '@/shared/redux/slices/department';
import {actions as userActions} from '@/shared/redux/slices/user';

import {trackingModes} from '@/shared/constants/timeTrackingConstant';
import {ROLES} from '@/shared/constants/roles';

const {flexible} = trackingModes;

// ----------------------------------------------------------------------
const defaultState = {
  isLoading: false,
  error: null,
  list: [],
  currentOrganization: {},
  objOfSubDomain: null,
};

const slice = createSlice({
  name: 'organization',
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

    setList(state, action) {
      state.list = action.payload;
    },

    setCurrentOrganization(state, action) {
      state.currentOrganization = action.payload;
    },

    setObjOfSubDomain(state, action) {
      state.objOfSubDomain = action.payload;
    },

    resetState: (state) => {
      const {objOfSubDomain} = state;
      Object.assign(state, {
        ...defaultState,
        objOfSubDomain,
      });
    },
  },
});

// Reducer
export default slice.reducer;

export const actions = slice.actions;

export const fetchOrganizations = () => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: '/organizations',
    toastMessage: {success: {show: false}, error: {show: true}},
  });

  if (error) throw error;

  dispatch(actions.setList(body.organizations));
};

export const findOrganizationByDomain =
  ({domain}) =>
  async (dispatch) => {
    const isAdmin = domain === ROLES.admin.value;

    if (isAdmin) {
      dispatch(actions.setObjOfSubDomain({id: null, domain}));
      return ROLES.admin.value;
    }

    const {body, error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: getRequest,
      endpoint: `/organizations/${domain}`,
      toastMessage: {success: {show: false}, error: {show: true}},
    });

    if (error) throw error;
    const id = body?.organization?.id || null;
    const data = id ? {id, domain} : null;
    dispatch(actions.setObjOfSubDomain(data));
    return body?.organization;
  };

export const isOrganizationLoading = (state) => state.organization.isLoading;
export const getOrganizationErrors = (state) => state.organization.error;

export const getOrganizations = (state) => state.organization.list;

export const getCurrentOrganization = (state) =>
  state.organization.currentOrganization;

export const getObjForSubdomain = (state) => state.organization.objOfSubDomain;

export const updateOrganizations =
  ({name, cutOffTime, organizationId, trackingMode}) =>
  async (dispatch) => {
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: patchRequest,
      endpoint: `/organizations/${organizationId}`,
      payload: {name, cutOffTime, trackingMode},
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (error) throw error;
    dispatch(actions.setCurrentOrganization(body?.organization));
    dispatch(
      timeTrackingActions.updateTrackingMode(body?.organization.trackingMode)
    );
    if (body?.organization.trackingMode === flexible.value) {
      dispatch(departmentActions.setDepartmentForTracking(''));
      dispatch(userActions.setEmployeeIdForTracking(''));
    }
  };
