import Button from '@/shared/components/button/IconButtonWithMenu';
import DialogWrapper from '@/components/dialogueWrapper';
import ControlledTextInput from '@/components/inputs/controlledTextInput';
import {ROLES} from '@/shared/constants/roles';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {inviteManager} from '@/shared/redux/slices/user';
import {inviteManagerSchema} from '@/shared/schemas/auth';
import {yupResolver} from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import {BsFillSendCheckFill} from 'react-icons/bs';

export default function Dialogue({open, setOpen}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(inviteManagerSchema),
  });

  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const onSuccess = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    const {firstName, lastName, email} = data;
    onSubmitFunction({
      reduxFunction: inviteManager,
      data: {email, systemRole: ROLES.manager.value, firstName, lastName},
      onSuccess,
    });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <DialogWrapper title="Invite Manager" open={open} handleClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ControlledTextInput
                name={'firstName'}
                label="First Name"
                error={errors}
                placeholder="Enter first name"
                control={control}
                inputProps={{maxLength: 255}}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^a-zA-Z]/g, ''))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextInput
                name={'lastName'}
                label="Last Name"
                error={errors}
                placeholder="Enter last name"
                control={control}
                inputProps={{maxLength: 255}}
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
            marginTop: '1rem',
            '&:hover': {
              backgroundColor: 'var(--primary)',
              opacity: '0.9',
            },
          }}
          btnText={'Send Invite'}
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
};
