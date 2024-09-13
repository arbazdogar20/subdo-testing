import Button from '@/components/button/IconButtonWithMenu';
import DialogWrapper from '@/components/dialogueWrapper';
import ControlledTextInput from '@/components/inputs/controlledTextInput';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {addPosition, updatePosition} from '@/shared/redux/slices/positions';
import {addPositionSchema} from '@/shared/schemas/positions';
import {yupResolver} from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {BsFillSendCheckFill} from 'react-icons/bs';

function PositionFormDialog({type, data, onSuccess}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(addPositionSchema),
  });

  useEffect(() => {
    if (type === 'edit') {
      setValue('name', data?.name || '');
    } else {
      reset();
    }
  }, [type, data]);

  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const onSubmit = async (position) => {
    const {name} = position;

    const positionObj = {
      name,
      ...(type === 'edit' && {id: data?.id}),
    };

    const reduxFunction = type === 'edit' ? updatePosition : addPosition;

    onSubmitFunction({
      reduxFunction,
      data: positionObj,
      onSuccess,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ControlledTextInput
              name={'name'}
              label="Name"
              error={errors}
              placeholder="Enter position name"
              control={control}
              fullWidth
            />
          </Grid>
        </Grid>
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
          marginTop: '1.5rem',
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
  );
}

PositionFormDialog.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  onSuccess: PropTypes.func,
};

function Dialogue({open, setOpen, type, data}) {
  const handleClose = () => {
    setOpen({open: false, type: '', data: {}});
  };

  return (
    <DialogWrapper
      title={type === 'edit' ? 'Edit Position' : 'Add Position'}
      open={open}
      handleClose={handleClose}
    >
      <PositionFormDialog
        type={type}
        data={data}
        onSuccess={() => {
          setOpen({open: false, type: '', data: {}});
        }}
      />
    </DialogWrapper>
  );
}

Dialogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  type: PropTypes.string,
  data: PropTypes.object,
};

export default Dialogue;
