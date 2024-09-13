'use client';
import style from './style.module.css';
import {useState} from 'react';

// MUI
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Drawer from '@mui/material/Drawer';

// Components
import Button from '@/components/button';
import Sidebar from '../sideBar';

// Icons
import {GiHamburgerMenu} from 'react-icons/gi';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser, signOutUser} from '@/shared/redux/slices/user';

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const {firstName, lastName, email} = useSelector(getCurrentUser) || {};

  const dispatch = useDispatch();

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={style.container}>
      <GiHamburgerMenu
        size={35}
        color="#789292"
        style={{cursor: 'pointer', marginLeft: '20px'}}
        onClick={toggleDrawer(true)}
      />

      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: '250px',
            background: `radial-gradient( 113.94% 113.94% at 50.06% -13.94%, #38a3a2 17.04%, #10605d 100%)`,
          },
        }}
      >
        <Sidebar onClick={toggleDrawer(false)} />
      </Drawer>

      <Avatar
        sx={{width: 40, height: 40, mr: 3, cursor: 'pointer'}}
        onClick={handleClick}
        aria-describedby={id}
      >
        {`${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`}
      </Avatar>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <div style={{width: '200px', padding: '10px'}}>
          <h4>{`${firstName || ''}${' '}${lastName || ''}`}</h4>
          <h6>{email || ''}</h6>
          <hr />
          <Button
            onClick={() => dispatch(signOutUser())}
            btnText={'Logout'}
            sx={{
              mt: 2,
              backgroundColor: 'var(--primary)',
              width: '100%',
              '&:hover': {
                backgroundColor: 'var(--primary)',
              },
            }}
          />
        </div>
      </Popover>
    </div>
  );
}
