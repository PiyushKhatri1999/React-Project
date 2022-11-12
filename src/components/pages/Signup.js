import React from 'react';
import '../../App.css';
import { Button, Paper } from "@mui/material";
import { Typography, Link, TextField, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';


const theme = createTheme({
  palette: {
    background: {
      paper: 'rgba(248, 248, 248, .7)', 
      card: "rgba(248, 248, 248, 0.5)"
    },
  },
});
const useStyles = makeStyles((theme) => ({
  pa: {
    width: "400px",
    height: "auto",
    margin: "auto",
    padding: "35px 40px 35px 40px",
    borderRadius:"20px"
  },

  App: {
    backgroundColor: "linear-gradient(to bottom right,blue, indigo, violet)",
    paddingTop: "7%"
  },
  topImg: {
    border: "1px soild black",
    width: "10px",
    height: "10px"
  }

}));

function Signup() {
  const [flag, setFlag] = useState(false);
  const [email,setEmail]=useState("");
  const [error, setError] = useState({ showEmail: false, messageEmail: "", showPass: false, messagePass: ""});
  const [passChar,setPassChar]=useState({showPassChar:false,showPassCharMessage:"" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const classes = useStyles();
  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setFlag(true);
      setError({ ...error, showEmail: false, messageEmail: "" });
      return (true)
    } else {
      if(mail.trim().length===0)
      {
        setFlag(false);
        setError({ ...error, showEmail: false, messageEmail: "" });  
      }else{
        setFlag(false);
        setError({ ...error, showEmail: true, messageEmail: "Invalid email" });
        return (false);
      }
    }
  }
  function validateConfirmPassword(confirmPass) {
    if (confirmPass !== password) {
      setFlag(false);
      setError({ ...error, showPass: true, messagePass: "Password do not match" });
    } else {
      setFlag(true);
      setError({ ...error, showPass: false, messagePass: "" });
    }
  }
  function validatePassword(pass) {
    if(pass.length<=4)
    {
      
      setPassChar({...passChar,showPassChar:true,showPassCharMessage:"Enter min 5 character"})
    }else setPassChar({...passChar,showPassChar:false,showPassCharMessage:""});
    if (confirmPassword !== pass) {
      setFlag(false);
      setError({ ...error, showPass: true, messagePass: "Password do not match" });
    } else {
      setFlag(true);
      setError({ ...error, showPass: false, messagePass: "" });
    }
  }
  return (
    <div className={classes.App}>
      <Paper className={classes.pa + " pa"} elevation={7} theme={theme} sx={{borderRadius:"20px" }}>
      <form  action='/'>
        <Stack spacing={3}>
          
            <Typography variant="h4" style={{ color: "white" }}>Create new Account<span style={{ color: "blueviolet", fontSize: "50px", fontFamily: "vardana" }}  >.</span></Typography>

            <TextField sx={{ backgroundColor: "white" }} onChange={
              (newValue) => {
                setEmail(newValue.target.value);
                ValidateEmail(newValue.target.value)
              }
            } helperText={error.messageEmail} error={error.showEmail} label='Email' type="email" variant='filled'  required fullWidth ></TextField>
            <TextField sx={{ backgroundColor: "white" }} onChange={(newValue) => { setPassword(newValue.target.value); validatePassword(newValue.target.value) }} helperText={passChar.showPassCharMessage} error={passChar.showPassChar} label='Password' type="password" variant='filled' placeholder='Password' required fullWidth ></TextField>
            <TextField sx={{ backgroundColor: "white" }} onChange={(newValue) => {
              setConfirmPassword(newValue.target.value)
              validateConfirmPassword(newValue.target.value)
            }} helperText={error.messagePass} error={error.showPass} label='Confirm Password' type="password" variant='filled'  required fullWidth ></TextField>
            <Button variant='contained' type="submit" disabled={email && flag && password && confirmPassword ? false : true}>Submit</Button>
            <Typography variant="body1" style={{ color: "white" }} alignSelf="center" >Already a Member?
                <Link href="/" underline='none' variant='hover' style={{ color: "purple" }} >
                  {" Login"}
                </Link>
            </Typography>
          
        </Stack>
        </form>
      </Paper>
    </div>
  );
}

export default Signup;
