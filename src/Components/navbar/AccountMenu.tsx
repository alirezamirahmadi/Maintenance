
import { useState } from 'react';
import {
  Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip, useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import { RootState, AppDispatch } from '../../Redux/Store';
import { logout, getLogin } from '../../Redux/Reducer/LoginReducer';

export default function AccountMenu(): React.JSX.Element {

  const dispatch = useDispatch<AppDispatch>();
  const loginInfo = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const theme = useTheme();
  const [, , removeCookie] = useCookies(['token']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    dispatch(logout(loginInfo[0]?.id)).then(() => dispatch(getLogin('0')));
    navigate('/login');
    removeCookie('token');
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="My Account">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: theme.palette.primary.main }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ cursor: 'default' }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" color='secondary' />
            <Typography variant='body2' sx={{ marginX: '4px' }} color={theme.palette.secondary.main}>{loginInfo[0]?.person?.firstName} {loginInfo[0]?.person?.lastName}</Typography>
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
            <Typography variant='body2' sx={{ marginX: '4px' }}>Logout</Typography>
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
}