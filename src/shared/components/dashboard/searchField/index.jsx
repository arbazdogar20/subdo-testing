import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {IoIosSearch} from 'react-icons/io';
import PropTypes from 'prop-types';

export default function SearchBox({label, handleSearch}) {
  return (
    <TextField
      size="medium"
      label={label}
      variant="outlined"
      onChange={handleSearch}
      sx={{
        width: '300px',
        '& .MuiInputBase-input': {
          backgroundColor: 'white!important',
        },
        '& .MuiInputBase-root': {
          backgroundColor: 'white!important',
        },
        '@media (max-width: 767px)': {
          width: '100%',
        },
        '& .MuiInputLabel-root': {
          color: 'var(--accent)!important',
          fontSize: 'medium',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'var(--accent)!important',
          },
          '&:hover fieldset': {
            borderColor: 'var(--accent)!important',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--accent)!important',
            color: 'var(--accent)!important',
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <IoIosSearch style={{color: 'var(--secondary)'}} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

SearchBox.propTypes = {
  label: PropTypes.string,
  handleSearch: PropTypes.func,
};
