import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./TweetBox.css";
import userImage from "../images/user.png";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

function Tweets() {

  useEffect(() => {
    validateSession();
    getAllTweets();
  }, []);

  const validateSession = () => {
    if (sessionStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true)
    }
    else {
      alert("Please Login!!");
      // history.replace("/login");
      setLoggedIn(false)
    }
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const [newReply, setNewReply] = useState("");
  const getAllTweets = () => {
    const tweetId = localStorage.getItem("tweetID")
    setUser(localStorage.getItem('tweetUser'))
    setTweetMessage(localStorage.getItem('tweetMsg'))
    axios.get(`http://44.200.38.38:8080/tweets/comments/${tweetId}`)
      .then(res => {
        console.log("alltweets: ", res);
        setComments(res.data)
        // setAllTweets(res.data)
      })
      .catch(err => console.log("err ", err))

    axios.get(`http://44.200.38.38:8080/tweets/likes/${tweetId}`)
      .then(res => {
        console.log("likes: ", res);
        res.data.map(data => {
          if ((data.loginId === sessionStorage.getItem("userName"))) {
            setLiked(true)
          }
        })
        setTotalLikes(res.data.length)
        setTweetLikes(res.data)
        // setComments(res.data)
        // setAllTweets(res.data)
      })
      .catch(err => console.log("err ", err))

  }
  const handleLike = () => {

    if (!liked) {
      setLiked(true);
      setTotalLikes(totalLikes + 1)
    
    const userName = sessionStorage.getItem("userName");
    const tweetId = localStorage.getItem("tweetID");
    axios.put(`http://44.200.38.38:8080/tweets/${userName}/like/${tweetId}`)
      .then(res => { console.log("res: ", res) })
      .catch(err =>  { console.log("err: ", err) })
    // alert("liked")
  }
  if (liked) {
    setLiked(false);
    if(totalLikes!=0){
    setTotalLikes(totalLikes - 1)
    }
  const userName = sessionStorage.getItem("userName");
  const tweetId = localStorage.getItem("tweetID");
  axios.delete(`http://44.200.38.38:8080/tweets/${userName}/unlike/${tweetId}`)
    .then(res => { console.log("res: ", res) })
    .catch(err =>  { console.log("err: ", err) })
  // alert("liked")
}
}
 

  const [comments, setComments] = useState([]);
  const [tweetLikes, setTweetLikes] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [tweetMsg, setTweetMessage] = useState("");
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState("");
  const logUser =  sessionStorage.getItem("logUser");

  const submitReply = () => {
    // e.preventDefault();

    const today = new Date();
    let date = moment(today).format('YYYY-MM-DD');
    const userName = sessionStorage.getItem("userName");
    const tweetId = localStorage.getItem("tweetID");

    const data = {
      tweetId: tweetId,
      loginId: userName,
      comment: newReply,
      // dateOfComment: date
    }
    console.log("reply: ", newReply)
    axios.post(`http://44.200.38.38:8080/tweets/${userName}/reply/${tweetId}`, data)
      .then(res => { console.log("res: ", res) })
      .catch(err => { console.log("err: ", err) })
     window.location.reload();
    getAllTweets()
    setNewReply("")
 
  };

  return (
    <div>
      <span style={{float:"left", padding: "10px"}}>
       <b>Welcome <i>{logUser}! </i></b>
       </span>
       <br/>
    <h2 style={{marginRight:"20%"}}>Reply to post</h2>
    <div className="tweetBox" style={{ marginLeft: "10%", width: "80%" }}>
      
      <br />
      {loggedIn && <div style={{ marginBottom: "3%", width: "65%", float: "left", marginLeft: "15%" }}>
        <tabel >
          <tbody>
            <tr style={{ border: "20px", background: "#00bfff", color: "black" }}>
              <td rowSpan="2" style={{ width: "10%" }}><img style={{ width: "70px", margin:"20%", borderRadius: "50px", height: "70px" }} src={userImage} /></td>
              {/* <td style={{ width: "90%" }}><h3>{user}</h3><p>{tweetMsg}</p></td> */}
              <td style={{width: "90%", marginTop:"50%"}}><b style={{float:"left", paddingLeft:"10%"}}>{user}: &nbsp;</b> <span style={{float:"left"}}>{tweetMsg}</span></td>
            </tr>
            <tr style={{ border: "2px", background: "#00bfff", color: "black" }}>
              {/* <td style={{ width: "10%" }}></td> */}
              {/* <td style={{width: "90%"}}>replies {comments.length} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<button style={{color: `${liked ? "blue" : "white"}`}} onClick={()=>{handleLike()}}><i class="glyphicon glyphicon-thumbs-up"></i> <b>{totalLikes}</b></button></td> */}
              <td style={{ width: "90%" }}>comments: {comments.length} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <button style={{ cursor: "pointer", background: `${liked ? "blue" : "white"}`, color: `${liked ? "white" : "black"}` }} onClick={() => { handleLike() }}>{liked ? "Liked" : "Like"} </button><b> {totalLikes}</b></td>
            </tr>
            {/* <tr style={{ border: "2px", background: "#bcd4e6" }}>
              <td style={{ width: "10%" }}></td>
              <td style={{ width: "90%", color: "black" }}><b></b></td>
            </tr> */}
            {comments.map(data =>
              <tr style={{ background:"#87ceeb"}}>
                <td style={{ width: "0%",marginLeft:"130%" }}><img style={{ width: "20px", height: "20px", borderRadius:"10px" }} src={userImage} /></td>
                <td style={{ width: "0%" }}>
                  <b>@{data.loginId}:&nbsp;</b>
                  {data.comment}
                  <br /><br />
                </td>
              </tr>
            )}
            {/* <tr style={{border: "2px"}}>
            <td style={{width: "10%"}}></td>
            <td style={{width: "90%", color:"white"}}><br/>
              <img style={{width: "60px", height: "60px"}} src={userImage}/>
              <TextField size="large" id="outlined-basic" label="Type your comment!!" variant="outlined" />
              
              <Button variant="contained" color="primary">Reply</Button>
            </td>
          </tr>
           */}
          </tbody>
        </tabel>
        <br /><br />
        <table style={{ background: "white",marginTop:"-20px" }}>
          <tbody>
            <tr>
              <td style={{ width: "10%" }}><img style={{ width: "50px", height: "50px" }} src={userImage} /></td>
              <td style={{ width: "80%" }}>
                <TextareaAutosize
                  style={{ width: "80%", height: "80px" }}
                  rowsMax={2}
                  aria-label="maximum height"
                  placeholder="comments" {...user}
                  defaultValue=""
                  value={newReply}
                  onChange={(e) => {
                    if (newReply.length <= 144) {
                      setNewReply(e.currentTarget.value)
                    }
                  }}
                />
                {/* <TextField 
                size="large" 
                id="outlined-basic" 
                label="Type your Reply!!" 
                variant="outlined" 
                value={newReply}
                onChange={(e) => {
                  if(newReply.length <= 144){
                  setNewReply(e.currentTarget.value)}
                }}
              /> */}
              </td>
              <td style={{ width: "10%" }}><Button variant="contained" color="primary" onClick={() => submitReply()}>Reply</Button></td>
            </tr>
          </tbody>
        </table>
        <br /><br />
      </div>}
    </div>
    </div>
  );
}

export default Tweets;
