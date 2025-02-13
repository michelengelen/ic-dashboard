'use client'
import * as React from 'react';
import {usePathname, useRouter} from "next/navigation";
import type {CSSObject, Theme} from '@mui/material/styles';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import type {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import HouseIcon from '@mui/icons-material/House';


const navItems = [
  {text: "Home", href: "/", icon: <HouseIcon/>},
  {text: "Dashboard", href: "/dashboard", icon: <DashboardIcon/>},
  {text: "GitHub", href: "/github", icon: <GitHubIcon/>},
  {text: "Settings", href: "/settings", icon: <SettingsIcon/>},
];

const drawerWidth = 240;

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      paddingTop: 64,
    },
    variants: [
      {
        props: ({open}) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({open}) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function MiniDrawer({children}: React.PropsWithChildren) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        open={open}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
          >
            {open ? <MenuIcon/> : <CloseIcon/>}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            {pathname}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <List>
          {navItems.map(({text, href, icon}) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={pathname === href}
                onClick={() => router.push(href)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        {children}
      </Box>
    </Box>
  );
}
