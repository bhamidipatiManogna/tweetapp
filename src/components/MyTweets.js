import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Feed.css";
import Post from "./Post";
// import db from "./firebase";

function MyTweets() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    validateSession();
    getAllTweets();
}, []);

const validateSession = () => {
  if(sessionStorage.getItem("loggedIn") === "true"){
    setLoggedIn(true)
  }
  else{
    alert("Please Login!!");
    // history.replace("/login");
    setLoggedIn(false)
  }
  // alert("logged In")
}
const [allTweets, setAllTweets] = useState([]);
const getAllTweets = () => {
    const user = sessionStorage.getItem("userName")
  axios.get(`http://44.200.38.38:8080/tweets/${user}`)
    .then(res => {
      console.log("alltweets:::::::::: ", res);
      setAllTweets(res.data)
    })
    .catch(err => console.log("err ", err))
    
}


const [loggedIn, setLoggedIn] = useState(false);
const userName =  sessionStorage.getItem("logUser");

  return (<>
   {loggedIn && <div className="feed">
      <span style={{float:"left", padding: "10px"}}>
          <b>Welcome <i>{userName}! </i></b>
       </span>
      <div className="feed__header">
        <h2>My Tweets</h2>
      </div>
      {allTweets.map((post) => (
        <Post
          displayName={post.userName}
          username={"abhi"}
          text={post.tweetMsg}
          tweetId={post.tweetId}
          editable={true}
        />))}
        
    </div>}
    </>
  );
}

export default MyTweets;