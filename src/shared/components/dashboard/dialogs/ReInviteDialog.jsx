import Button from '@/shared/components/button/IconButtonWithMenu';
import DialogWrapper from '@/components/dialogueWrapper';
import {ROLES} from '@/shared/constants/roles';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {reInviteManager} from '@/shared/redux/slices/user';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import {BsFillSendCheckFill} from 'react-icons/bs';

const {manager} = ROLES;

export default function Dialogue({
  open,
  setOpen,
  userToReInvite,
  userRole = manager.value,
}) {
  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const reduxFunction = reInviteManager;
  const systemRole = manager.value;

  const handleReInvite = async () => {
    const {email} = userToReInvite;
    await onSubmitFunction({
      reduxFunction,
      data: {email, systemRole},
      onSuccess: () => setOpen(false),
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogWrapper
      title={`Re-invite ${
        userRole?.charAt(0)?.toUpperCase() + userRole.slice(1)
      }`}
      open={open}
      handleClose={handleClose}
    >
      <Box>
        <Typography fontWeight={'bold'}>Confirm Email</Typography>
        <Typography style={{wordBreak: 'break-word'}}>
          {userToReInvite?.email}
        </Typography>
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
          btnText={'Re Invite'}
          type="submit"
          icon={BsFillSendCheckFill}
          handleClick={handleReInvite}
          loading={isLoading}
        />
      </Box>
    </DialogWrapper>
  );
}

Dialogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  userToReInvite: PropTypes.object,
  userRole: PropTypes.string,
};
