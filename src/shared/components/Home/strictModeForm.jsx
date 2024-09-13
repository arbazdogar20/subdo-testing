'use client';
import {useEffect, useMemo, useState} from 'react';
import style from './style.module.css';

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

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getDepartments,
  setDepartmentForTracking,
} from '@/redux/slices/department';

import {startTracking} from '@/redux/slices/timeTracking';
import {setEmployeeIdForTracking} from '@/shared/redux/slices/user';
import {getCurrentTime} from '@/shared/utils/timeUtils';

export default function StrictModeForm() {
  // Redux
  const dispatch = useDispatch();

  const timeFormat = getCurrentTime().toFormat('hh:mm:ss a');
  const [currTime, setCurrTime] = useState(timeFormat);

  const {onSubmitFunction, isLoading} = useSubmitFunction();

  const departments = useSelector(getDepartments);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(timeTracker),
    defaultValues: {
      departmentId: '',
      employeeId: '',
    },
  });

  const value = watch();

  const departmentArr = useMemo(() => {
    return departments.map((department) => ({
      id: department.id,
      label: department.name,
    }));
  }, [departments]);

  const onSuccess = () => {
    setValue('departmentId', '');
    setValue('employeeId', '');

    dispatch(setDepartmentForTracking(''));
    dispatch(setEmployeeIdForTracking(''));
  };

  const onSubmit = async (data) => {
    await onSubmitFunction({
      reduxFunction: startTracking,
      data: {status: status.checkin.value},
      onSuccess,
    });
  };

  const handleActions = async (action) => {
    await onSubmitFunction({
      reduxFunction: startTracking,
      data: {status: action},
      onSuccess,
    });
  };

  useEffect(() => {
    if (value.departmentId)
      dispatch(setDepartmentForTracking(value.departmentId));

    if (value.employeeId) dispatch(setEmployeeIdForTracking(value.employeeId));
  }, [value]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeFormat = getCurrentTime().toFormat('hh:mm:ss a');
      setCurrTime(timeFormat);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h5 className={style.date}>
          {new Date().toLocaleString('us').split(',')[0]}
        </h5>
        <h5 className={style.time}>{currTime}</h5>
      </div>

      <ControlledSearchAbleSelectField
        name="departmentId"
        label="Department"
        control={control}
        options={departmentArr}
        errors={errors}
        getOptionLabel={(option) => option.label}
        sx={{mt: 2}}
        disabled={isLoading}
      />

      <ControlledTextInput
        label="Employee ID"
        name="employeeId"
        control={control}
        error={errors}
        placeholder={'Enter Employee ID'}
        sx={{my: 2}}
        disabled={isLoading}
      />

      <ActionButtons
        checkInBtn={{
          disabled: isLoading,
        }}
        checkOutBtn={{
          onClick: () => handleActions(status.checkout.value),
          disabled: isLoading,
          btnText: 'checkout',
        }}
        breakBtn={{
          onClick: () => handleActions(status.break.value),
          disabled: isLoading,
        }}
        returnFromBreakBtn={{
          onClick: () => handleActions(status.returnFromBreak.value),
          disabled: isLoading,
        }}
      />
    </form>
  );
}
