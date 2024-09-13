import DialogWrapper from '@/components/dialogueWrapper';
import Button from '@/shared/components/button/IconButtonWithMenu';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import {BsFillSendCheckFill} from 'react-icons/bs';

export default function Dialogue({
  open,
  setOpen,
  data,
  title,
  keyToShow,
  reduxFunction,
}) {
  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const handleDeleteAction = async () => {
    const {id} = data;
    await onSubmitFunction({
      reduxFunction,
      data: {id},
      onSuccess: () => setOpen(false),
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogWrapper title={title} open={open} handleClose={handleClose}>
      <Box>
        <Typography>
          Are you sure you want to delete <strong>{data[keyToShow]}</strong>
          {' ?'}
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
          btnText={'Delete'}
          type="submit"
          icon={BsFillSendCheckFill}
          handleClick={handleDeleteAction}
          loading={isLoading}
        />
      </Box>
    </DialogWrapper>
  );
}

Dialogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  data: PropTypes.object,
  title: PropTypes.string,
  keyToShow: PropTypes.string,
  reduxFunction: PropTypes.func,
};
