import Typography from '@mui/material/Typography';
import styles from './styles.module.css';
import {useRef, useState} from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {FaCloudUploadAlt} from 'react-icons/fa';
import {FaFileCirclePlus} from 'react-icons/fa6';

export default function FileUploader({file, setFile, allowedTypes, disabled}) {
  const inputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState(null);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFile(e.dataTransfer.files[0]);
  };

  const selectFileHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  const uploadFile = (selectedFile) => {
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setFileError(null);
    } else {
      setFileError(`Please select a file of type: ${allowedTypes.join(', ')}`);
    }
  };

  return (
    <>
      <Box className={styles.download_template_container}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <FaFileCirclePlus size={30} color="var(--primary)" />
          <Typography marginLeft={0.5} color={'black'}>
            Template.csv
          </Typography>
        </Box>
        <Typography
          fontWeight={'bold'}
          sx={{cursor: 'pointer', marginTop: {xs: 1.5}}}
        >
          <a
            download
            style={{textDecoration: 'none', color: 'var(--accent)'}}
            href="/CSVTemplate/template.csv"
          >
            Download Template
          </a>
        </Typography>
      </Box>
      <hr style={{borderColor: 'rgb(255 255 255)'}} />
      <Typography sx={{margin: '1rem 0rem'}} color={'black'}>
        Once your file is ready, you can upload it below
      </Typography>
      <button
        draggable={true}
        className={`${disabled && styles.disabled} ${
          styles.draggable_container
        } ${isDragging ? styles.dragging : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current.click()}
      >
        <Box className={styles.uploadFile_content_container}>
          <FaCloudUploadAlt size={40} color="var(--primary)" />
          <Typography
            textAlign={'center'}
            color={'var(--primary)'}
            marginTop={1}
          >
            {!file ? (
              <>
                <strong>Click to upload </strong>
                <span style={{color: '#637080'}}>or drag and drop CSV</span>
              </>
            ) : (
              <strong>{file?.name}</strong>
            )}
          </Typography>
        </Box>
        <input
          type="file"
          ref={inputRef}
          className={styles.input}
          onChange={selectFileHandler}
          accept=".csv"
        />
      </button>
      <Typography className={styles.fileType_error_text}>
        {fileError || ''}
      </Typography>
    </>
  );
}

FileUploader.propTypes = {
  file: PropTypes.object,
  setFile: PropTypes.func,
  allowedTypes: PropTypes.array,
  disabled: PropTypes.bool,
};
