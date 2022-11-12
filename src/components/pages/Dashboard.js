import React from 'react';
import '../../dashboard.css';
import { useState, useEffect } from 'react';
import { Typography, Stack, Card, Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle, } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { purple, indigo } from '@mui/material/colors';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userList, editSagaUser, deleteSagaUser } from '../../actions/actions';

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
function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [openDelete, setDeleteOpen] = React.useState(false);
  const [editUser, setEditUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [flag, setFlag] = useState({ firstName: true, lastName: true, email: true,firstNameText: "",lastNameText:"" });
  const [error, setError] = useState({ show: false, message: "" });
  const theme = useTheme();
  const dispatch = useDispatch();
  let sagaData = useSelector((state) => state.userData);
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    getUsers();
  }, []);
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
  const getUsers = () => {
    dispatch(userList());
  }
  const handleClickOpen = (id) => {
    for (let i = 0; i < sagaData.length; i++) {
      if (sagaData[i] !== undefined) {
        let user;
        if (sagaData[i].id === id) {
          user=sagaData[i];
          setEditUser({...user});
        }
      }
    }
    setOpen(true);
  };

  const handleDeleteClickOpen = (id) => {
      for (let i = 0; i < sagaData.length; i++) {
        if (sagaData[i] !== undefined)  {
          let user;
          if (sagaData[i].id === id) {
            user=sagaData[i];
          setDeleteUser({ ...user });
        }
      }
    }
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setError({ ...error, show: false, message: "" });
    setFlag({ ...flag, email: false });
    setFlag({ ...flag, lastName: true, lastNameText: "" ,firstName: true, firstNameText: ""});
    setOpen(false);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const editDetails = () => {
    setOpen(false);
    dispatch(editSagaUser(editUser));
  }
  const deleteDetails = () => {
    dispatch(deleteSagaUser(deleteUser));
    setDeleteOpen(false);
  }
  return (

    <div className="App">

      <Stack spacing={1}>
        <Typography variant="h2" gutterBottom color="white">h</Typography>
      </Stack>
      <div className="flex">
        {sagaData.length &&
          sagaData.map((user) => {
            if (user !== undefined) {
              return (

                <div key={user.id}>

                  <Card sx={{ width: 300, height: 350 }} elevation={9}>
                    <Stack alignItems="center" spacing={2}>
                      <p></p>
                      <div className='imgDiv'><img className='userImg' alt="img" key={user.avatar} src={user.avatar} /></div>
                      <Typography variant='body1'><strong >{user.first_name}</strong></Typography>
                      <Typography variant='body1'><strong>{user.email}</strong></Typography>
                      <p></p>
                      <div style={{ display: "flex", position: "relative", width: "100%" }}>
                        <table style={{ width: "100%", borderSpacing: "25px 0px" }}>
                          <thead>

                            <tr>
                              <td>
                                <ColorButton2 variant='Filled' startIcon={<EditTwoToneIcon />} onClick={() => { handleClickOpen(user.id); }}>Edit</ColorButton2>
                              </td>
                              <td>
                                <ColorButton variant='Filled' startIcon={<DeleteOutlineTwoToneIcon />} onClick={() => { handleDeleteClickOpen(user.id); }}>Delete</ColorButton>
                              </td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </Stack>
                  </Card>
                </div>
              );
            }else return null;
          })}
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" alignSelf="center">
          <span style={{ color: "rgba(165, 107, 219, 1)" }}><strong>{"Edit Details"}</strong></span>
        </DialogTitle>
        <DialogContent>
          <Stack>
            <img src={editUser.avatar} alt="img" className='userImg'
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
              error={!flag.firstName}
              helperText={flag.firstNameText}
              value={editUser.first_name}
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%"
                }
              }}
              variant="filled"
              onChange={(newValue) => {
                setEditUser({ ...editUser, first_name: newValue.target.value });
                if (newValue.target.value.trim() === "") {
                  setFlag({ ...flag, firstName: false, firstNameText: "Enter your first name" });
                } else setFlag({ ...flag, firstName: true, firstNameText: "" });
              }}
            />
            <p></p>
            <TextField
              margin="none"
              id="LastName"
              label="Last Name"
              type="text"
              error={!flag.lastName}
              helperText={flag.lastNameText}
              value={editUser.last_name}
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%"
                }
              }}
              variant="filled"
              onChange={(newValue) => {
                setEditUser({ ...editUser, last_name: newValue.target.value });
                if (newValue.target.value.trim() === "") {
                  setFlag({ ...flag, lastName: false, lastNameText: "Enter your last name" });
                } else setFlag({ ...flag, lastName: true, lastNameText: "" });
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
              value={editUser.email}
              sx={{ width: "100%" }}
              variant="filled"
              error={error.show}
              helperText={error.message}
              onChange={
                (newValue) => {
                  setEditUser({ ...editUser, email: newValue.target.value });
                  ValidateEmail(newValue.target.value)
                }
              }
            />
          </Stack>

        </DialogContent>
        <DialogActions sx={{ paddingBottom: "10px", paddingRight: "8px" }}>
          <ColorButton2 autoFocus variant="contained" startIcon={<BookmarkRoundedIcon />} onClick={editDetails} disabled={flag.firstName && flag.lastName && flag.email ? false : true}>
            Save
          </ColorButton2>
          <ColorButton onClick={handleClose} variant="contained" startIcon={<CloseRoundedIcon />} autoFocus>
            Close
          </ColorButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete"} <span style={{ color: "rgba(165, 107, 219, 1)" }}><strong>{deleteUser.first_name}</strong></span> {"?"}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions sx={{ paddingBottom: "10px", paddingRight: "8px" }}>
          <ColorButton2 autoFocus variant="contained" startIcon={<DeleteOutlineTwoToneIcon />} onClick={deleteDetails}>
            Delete
          </ColorButton2>
          <ColorButton onClick={handleDeleteClose} variant="contained" startIcon={<CloseRoundedIcon />} autoFocus>
            Close
          </ColorButton>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Dashboard;
