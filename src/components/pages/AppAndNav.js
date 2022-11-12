import * as React from 'react';
import '../../appAndNav.css';
import logoMin from '../../images/logoMin.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Stack, Dialog, DialogActions, DialogContent, TextField, DialogTitle, MenuItem, Avatar, Tooltip, Menu, } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Dashboard from './Dashboard';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import { purple, indigo } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addUser } from '../../actions/actions';
import userLogo from '../../images/user-logo.png';

const drawerWidth = 240;

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
  width: "100px",
  height: "35px",
  float: "left",
  padding: "2px",
}));
const ColorButton2 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[500]),
  backgroundColor: indigo[500],
  '&:hover': {
    backgroundColor: indigo[700],
  },
  width: "100px",
  height: "35px",
  float: "right",
}));

function AppAndNav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = useState({ firstName: false, lastName: false, email: false, firstNameText: "", lastNameText: "" });
  const [error, setError] = useState({ show: false, message: "" });
  const [newUser, setNewUser] = useState({ id: 13, avatar: userLogo });
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const navigate = useNavigate();
  function ValidateEmail(mail) {
    if(mail.length===0)
    {
      setFlag({ ...flag, email: false });
      setError({ ...error, show: false, message: "" });
    }else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setFlag({ ...flag, email: true });
      setError({ ...error, show: false, message: "" });
      return (true)
    } else {
      setFlag({ ...flag, email: false });
      setError({ ...error, show: true, message: "Invalid email" });
      return (false)
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setError({ ...error, show: false, message: "" });
    setFlag({ ...flag, email: false });
    setFlag({ ...flag, lastName: false, lastNameText: "" ,firstName: false, firstNameText: ""});
    setOpen(false);
  };
  const addDetails = () => {
    setNewUser({ id: newUser.id++, ...newUser });
    dispatch(addUser(newUser));
    setOpen(false);
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ zIndex: -1 }} />
      <List>
        <ListItem key="AddNewUser" disablePadding >
          <ListItemButton onClick={() => { handleClickOpen(); }}>
            <ListItemIcon >
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="Add New User" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          className="appBar"
          position="fixed"
          sx={{
            width: "100%",
            ml: { sm: `${drawerWidth}px` },
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(165, 107, 219, 1)"
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <img src={logoMin} alt="logoMin" style={{ width: "35px", height: "auto", marginRight: "10px" }} />
            <Typography variant="h6" noWrap component="div">
              My Users
            </Typography>
            <Box sx={{ flexGrow: 1}} >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,float:"right"}}>
                  <Avatar alt="Remy Sharp" src={userLogo} sx={{float:"right",backgroundColor:'#b8afc2'}}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                
                  <MenuItem key={"Logout"} onClick={()=>{navigate("/")}}>
                  <LogoutRoundedIcon sx={{mr:"5px"}}/>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, marginTop: "50px" }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Dashboard />
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" alignSelf="center">
          <span style={{ color: "rgba(165, 107, 219, 1)" }}><strong>{"Add User"}</strong></span>
        </DialogTitle>
        <DialogContent>
          <Stack>
            <img src={userLogo} alt="img" className='userImg'
              style={{
                width: {
                  xl: "50vw",
                  lg: "40vw",
                  md: "30vw"
                }, alignSelf: "center"
              }}
            />
            <p></p>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-start" >
          <TextField
              autoFocus
              margin="none"
              id="firstName"
              label="First Name"
              type="text"
              error={flag.firstName}
              helperText={flag.firstNameText}
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%",
                }
              }}
              variant="filled"
              onChange={(newValue) => {
                if (newValue.target.value.trim() === "") {
                  setFlag({ ...flag, firstName: true, firstNameText: "Enter your first name" });
                } else setFlag({ ...flag, firstName: false, firstNameText: "" });
                setNewUser({ ...newUser, first_name: newValue.target.value.trim() })
              }}
            />
            <p></p>
            <TextField
              margin="none"
              id="LastName"
              label="Last Name"
              type="text"
              error={flag.lastName}
              helperText={flag.lastNameText}
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%"
                }
              }}
              variant="filled"
              onChange={(newValue) => {
                if (newValue.target.value.trim() === "") {
                  setFlag({ ...flag, lastName: true, lastNameText: "Enter your last name" });
                } else setFlag({ ...flag, lastName: false, lastNameText: "" });
                setNewUser({ ...newUser, last_name: newValue.target.value.trim() })
              }}
            />
          </Stack>
          <Stack spacing={2}>
            <div></div>
            <TextField
              margin="none"
              id="email"
              label="Email"
              type="email"
              sx={{ width: "100%" }}
              variant="filled"
              error={error.show}
              helperText={error.message}
              onChange={
                (newValue) => {
                  ValidateEmail(newValue.target.value);
                  setNewUser({ ...newUser, email: newValue.target.value.trim() })
                }
              }
            />
          </Stack>

        </DialogContent>
        <DialogActions sx={{ paddingBottom: "10px", paddingRight: "8px" }}>
          <ColorButton2 autoFocus variant="contained" startIcon={<AddRoundedIcon />} onClick={() => { addDetails() }} disabled={!flag.firstName && !flag.lastName && flag.email && newUser.first_name && newUser.last_name ? false : true}>
            Add
          </ColorButton2>
          <ColorButton onClick={handleClose} variant="contained" startIcon={<CloseRoundedIcon />} autoFocus>
            Close
          </ColorButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppAndNav;
