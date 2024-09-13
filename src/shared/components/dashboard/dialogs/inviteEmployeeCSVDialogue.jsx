import UploadFile from '@/components/dashboard/UploadFiles';
import DialogWrapper from '@/components/dialogueWrapper';
import PropTypes from 'prop-types';
import IconButtonWithMenu from '@/components/button/IconButtonWithMenu';
import {BsFillSendArrowUpFill} from 'react-icons/bs';
import {useState} from 'react';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {uploadEmployeesCSVFile} from '@/shared/redux/slices/user';

export default function Dialogue({open, setOpen}) {
  const [file, setFile] = useState(null);
  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const allowedTypes = ['text/csv'];

  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    onSubmitFunction({
      reduxFunction: uploadEmployeesCSVFile,
      data: formData,
      onSuccess: () => handleClose(),
    });
  };

  return (
    <DialogWrapper
      title="Invite Employees"
      open={open}
      handleClose={handleClose}
    >
      <UploadFile
        disabled={isLoading}
        file={file}
        setFile={setFile}
        allowedTypes={allowedTypes}
      />
      <IconButtonWithMenu
        sx={{
          backgroundColor: 'var(--primary)',
          color: 'white',
          textTransform: 'capitalize',
          borderRadius: '5px',
          letterSpacing: 1,
          width: '100%',
          marginTop: '1rem',
          padding: '.7rem 1rem',
          '&:hover': {
            backgroundColor: 'var(--primary)',
            opacity: '0.9',
          },
          '@media (max-width: 767px)': {
            width: '100%',
            marginTop: '1rem',
          },
        }}
        btnText={'Upload'}
        handleClick={handleUpload}
        icon={BsFillSendArrowUpFill}
        loading={isLoading}
        hasButtonMenu={false}
        buttonMenuList={[]}
      />
    </DialogWrapper>
  );
}

Dialogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
