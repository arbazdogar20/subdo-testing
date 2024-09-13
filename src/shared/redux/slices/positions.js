import {createSlice} from '@reduxjs/toolkit';
import {handleAsyncRequest} from '@/shared/redux/utils';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/shared/utils/requests';

const defaultState = {
  isLoading: false,
  error: null,
  list: [],
};

const slice = createSlice({
  name: 'positions',
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

    addPositionToList(state, action) {
      state.list.push(action.payload);
    },

    updatePosition(state, action) {
      const updatedPosition = action.payload;
      state.list = state.list.map((item) =>
        item?.id === updatedPosition?.id ? updatedPosition : item
      );
    },

    deletePosition(state, action) {
      const deletedPosition = action.payload;
      state.list = state.list.filter((item) => item.id !== deletedPosition);
    },

    resetState: () => defaultState,
  },
});

// Reducer
export default slice.reducer;

export const actions = slice.actions;

export const fetchPositions = () => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: '/positions',
    toastMessage: {success: {show: false}, error: {show: true}},
  });

  if (!error) dispatch(actions.setList(body.positions));
};

export const addPosition =
  ({name}) =>
  async (dispatch) => {
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: `/positions`,
      payload: {name},
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (!error) dispatch(actions.addPositionToList(body.positions));
  };

export const updatePosition =
  ({name, id}) =>
  async (dispatch) => {
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: patchRequest,
      endpoint: `/positions/${id}`,
      payload: {name},
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (!error) dispatch(actions.updatePosition(body?.positions));
  };

export const deletePosition =
  ({id}) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: deleteRequest,
      endpoint: `/positions/${id}`,
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (!error) dispatch(actions.deletePosition(id));
  };

export const isPositionsLoading = (state) => state.positions.isLoading;
export const getPositionsErrors = (state) => state.positions.error;

export const getPositionsList = (state) => state.positions.list;
