import React, { useState, useEffect } from "react";
// import { withRouter } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import tweetIcon from "../images/tweet.jpg";
import registerIcon from "../images/register.png";
import loginIcon from "../images/login.png";
import Login from "./Login";
import Registration from "./Registration";
import Feed from "./Feed";
import MyTweets from "./MyTweets";
import AllUsers from "./AllUsers";
import Tweets from "./Tweets";
import Home from "./Home";
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const AppIndex = () => {

  useEffect(() => {
    validateSession();
  }, []);

  const history = useHistory();
  const validateSession = () => {
    if (sessionStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false)
    }
    // alert("logged In")
  }
  const handleLogout = () => {
    // sessionStorage.setItem("loggedIn", "false");
    sessionStorage.clear();
    validateSession()
    // history.push("/register")
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
            {/* {loggedIn && <Button onClick={() => handleLogout()}>
             
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <img style={{width:"50px", height:"50px", borderRadius:"20px"}} src={tweetIcon}></img>
              </IconButton></Button>} */}
              {loggedIn && <Typography variant="h6" className={classes.title} style={{ marginLeft: "-53%" }}>
                TweetApp
              </Typography>}
              {loggedIn && <Button style={{ background: "white",borderRadius:"10px 10px 10px 10px" }} color="white" ><Link to="/tweets" style={{ textDecoration: 'none',color:"black" }} >Tweets</Link></Button>}
          &nbsp;&nbsp; {loggedIn && <Button style={{ background: "white",borderRadius:"10px 10px 10px 10px" }} color="white" ><Link to="/allusers" style={{ textDecoration: 'none',color:"black" }} >All Users</Link></Button>}
          &nbsp;&nbsp; {loggedIn && <Button style={{ background: "white",borderRadius:"10px 10px 10px 10px" }} color="white" ><Link to="/mytweets" style={{ textDecoration: 'none',color:"black" }} >My Tweets</Link></Button>}
         &nbsp;&nbsp; {!loggedIn && <Button style={{ background: "white",marginLeft:"80%" }} color="white" > <img src={registerIcon} width="20" height="20"/>  <Link to="/registration" style={{ textDecoration: 'none',color:"black" }} >Register</Link></Button>}
         &nbsp;&nbsp; {!loggedIn && <Button style={{ background: "white" }} color="white"><img src={loginIcon} width="20" height="20"/><Link to="/" style={{ textDecoration: 'none',color:"black" }} >Login</Link></Button>}
         &nbsp;&nbsp; {loggedIn && <Button style={{ background: "red",borderRadius:"10px 10px 10px 10px" }} onClick={() => handleLogout()} ><Link to="/" style={{ textDecoration: 'none', color: "white" }} ><b>Logout</b></Link></Button>}
              {/* &nbsp;&nbsp; {loggedIn && <Button style={{background: "white"}} color = "white" onClick={() => handleLogout()}>Logout</Button>} */}

            </Toolbar>
          </AppBar>
          {/* <Router history={history}> */}
          <Switch>
            {/* <Route exact path="/">
              <Home />
            </Route> */}
            <Route exact path="/">
              <Login validate={() => validateSession()} />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/tweets">
              <Feed />
            </Route>
            <Route path="/mytweets">
              <MyTweets />
            </Route>
            <Route path="/allusers">
              <AllUsers />
            </Route>
            <Route path="/viewTweet">
              <Tweets />
            </Route>
          </Switch>
        </div>
        {/* </Router> */}

      </Router>
      {/* </div> */}
      {/* <h1>Welcome to Tweet Application</h1> */}
      {/* <div style={{minHeight:"500px"}}>@copyright</div> */}
    </div>
  )
}

export default AppIndex;