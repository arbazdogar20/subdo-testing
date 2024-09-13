import {createSlice} from '@reduxjs/toolkit';
import {handleAsyncRequest} from '@/shared/redux/utils';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/shared/utils/requests';
import {trackingModes} from '@/shared/constants/timeTrackingConstant';

// ----------------------------------------------------------------------
const defaultState = {
  isLoading: false,
  error: null,
  list: [],
  selectDepartmentForTracking: '',
};

const slice = createSlice({
  name: 'department',
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

    setDepartmentForTracking(state, action) {
      state.selectDepartmentForTracking = action.payload;
    },

    resetState: (state) => {
      const {selectDepartmentForTracking, list} = state;
      Object.assign(state, {
        ...defaultState,
        selectDepartmentForTracking,
        list,
      });
    },

    addDepartmentToList(state, action) {
      state.list.push(action.payload);
    },

    updateDepartment(state, action) {
      const updatedDepartment = action.payload;
      state.list = state.list.map((item) =>
        item?.id === updatedDepartment?.id ? updatedDepartment : item
      );
    },

    deleteDepartment(state, action) {
      const deletedDepartmentId = action.payload;
      state.list = state.list.filter((item) => item.id !== deletedDepartmentId);
    },
  },
});

// Reducer
export default slice.reducer;

export const actions = slice.actions;

export const fetchDepartments = () => async (dispatch, getState) => {
  const state = getState();
  const organizationId = state.organization.objOfSubDomain?.id;

  if (!organizationId) return;

  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: `/departments?organizationId=${organizationId}`,
    toastMessage: {success: {show: false}, error: {show: false}},
  });
  if (error) throw error;
  dispatch(actions.setList(body.departments));
};

export const setDepartmentForTracking = (department) => async (dispatch) => {
  await dispatch(actions.setDepartmentForTracking(department));
};

export const isDepartmentLoading = (state) => state.department.isLoading;
export const getDepartmentErrors = (state) => state.department.error;

export const getDepartments = (state) => state.department.list;

export const getDepartmentForTracking = (state) =>
  state.department.selectDepartmentForTracking;

export const addDepartment = (data) => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: postRequest,
    endpoint: `/departments`,
    payload: data,
    toastMessage: {success: {show: true}, error: {show: true}},
  });
  if (body) dispatch(actions.addDepartmentToList(body?.department));
  if (error) throw error;
};

export const updateDepartment =
  ({name, id}) =>
  async (dispatch) => {
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: patchRequest,
      endpoint: `/departments/${id}`,
      payload: {name},
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (!error) {
      dispatch(actions.updateDepartment(body?.department));
    } else {
      throw error;
    }
  };

export const deleteDepartment =
  ({id}) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: deleteRequest,
      endpoint: `/departments/${id}`,
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (!error) {
      dispatch(actions.deleteDepartment(id));
    } else {
      throw error;
    }
  };
