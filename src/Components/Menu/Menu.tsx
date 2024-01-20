import { useState, useEffect } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
  Box, Collapse, Tooltip, Toolbar, List, CssBaseline, Typography, Divider, IconButton,
  ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { MenuItemData } from '../../Utils/Datas';

const drawerWidth = 240;

type openCollapseType = {
  id: number,
  open: boolean
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Menu({ children }: { children: React.ReactNode }): React.JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openCollapse, setOpenCollapse] = useState<openCollapseType[]>([]);
  const [listSelected, setListSelected] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  }
  const selectCategory = (id: number, href: string) => {
    setListSelected(id);
    navigate(href);
  }
  const handleOpenCollapse = (id: number) => {
    let collapse = openCollapse?.find(col => col.id === id);
    let tempArray = openCollapse?.filter(col => col.id != id);
    collapse && setOpenCollapse([...tempArray, { id, open: !collapse.open }])
  }
  const isCollapseOpen = (id: number) => {
    let collapse = openCollapse.find(col => col.id === id);
    return collapse ? collapse?.open : false
  }

  useEffect(() => {
    let tempArray: openCollapseType[] = [];
    MenuItemData?.map(menuItem => {
      menuItem && tempArray.push({ id: menuItem.id, open: false })
    })
    setOpenCollapse([...tempArray]);
  }, [])

  return (
    <div dir='rtl' className='flex'>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
            sx={{ ...(open && { display: 'none' }), }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: '100%', height: '100%', maxWidth: 360 }}
          component="nav"
          aria-labelledby="category-menu">
          {
            MenuItemData?.map(menuItem => (
              <ListItem key={menuItem.id} disablePadding sx={{ display: 'block', mb: 2.5 }}>
                <Tooltip title={open ? '' : menuItem.title}>
                  <ListItemButton onClick={() => handleOpenCollapse(menuItem.id)} sx={{ height: 30, justifyContent: open ? 'initial' : 'center', px: 2.5, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }} >
                      {menuItem.icon}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }} primary={<Typography variant='body1' >{menuItem.title}</Typography>} />
                  </ListItemButton>
                </Tooltip>
                {
                  menuItem.subMenu &&
                  <Collapse in={isCollapseOpen(menuItem.id)} timeout="auto" unmountOnExit>
                    <List component="nav" disablePadding>
                      {
                        menuItem.subMenu.map(subItem => (
                          <ListItem key={subItem.id} disablePadding sx={{ display: 'block' }}>
                            <Tooltip title={open ? '' : subItem.title}>
                              <ListItemButton onClick={() => selectCategory(subItem.id, subItem.href)} sx={{ height: 30, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 1 : 'auto', justifyContent: 'center', color:listSelected === subItem.id ? theme.palette.primary.main :'text.primary' }} >
                                  {subItem.icon}
                                </ListItemIcon>
                                <ListItemText sx={{ opacity: open ? 1 : 0 }} primary={<Typography variant='body2' color={listSelected === subItem.id ? 'primary' :'text.primary'}>{subItem.title}</Typography>} />
                              </ListItemButton>
                            </Tooltip>
                          </ListItem>
                        ))
                      }
                    </List>
                  </Collapse>
                }
              </ListItem>
            ))
          }
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0.5, pt: 7 }}>
        {children}
      </Box>
    </div>
  );
}