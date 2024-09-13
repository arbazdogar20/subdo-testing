import Button from '@/components/button/IconButtonWithMenu';
import DialogWrapper from '@/components/dialogueWrapper';
import ControlledTextInput from '@/components/inputs/controlledTextInput';
import ControlledSearchAbleSelectField from '@/components/selects/controlledSearchAbleSelectField';
import Switch from '@/components/switch';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {getPositionsList} from '@/shared/redux/slices/positions';
import {addEmployee, updateEmployee} from '@/shared/redux/slices/user';
import {addEmployeeSchema} from '@/shared/schemas/auth';
import {yupResolver} from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {BsFillSendCheckFill} from 'react-icons/bs';
import {useSelector} from 'react-redux';

export default function Dialogue({open, setOpen, type, data}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(addEmployeeSchema),
  });

  const positionList = useSelector(getPositionsList);

  useEffect(() => {
    if (type === 'edit') {
      setValue('firstName', data?.firstName || '');
      setValue('lastName', data?.lastName || '');
      setValue('email', data?.email || '');
      setValue('employeeId', data?.employeeId || '');
      const selectedPosition = positionList.find(
        (pos) => pos.name === data?.position
      );
      if (selectedPosition) {
        const obj = {
          label: selectedPosition?.name,
          value: selectedPosition?.id,
        };
        setValue('positionId', obj);
      } else setValue('positionId', '');
      setValue('rate', data?.rate?.split('$')[1] || '');
      setValue('isDisabled', data?.isDisabled);
    } else reset();
  }, [data]);

  const values = watch();

  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const onSuccess = () => {
    setOpen({open: false, type: '', data: {}});
    reset();
  };

  const onSubmit = async (employee) => {
    const {positionId, rate, ...rest} = employee;

    const employeeObj = {
      ...rest,
      positionId: positionId?.value,
      rate: !rate ? 0 : parseFloat(rate),
      ...(type === 'edit' && {id: data?.id}),
    };

    onSubmitFunction({
      reduxFunction: type === 'edit' ? updateEmployee : addEmployee,
      data: employeeObj,
      onSuccess,
    });
  };

  const handleClose = () => {
    setOpen({open: false, type: '', data: {}});
    reset();
  };

  const positionOptions = positionList.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleSwitchValue = (e) => {
    const checked = e.target.checked;
    const isDisabled = !checked;
    setValue('isDisabled', isDisabled);
  };

  return (
    <DialogWrapper
      title={type === 'edit' ? 'Edit Employee' : 'Add Employee'}
      open={open}
      handleClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ControlledTextInput
                name={'firstName'}
                label="First Name"
                error={errors}
                placeholder="Enter first name"
                control={control}
                inputProps={{maxLength: 50}}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^a-zA-Z]/g, ''))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ControlledTextInput
                name={'lastName'}
                label="Last Name"
                error={errors}
                placeholder="Enter last name"
                control={control}
                inputProps={{maxLength: 50}}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^a-zA-Z]/g, ''))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                name={'email'}
                label="Email"
                error={errors}
                placeholder="Enter email"
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                name={'employeeId'}
                label="Employee Id"
                error={errors}
                placeholder="Enter employee id"
                control={control}
                inputProps={{maxLength: 20}}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledSearchAbleSelectField
                control={control}
                label="Position"
                name="positionId"
                errors={errors}
                options={positionOptions}
                getOptionLabel={(option) => option.label}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                name={'rate'}
                label="Hourly Rate $ (Optional)"
                error={errors}
                placeholder="Enter employee hourly rate $"
                control={control}
                inputProps={{maxLength: 10}}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                  let parts = e.target.value.split('.');
                  if (parts.length > 1) {
                    parts[1] = parts[1].substring(0, 2);
                    e.target.value = `${parts[0]}.${parts[1]}`;
                  }
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            {type === 'edit' && (
              <Switch
                title={!data?.isDisabled ? 'Enabled' : 'Disabled'}
                handleChange={handleSwitchValue}
                value={!values?.isDisabled}
              />
            )}
          </Box>
        </Box>
        <Button
          sx={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            textTransform: 'capitalize',
            borderRadius: '5px',
            letterSpacing: 1,
            padding: '.5rem',
            width: '100%',
            marginTop: '1rem',
            '&:hover': {
              backgroundColor: 'var(--primary)',
              opacity: '0.9',
            },
          }}
          btnText={type === 'edit' ? 'Update' : 'Submit'}
          type="submit"
          icon={BsFillSendCheckFill}
          loading={isLoading}
          handleClick={() => {}}
        />
      </form>
    </DialogWrapper>
  );
}

Dialogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  type: PropTypes.string,
  data: PropTypes.object,
};
