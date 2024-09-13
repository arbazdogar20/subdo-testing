import Button from '@/shared/components/button/IconButtonWithMenu';
import SearchTextField from '@/components/dashboard/searchField/index';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import {TiUserAddOutline} from 'react-icons/ti';
import styles from './styles.module.css';

export default function Header({
  title,
  handleSearch,
  placeholder,
  btnText,
  handleClick,
  hasButtonMenu,
  buttonMenuList,
}) {
  return (
    <Box>
      <Typography className={styles.title} textTransform={'capitalize'}>
        {title}
      </Typography>
      <Box className={styles.action_container}>
        <SearchTextField label={placeholder} handleSearch={handleSearch} />
        <Button
          sx={{
            backgroundColor: 'var(--secondary)',
            color: 'white',
            textTransform: 'capitalize',
            borderRadius: '5px',
            letterSpacing: 1,
            padding: '.7rem 1rem',
            '&:hover': {
              backgroundColor: 'var(--secondary)',
              opacity: '0.9',
            },
            '@media (max-width: 767px)': {
              width: '100%',
              marginTop: '1rem',
            },
          }}
          btnText={btnText}
          handleClick={handleClick}
          icon={TiUserAddOutline}
          hasButtonMenu={hasButtonMenu}
          buttonMenuList={buttonMenuList}
        />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  handleSearch: PropTypes.func,
  placeholder: PropTypes.string,
  btnText: PropTypes.string,
  handleClick: PropTypes.func,
  hasButtonMenu: PropTypes.bool,
  buttonMenuList: PropTypes.array,
};
