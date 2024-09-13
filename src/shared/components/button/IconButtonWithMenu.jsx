import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function IconButtonWithMenu({
  sx,
  icon: Icon,
  btnText,
  handleClick,
  type = 'button',
  loading = false,
  disabled = false,
  hasButtonMenu = false,
  buttonMenuList,
  variant = 'contained',
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClickAnchorEl = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{cursor: disabled ? 'not-allowed' : 'pointer'}}>
      <Button
        onClick={(e) => {
          if (hasButtonMenu) handleClickAnchorEl(e);
          else handleClick();
        }}
        sx={sx}
        type={type}
        disabled={loading || disabled}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant={variant}
      >
        {loading ? (
          <CircularProgress size={'1.5rem'} sx={{color: 'white'}} />
        ) : (
          btnText
        )}
        {Icon && !loading && (
          <Icon style={{marginLeft: '.5rem', fontSize: '1.3rem'}} />
        )}
      </Button>
      {hasButtonMenu && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {buttonMenuList?.map((menu) => {
            return (
              <MenuItem
                sx={{padding: '12px'}}
                key={menu?.id}
                onClick={() => {
                  menu?.method();
                  handleClose();
                }}
              >
                {menu?.icon}{' '}
                <span style={{marginLeft: '10px'}}>{menu?.title}</span>
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </div>
  );
}

IconButtonWithMenu.propTypes = {
  sx: PropTypes.object,
  icon: PropTypes.elementType,
  btnText: PropTypes.string,
  handleClick: PropTypes.func,
  type: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  hasButtonMenu: PropTypes.bool,
  buttonMenuList: PropTypes.array,
  variant: PropTypes.string,
};
