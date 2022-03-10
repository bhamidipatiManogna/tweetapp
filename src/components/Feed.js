import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Feed.css";
import { useHistory } from 'react-router-dom';
import Post from "./Post";
import Tweets from "./Tweets";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import db from "./firebase";
import userImage from "../images/user.png";
import moment from "moment";

function Feed() {
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
const loginId = sessionStorage.getItem("userName");
const [allTweets, setAllTweets] = useState([]);
const [searchText, setSearchText] = useState("");
let totalTweets = [];
const getAllTweets = () => {
  axios.get("http://44.200.38.38:8080/tweets/all")
    .then(res => {
      console.log("alltweets: ", res);
      // totalTweets = res.data.map((post) => 
      //   post.loginId !== loginId ? post : []
      // )
      setAllTweets(res.data)
    })
    .catch(err => console.log("err ", err))
    
}

const handlePost = () => {
  const today = new Date();
  // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let date = moment(today).format('YYYY-MM-DD');
  // alert(date);
  const user = sessionStorage.getItem("userName");
  const data = {
    tweetId: '_' + Math.random().toString(36).substr(2, 9),
    userName: user,
    tweetMsg: newPost,
    tweetTag: "",
    dateOfTweet: date
  }
  console.log("reqData========", JSON.stringify(data));
  if(newPost===""){
    alert("please enter the post...")
  }
  else{
  axios.post(`http://44.200.38.38:8080/tweets/${user}/add`, data)
  .then(res => {
    console.log("post res: ", res);
    window.location.reload();
    // alert(res)
  })

  .catch(err => console.log("post error: ", err))
  setNewPost("");
  console.log("new tweet: ", data)
}
}

const onTextChange = (e) => {
  const stxt = e.currentTarget.value;
  if (stxt==="")
   handleSearch();
  setSearchText(stxt);
}
const handleSearch = () => {
  
  let searchResult = [];
  if(searchText === ""){
    window.location.reload();
      searchResult = allTweets;
    setAllTweets(searchResult);
  }
  if(searchText){
    searchResult = allTweets.map((tweet) => 
      tweet.userName === searchText ? tweet:[] 
    ) 
    setAllTweets(searchResult);
  }
}
const [loggedIn, setLoggedIn] = useState(false);
const [newPost, setNewPost] = useState("");
const userName =  sessionStorage.getItem("logUser");

  return (<>
   {loggedIn && <div className="feed">
     <span style={{float:"left", padding: "10px"}}>
       <b>Welcome <i>{userName}! </i></b>
       </span>

      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <div style={{marginLeft: "10%", width: "80%"}}>
      <TextareaAutosize
      style={{width: "80%", height: "80px"}}
      rowsMax={4}
      aria-label="maximum height"
      placeholder="What happened!!"
      defaultValue=""
      value={newPost}
      onChange = {(e) => {
        if(newPost.length <= 144){
        setNewPost(e.currentTarget.value)}}}
    /><br/>
    <input placeholder="Search users here..." style={{width:"250px", height:"28px"}} onChange={(e) => onTextChange(e)} type="text"></input><button style={{ color:"white", cursor:"pointer", background:"#4169e1", height:"30px"}} onClick={() => handleSearch()}><b>Search</b></button>
    <button style={{marginLeft: "27.5%", width: "20%", height: "40px", color: "white", background: "#4169e1"}} onClick={() => handlePost()}><b>Post Tweet</b></button>
      </div>
      <br/>
      {allTweets.map((post) => (
        post.userName?
        <Post
          displayName={post.userName}
          username={"abhi"}
          text={post.tweetMsg}
          tweetId={post.tweetId}
          editable={false}
        />:<></>))}
        
    </div>}
    </>
  );
}

export default Feed;