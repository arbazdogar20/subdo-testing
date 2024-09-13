'use client';
import style from './style.module.css';

import PropTypes from 'prop-types';
import {useEffect, useMemo} from 'react';

// React hook form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// Components
import ControlledSearchAbleSelectField from '@/components/selects/controlledSearchAbleSelectField';
import ControlledTextInput from '@/components/inputs/controlledTextInput';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import ActionButtons from '@/components/Home/actionButtons';

// Constants
import {status} from '@/constants/timeTrackingConstant';
import {timeTracker} from '@/schemas/home';
import {getFormattedTime} from '@/shared/utils/timeUtils';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getDepartments,
  setDepartmentForTracking,
  getDepartmentForTracking,
} from '@/redux/slices/department';
import {
  setEmployeeIdForTracking,
  getEmployeeForTracking,
} from '@/redux/slices/user';
import {
  getCurrentTimeTracking,
  startTracking,
} from '@/redux/slices/timeTracking';
import {isFetchingInitialPublicData} from '@/shared/redux/slices/app';

export default function FlexibleModeForm({elapsedTime}) {
  // Redux
  const dispatch = useDispatch();

  const {onSubmitFunction, isLoading} = useSubmitFunction();

  const departments = useSelector(getDepartments);
  const selectedDepartment = useSelector(getDepartmentForTracking);
  const selectedEmployeeId = useSelector(getEmployeeForTracking);
  const isFetching = useSelector(isFetchingInitialPublicData);

  const {
    handleSubmit,
    control,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(timeTracker),
    defaultValues: {
      departmentId: selectedDepartment,
      employeeId: selectedEmployeeId,
    },
  });

  const value = watch();

  const departmentArr = useMemo(() => {
    return departments.map((item) => ({
      id: item.id,
      label: item.name,
    }));
  }, []);

  const onSubmit = async () => {
    await onSubmitFunction({
      reduxFunction: startTracking,
      data: {status: status.checkin.value},
    });
  };

  const handleActions = async (action) => {
    await onSubmitFunction({
      reduxFunction: startTracking,
      data: {status: action},
    });
  };

  const currentTimeTracking = useSelector(getCurrentTimeTracking);

  const currentStatus = currentTimeTracking?.currentStatus;

  const isCheckin = currentStatus === status.checkin.value;
  const isCheckout = currentStatus === status.checkout.value;
  const isOnBreak = currentStatus === status.break.value;

  const checkoutBtnDisabled =
    isFetching || isCheckout || !currentTimeTracking?.currentStatus;

  const returnFromBreakBtnDisabled = isFetching || isCheckin || !isOnBreak;

  useEffect(() => {
    if (value.departmentId)
      dispatch(setDepartmentForTracking(value.departmentId));

    if (value.employeeId) dispatch(setEmployeeIdForTracking(value.employeeId));
  }, [value]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h5 className={style.date}>
          {new Date().toLocaleString('us').split(',')[0]}
        </h5>
        <h5 className={style.time}>
          {isFetching ? 'Syncing...' : getFormattedTime(elapsedTime)}
        </h5>
      </div>

      {isOnBreak && !isFetching && <h3 className={style.breakTxt}>On Break</h3>}

      <ControlledSearchAbleSelectField
        name="departmentId"
        label={'Department'}
        control={control}
        options={departmentArr}
        errors={errors}
        getOptionLabel={(option) => option.label}
        sx={{mt: 2}}
        disabled={isFetching || isCheckin}
      />

      <ControlledTextInput
        label="Employee ID"
        name="employeeId"
        control={control}
        error={errors}
        placeholder={'Enter Employee ID'}
        sx={{my: 2}}
        disabled={isFetching || isCheckin || isOnBreak}
      />

      <ActionButtons
        checkInBtn={{
          disabled: isFetching || isLoading || isCheckin || isOnBreak,
        }}
        checkOutBtn={{
          onClick: () => handleActions(status.checkout.value),
          disabled: isLoading || checkoutBtnDisabled,
          btnText: isOnBreak ? 'Return / Check Out' : 'Check Out',
        }}
        breakBtn={{
          onClick: () => handleActions(status.break.value),
          disabled: isFetching || isLoading || !isCheckin,
        }}
        returnFromBreakBtn={{
          onClick: () => handleActions(status.returnFromBreak.value),
          disabled: isLoading || returnFromBreakBtnDisabled,
        }}
      />
    </form>
  );
}

FlexibleModeForm.propTypes = {
  elapsedTime: PropTypes.number,
};
