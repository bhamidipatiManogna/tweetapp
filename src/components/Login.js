import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {

  const {validate} = props;
  const history = useHistory();
  const classes = useStyles();
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(!forgotPassword ){
    const headers = {
      "userName": loginId,
      "password": password
    }
    axios.get("http://44.200.38.38:8080/tweets/login", {headers})
    .then(res => 
      {
        if(res.data === ""){
          alert("Invalid username or password!")
        }
        else{
          sessionStorage.setItem("loggedIn", "true");
          sessionStorage.setItem("userName", res.data.loginId);
          sessionStorage.setItem("logUser",res.data.firstName);
          console.log(res.data,"=============");
          validate();
          history.replace("/tweets")
        }
      })
      // console.log("res: ", res))
      // history.replace("/tweets"))
    .catch(err=> console.log("Error: ", err));
    console.log("login: ", loginId, "password: ", password);
    }
    else{
      if(!email || !password || !confirmPassword){
        alert("Please fill all data!!")
      }
      else if(!emailPattern.test(email)){
        setEmailError(true)
      }
      else if(password !== confirmPassword){
        setPasswordError(true)
      }
      else{
        const headers = {
          "password": password,
          "email": email
        }
        console.log("pass: ", password, "email: ", email)
        axios.get(`http://44.200.38.38:8080/tweets/${loginId}/forgot`, {headers})
        .then(res => 
          {
            console.log("res: ", res)
            if(res.data === true){
              setForgotPassword(false);
              setConfirmPassword("");
              alert("password updated successfuly")
            }
          else{
            alert("User doesnot exist!")
         }
          })
          .catch(err => {console.log("Error: ", err)})
      }

    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper} style = {{background: "white", padding: "50px"}}>
      <h2 style = {{color: "blue"}}><i><em>TweetApp</em></i></h2>
        {/* <Avatar className={classes.avatar}>
          icon
        </Avatar> */}
        <Typography component="h1" variant="h5">
          {forgotPassword ? "Forgot Password" : "Sign in"}
        </Typography>
        {/* <form className={classes.form} noValidate> */}
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="UserName"
            name="email"
            autoComplete="email"
            autoFocus
            value = {loginId}
            onChange={(e) => {setLoginId(e.currentTarget.value)}}
          />
          {forgotPassword &&
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            
            value = {email}
            onChange={(e) => {
              setEmailError(false)
              setEmail(e.currentTarget.value)}}
          />
          }
          {forgotPassword && emailError && <p style={{color:"red"}}>Please Enter valid email address</p>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={forgotPassword ? "New Password" : "password"}
            type="password"
            id="password"
            autoComplete="current-password"
            value = {password}
            onChange={(e) => {setPassword(e.currentTarget.value)}}
          />
          {forgotPassword && <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="text"
            id="password"
            autoComplete="current-password"
            value = {confirmPassword}
            onChange={(e) => {
              setPasswordError(false)
              setConfirmPassword(e.currentTarget.value)}}
          />}
          {forgotPassword && passwordError && <p style={{color: "red"}}>Password not matching!!</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSignin()}
          >
            {forgotPassword ? "Update Password" : "Sign In" }
          </Button>
          {!forgotPassword && <Grid container >
            <Grid item xs>
              <Link href="#" variant="body2" onClick={() => setForgotPassword(true)}  >
              Forgot password?
              </Link>
            </Grid>
            <Grid item>
            {/* <Link to = "/registration" >Don't have an account? Sign Up</Link> */}
              {/* <button onClick={() => history.push("/registration")}>Don't have an account? Sign Up</button> */}
                <Link href="" variant="body2" onClick={() => history.push("/registration")}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>}
        {/* </form> */}
        {/* {forgotPassword && <button onClick={() => setForgotPassword(false)}>Cancel</button>} */}
        {forgotPassword && <Button onClick={() => setForgotPassword(false)} variant="contained" color="secondary">Cancel</Button>}
      </div>
      
    </Container>
  );
}

export default Login;