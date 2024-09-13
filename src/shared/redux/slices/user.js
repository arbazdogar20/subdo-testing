import {createSlice} from '@reduxjs/toolkit';
import {handleAsyncRequest, resetAllSlices} from '@/shared/redux/utils';
import {getRequest, patchRequest, postRequest} from '@/shared/utils/requests';
import {actions as OrganizationActions} from './organization';

// ----------------------------------------------------------------------
const defaultState = {
  isLoading: false,
  error: null,
  unverifiedUserEmail: null,
  currentUser: null,
  list: [],
  employeeIdForTracking: '',
};

const slice = createSlice({
  name: 'user',
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
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setUnverifiedUserEmail(state, action) {
      state.unverifiedUserEmail = action.payload;
    },
    setUsersList(state, action) {
      state.list = action.payload;
    },
    addInvitedUserToList(state, action) {
      state.list.push(action.payload);
    },
    setEmployeeIdForTracking(state, action) {
      state.employeeIdForTracking = action.payload;
    },

    addListOfInvitedUserToList(state, action) {
      state.list = state.list.concat(action.payload);
    },

    updateUser(state, action) {
      const updatedUser = action.payload;
      state.list = state.list.map((user) => {
        return user?.id === updatedUser?.id ? updatedUser : user;
      });
    },

    resetState: (state) => {
      const {employeeIdForTracking} = state;
      Object.assign(state, {...defaultState, employeeIdForTracking});
    },
  },
});

// Reducer
export default slice.reducer;

export const actions = slice.actions;

export const signInUser =
  ({email, password}) =>
  async (dispatch) => {
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: '/users/login',
      payload: {email, password},
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (!error) {
      dispatch(actions.setCurrentUser(body.user));
      dispatch(
        OrganizationActions.setCurrentOrganization(body.currentOrganization)
      );
    } else {
      throw error;
    }
  };

// Register As Manager
export const registerManager =
  ({
    firstName,
    lastName,
    password,
    token,
    organizationName,
    timezone,
    trackingMode,
    domain,
  }) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: `/users/register/manager/${token}`,
      payload: {
        firstName,
        lastName,
        password,
        organizationName,
        timezone,
        trackingMode,
        domain,
      },
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (error) throw error;
  };

// Update User
export const updateUser =
  ({id, firstName, lastName, email, password}) =>
  async (dispatch) => {
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: patchRequest,
      endpoint: `/users/${id}`,
      payload: {firstName, lastName, email, password},
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (!error) {
      dispatch(actions.setCurrentUser({body}));
    } else {
      throw error;
    }
  };
export const getLoginUser = () => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: '/users/me',
    errorOnlyToasts: true,
    payload: {firstName, lastName, email, password},
    toastMessage: {success: {show: true}, error: {show: true}},
  });

  if (!error) {
    dispatch(actions.setCurrentUser(body));
  } else {
    throw error;
  }
};

export const setUnverifiedUserEmail =
  ({email}) =>
  (dispatch) =>
    dispatch(actions.setUnverifiedUserEmail(email));
export const verifyUser =
  ({token}) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: `/users/verify/new/${token}`,
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (error) throw error;
  };

// Resend Verification Link
export const resendVerificationLink = () => async (dispatch, getState) => {
  const state = getState();
  const unverifiedUserEmail = state.user.unverifiedUserEmail;
  const {error} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: postRequest,
    endpoint: '/users/verify/refresh',
    payload: {email: unverifiedUserEmail},
    toastMessage: {success: {show: true}, error: {show: true}},
  });
  if (error) throw error;
};

export const sendResetPasswordLink =
  ({email}) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: '/users/forgot-password',
      payload: {email},
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (error) throw error;
  };

export const resetPassword =
  ({password, token}) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: patchRequest,
      endpoint: `/users/reset/${token}`,
      payload: {password},
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (error) throw error;
  };

export const signOutUser = () => async (dispatch) => {
  const {error} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: postRequest,
    endpoint: `/users/logout`,
    toastMessage: {success: {show: false}, error: {show: true}},
  });
  if (error) throw error;
  dispatch(resetAllSlices());
};

export const fetchManagers = () => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: `/users/managers`,
    toastMessage: {success: {show: false}, error: {show: true}},
  });
  if (error) throw error;
  if (body) dispatch(actions.setUsersList(body?.users));
};

export const getUsersList = (state) => state.user.list;

export const inviteManager =
  ({email, systemRole, firstName, lastName}) =>
  async (dispatch) => {
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: `/users/invite/manager`,
      payload: {email, systemRole, firstName, lastName},
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (body) dispatch(actions.addInvitedUserToList(body?.user));
    if (error) throw error;
  };

export const reInviteManager =
  ({email, systemRole}) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: `/users/invite/manager/refresh`,
      payload: {email, systemRole},
      toastMessage: {success: {show: true}, error: {show: true}},
    });
    if (error) throw error;
  };

export const setEmployeeIdForTracking = (id) => async (dispatch) =>
  await dispatch(actions.setEmployeeIdForTracking(id));

// state selector
export const isUserLoading = (state) => state.user.isLoading;

export const getUserErrors = (state) => state.user.error;

export const getCurrentUser = (state) => state.user.currentUser;
export const getUnverifiedEmail = (state) => state.user.unverifiedUserEmail;

export const getEmployeeForTracking = (state) =>
  state.user.employeeIdForTracking;
export const fetchEmployees = () => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: `/users/employees`,
    toastMessage: {success: {show: false}, error: {show: true}},
  });
  if (error) throw error;
  if (body) dispatch(actions.setUsersList(body?.users));
};

export const addEmployee = (data) => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: postRequest,
    endpoint: `/users/employees`,
    payload: data,
    toastMessage: {success: {show: true}, error: {show: true}},
  });
  if (body) dispatch(actions.addInvitedUserToList(body?.user));
  if (error) throw error;
};

export const uploadEmployeesCSVFile = (data) => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: postRequest,
    endpoint: `/users/upload`,
    payload: data,
    toastMessage: {success: {show: true}, error: {show: true}},
  });
  if (body) dispatch(actions.addListOfInvitedUserToList(body?.users));
  if (error) throw error;
};

export const updateEmployee = (data) => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: patchRequest,
    endpoint: `/users/employees/${data?.id}`,
    payload: data,
    toastMessage: {success: {show: true}, error: {show: true}},
  });

  if (!error) {
    dispatch(actions.updateUser(body?.employee));
  } else {
    throw error;
  }
};

export const updateManagerAccessibility =
  ({id, isDisabled}) =>
  async (dispatch) => {
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: patchRequest,
      endpoint: `/users/managers/${id}`,
      payload: {isDisabled},
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (!error) {
      dispatch(actions.updateUser(body?.manager));
    } else {
      throw error;
    }
  };

export const fetchVerifyUserLoginStatus = () => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: `/users/me`,
    toastMessage: {success: {show: false}, error: {show: false}},
  });

  if (!error) {
    dispatch(actions.setCurrentUser(body?.user));
  }
};
