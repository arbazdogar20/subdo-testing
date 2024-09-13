import {createAction} from '@reduxjs/toolkit';
export const clearStore = createAction('util/clearStore');

import {showToastUtils} from '@/shared/utils/toast';

// Slices
import {actions as userActions, signOutUser} from '@/shared/redux/slices/user';
import {actions as organizationActions} from '@/shared/redux/slices/organization';
import {actions as departmentActions} from '@/shared/redux/slices/department';
import {actions as timeTrackingActions} from '@/shared/redux/slices/timeTracking';

export const handleAsyncRequest = async ({
  dispatch,
  actions,
  requestFn,
  endpoint,
  payload,
  toastMessage = {
    success: {show: true, customMessage},
    error: {show: true, customMessage},
  },
}) => {
  try {
    await dispatch(actions.startLoading());
    await dispatch(actions.clearError());

    const body = {endpoint};

    if (payload) body.payload = payload;

    const response = await requestFn(body);

    if (toastMessage.success.show)
      showToastUtils({
        type: 'success',
        message: toastMessage.success.customMessage || response.data.message,
      });

    return {
      statusCode: response.data.statusCode,
      message: response.data.message,
      body: response.data.body,
    };
  } catch (error) {
    dispatch(actions.hasError(error));

    const message = error.response?.data.message || 'Something went wrong';

    if (toastMessage.error.show)
      showToastUtils({
        type: 'error',
        message: toastMessage.error.customMessage || message,
      });

    // If node server cookie is expired
    if (message == 'invalid token') {
      dispatch(signOutUser());
    }

    return {
      statusCode: error.response?.data.statusCode,
      message,
      error,
    };
  } finally {
    dispatch(actions.stopLoading());
  }
};

export const resetAllSlices = () => (dispatch) => {
  [
    userActions,
    organizationActions,
    departmentActions,
    timeTrackingActions,
  ].forEach((action) => dispatch(action.resetState()));
};
