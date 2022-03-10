import React, {useState}  from 'react';
import {Redirect} from 'react-router-dom';
import axios from "axios";
import validator from 'validator';
import Avatar from '@material-ui/core/Avatar';
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
import { useHistory } from 'react-router-dom';

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

const Registration = () => {
  const history = useHistory();

  const classes = useStyles();
  const [formError, setFormError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [loginIdError, setLoginIdError] = useState(false);
  const [contactNoError, setContactNoError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const handleEmailChange=(e)=>{
    var email = e.target.value
    setEmail(email)
    setEmailError(false)
    // if (validator.isEmail(email)) {
    //   setEmail(email);
    //   // setEmailError('Valid Email :)')
    // } else {
    //   setEmailError(true)
    // }
  }

  // const formValidation = () => {
  //   if (validator.isEmail(email)) {
  //     setEmailError(false)
  //   }
  //   else {
  //     setEmailError(true)
  //   }
  //   if(!loginId){
  //     setLoginIdError(true)
  //   }
  //   else{
  //     setLoginIdError(false)
  //   }
  //   if(!firstName){
  //     setFirstNameError(true)
  //   }
  //   else{
  //     setFirstNameError(false)
  //   }
  //   if(!password){
  //     setPasswordError(true)
  //   }
  //   else{
  //     setPasswordError(false)
  //   }
  //   if(!contactNo){
  //     setContactNoError(true)
  //   }
  //   else{
  //     setContactNoError(false)
  //   }
  //   if(!confirmPassword){
  //     setConfirmPasswordError(true)
  //   }
  //   else{
  //     setConfirmPasswordError(false)
  //   }
  // }
  const handleSubmit = () => {
    var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var phonePattern = new RegExp(/^\d{10}$/)
    if(!firstName || !loginId || !email || !contactNo || !password || !confirmPassword){
      setFormError(true)
    }
    else if(!emailPattern.test(email)){
      setEmailError(true)
    }
    else if(password !== confirmPassword){
      setConfirmPasswordError(true)
    }
    else if(!phonePattern.test(contactNo)){
      setContactNoError(true)
    }
    else{
      const resData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        loginId: loginId,
        password: password,
        contactNo: contactNo
      }
      const headers = {

        "content-type": "application/json",

        "Access-Control-Allow-Headers" : "*",

        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT"

    };
      axios.post("http://44.200.38.38:8080/tweets/register", resData,headers)
      .then(res => {
        if(res.data == false){
          alert("username already taken!!") 
        }
        else if(res.data == true){
          history.push("/");
        }
        else{
          alert("Please try again!!")
        }
        console.log("Res: ", res)})
      .catch(err => console.log("error: ", err));
      console.log("login Id: ", loginId, " first Name: ", firstName, " lastName: ", lastName, " email: ", email, " password: ", password, " contactNo: ", contactNo)
        
      // setEmail(email);
      setFormError(false)
    } 
    // else {
    //   setEmailError(true)
    // }
   
  }
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper} style = {{background: "white", padding: "50px"}}>
        {/* <Avatar className={classes.avatar}> */}
          {/* <LockOutlinedIcon /> */}
          {/* <i><em>TweetApp</em></i> */}
        {/* </Avatar> */}
        <h2 style = {{color: "blue"}}><i><em>TweetApp</em></i></h2>
        <Typography component="h1" variant="h5">
          RegisterTest
        </Typography>
        {/* <form className={classes.form} noValidate> */}
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="Username"
            autoComplete="Username"
            autoFocus
            value = {loginId}
            onChange={(e) => {
              setLoginIdError(false)
              setLoginId(e.currentTarget.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            value = {firstName}
            onChange={(e) => {
              setFirstName(e.currentTarget.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="lastName"
            label="LastName"
            name="lastName"
            autoComplete="lastName"
            value = {lastName}
            onChange={(e) => {setLastName(e.currentTarget.value)}}
          />
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
              // setEmailError(false)
              handleEmailChange(e)}}
          />
         {emailError && <p style={{color: "red"}}><b>Please Enter a valid Email!!</b></p>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Create Password"
            type="password"
            id="password"
            autoComplete="password"
            value = {password}
            onChange={(e) => {setPassword(e.currentTarget.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirmPassword"
            value = {confirmPassword}
            onChange={(e) => {
              setConfirmPasswordError(false)
              setConfirmPassword(e.currentTarget.value)}}
          />
          {confirmPasswordError && <p style={{color: "red"}}><b>Password and Confirm Password should match!!</b></p>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contactNo"
            label="Contact No."
            name="contactNo"
            autoComplete="contactNo"
            value = {contactNo}
            onChange={(e) => {
              setContactNoError(false)
              setContactNo(e.currentTarget.value)}}
          />
          {contactNoError && <p style={{color: "red"}}><b>Contact Number should contain 10 digits!!</b></p>}
          {formError && <p style={{color: "red"}}>Please enter all the mandatory felds marked with *</p>}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {() => handleSubmit()}
            >
          Register
          </Button>
          
        {/* </form> */}
      </div>
      
    </Container>
  );
}

export default Registration;