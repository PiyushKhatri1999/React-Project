import '../../App.css';
import * as React from 'react';
import { Typography, Snackbar, Link, Button, Box, TextField, Card, Grid, ImageList, ImageListItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import userLogo from '../../images/user-logo.png';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {LOGIN_USER} from "../../constants/constants";
import axios from 'axios';
const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {

  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  label: {
    color: "rgb(255, 255, 255,0.8 )"
  },
  userfield: {
    width: "10px"
  },
  root: {
    '& .MuiFormLabel-root.Mui-disabled': {
      color: 'red',
    },

  }

}));

export default function Login(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setTFValueUsername] = useState("");
  const [password, setTFValuePassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [flagPass, setFlagPass] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  const [errorPass, setErrorPass] = useState({ showPass: false, messagePass: "" });
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  function userLogin() {
    axios.post(LOGIN_USER, {
      "email": username,//"eve.holt@reqres.in",
      "password": password,//"cityslicka"

    })
      .then((res) => {
        navigate("/appandnav");
      }).catch((error) => { setOpen(true) })
  }
  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setFlag(true);
      setError({ ...error, show: false, message: "" });
      return (true)
    } else {
      if(mail.trim().length===0)
      {
        setFlag(false);
        setError({ ...error, show: false, message: "" });  
      }else{
      setFlag(false);
      setError({ ...error, show: true, message: "Invalid email" });
      return (false)
    }
    }
  }

  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          minHeight: '100vh',
          paddingTop: "7%",
        }}
      >
        <Grid item xs={12} sm={6}
          sx={{
            borderRadius: "2px",
          }}
        >
          <form autoSave='false' >
            <Card
              sx={{
                width: 500,
                height: 500,
                backgroundColor: "rgba(248, 248, 248, 0.7)",
                borderRadius: '20px',
              }}
              id="card"
              elevation={7}
            >
              <Grid container
                rowSpacing={3}
                columns={1}
                direction="column"
                alignItems="center"
                justify="center"

              >
                <Grid item xs={12}    >
                  <ImageList>
                    <ImageListItem key={1}>
                      <img
                        alt={"Remy Sharp"}
                        src={userLogo}

                        style={{
                          width: "150px", height: "150px", borderRadius: "50%", backgroundColor: '#b8afc2',
                          marginLeft: "50%"
                        }}
                      />
                    </ImageListItem>
                  </ImageList>
                </Grid>
                <Grid item width={400} >
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ThemeProvider theme={theme}>
                      <TextField id="1" autoComplete='flase' className='userfield' onChange={
                        (newValue) => {
                          setTFValueUsername(newValue.target.value.trim())
                          ValidateEmail(newValue.target.value)
                        }
                      } helperText={error.message} error={error.show} type="email" label="Email" variant="filled" sx={{ width: "100%", backgroundColor: "white" }} required />
                    </ThemeProvider>
                  </Box>
                </Grid>
                <Grid item xs width={400}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField id="2" className={classes.root}
                      onChange={(newValue) => {
                        setTFValuePassword(newValue.target.value);
                        if (newValue.target.value.length <= 4) {
                          setFlagPass(false);
                          setErrorPass({ ...errorPass, showPass: true, messagePass: "Enter min 5 character" })
                        } else {
                          setFlagPass(true);
                          setErrorPass({ ...errorPass, showPass: false, messagePass: "" })
                        }
                      }
                      }
                      error={errorPass.showPass}
                      helperText={errorPass.messagePass}
                      type="password" label="Password" variant="filled" sx={{ width: "100%", backgroundColor: "white" }} required />
                  </Box>
                </Grid>
                <Grid item xs width={400}>
                  <Button onClick={() => {
                    userLogin();
                  }} variant="contained" fullWidth color="info" disabled={flagPass && flag ? false : true}>
                    Login
                  </Button>
                  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      Unable to Login!
                    </Alert>
                  </Snackbar>
                </Grid>
                <Grid item xs width={400}>
                  <Typography variant="body1" style={{ color: "white" }} >Not have account?
                      <Link href="./signup"  underline="none" sx={{ marginTop: "2.%", fontFamily: "sans-serif", color: "purple", }}>
                        {' Sign up'}
                      </Link>
                  </Typography>

                </Grid>
              </Grid>
            </Card>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}


