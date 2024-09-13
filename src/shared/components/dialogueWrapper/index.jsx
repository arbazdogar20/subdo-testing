import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import {IoMdClose} from 'react-icons/io';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css';
import DialogContentText from '@mui/material/DialogContent';

export default function DialogWrapper({children, open, handleClose, title}) {
  return (
    <Dialog open={open}>
      <DialogContentText className={styles.dialogContainer}>
        <Box className={styles.heading_container}>
          <Typography className={styles.title}>{title}</Typography>
          <IconButton onClick={handleClose}>
            <IoMdClose />
          </IconButton>
        </Box>
        <Box>{children}</Box>
      </DialogContentText>
    </Dialog>
  );
}

DialogWrapper.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func,
  title: PropTypes.string,
};
