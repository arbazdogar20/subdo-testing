import {createSlice} from '@reduxjs/toolkit';

import {fetchPositions} from './positions';
import {fetchEmployees, fetchManagers} from './user';
import {fetchDepartments} from './department';

import {ROLES} from '@/constants/roles';
import {trackingModes} from '@/shared/constants/timeTrackingConstant';
import {fetchTimeTrack} from './timeTracking';

// ----------------------------------------------------------------------
const defaultState = {
  language: 'english',
  isFetchingInitialPublicData: false,
  isFetchingInitialAppData: false,
};

const slice = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers: {
    setAppLanguage(state, action) {
      state.language = action.payload;
    },

    setIsFetchingInitialPublicData(state, action) {
      state.isFetchingInitialPublicData = action.payload;
    },

    setIsFetchingIntialAppData(state, action) {
      state.isFetchingInitialAppData = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export const actions = slice.actions;

export const setAppLanguage =
  ({language}) =>
  (dispatch) =>
    dispatch(actions.setAppLanguage(language));

export const getAppLanguage = (state) => state.app.language;

export const getInitialPublicData = () => async (dispatch, getState) => {
  const state = getState();
  const trackingMode = state.timeTracking.trackingMode;

  await dispatch(actions.setIsFetchingInitialPublicData(true));
  if (trackingMode === trackingModes.flexible.value) {
    await dispatch(fetchTimeTrack());
  }
  await dispatch(fetchDepartments());
  await dispatch(actions.setIsFetchingInitialPublicData(false));
};

export const getInitialAppData = () => async (dispatch, getState) => {
  const {admin, manager} = ROLES;
  const state = getState();
  const currUserRole = state.user.currentUser?.systemRole;
  await dispatch(actions.setIsFetchingIntialAppData(true));
  if (currUserRole === admin.value) {
    await dispatch(fetchManagers());
  } else if (currUserRole === manager.value) {
    await dispatch(fetchEmployees());
    await dispatch(fetchPositions());
    await dispatch(fetchDepartments());
  }
  await dispatch(actions.setIsFetchingIntialAppData(false));
};

export const isFetchingInitialPublicData = (state) =>
  state.app.isFetchingInitialPublicData;

export const isFetchingInitialAppData = (state) =>
  state.app.isFetchingInitialAppData;
