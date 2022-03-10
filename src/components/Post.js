import { Avatar } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./Post.css";
import userImage from "../images/user.png";

import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

function Post({ displayName, username, text, tweetId, editable }) {
  const history = useHistory();
  const [like, setLike] = useState(false);
  const [totalLikesCount, setTotalLikesCount] = useState(0);
  const [totalComments, setTotalComments] = useState([]);
  const [tId, setTId] = useState("");

  useEffect(() => {
    getAllTweets()
  },[])
  const viewTweet = () => {
    localStorage.setItem('tweetID', tweetId);
    localStorage.setItem('tweetUser', displayName);
    localStorage.setItem('tweetMsg', text);
    history.push("/viewTweet");
  }

  const handleEdit = (id) => {
    // setEditing(true)
    const userName=sessionStorage.getItem("userName");
    const data = {
      tweetId: id,
      userName: userName,
      tweetMsg: editedTweet,
      tweetTag: ""
    }
    console.log("data: ", data)
    axios.put(`http://44.200.38.38:8080/tweets/${userName}/update/${id}`, data)
    .then(res => {
      console.log("alltweets: ", res);
      setEditing(false);
      window.location.reload()
        })
    .catch(err => console.log("err ", err))
    
    
  }
  const getAllTweets = () => {
    // const tweetLId = localStorage.getItem("tweetID")
    // setUser(localStorage.getItem('tweetUser'))
    // setTweetMessage(localStorage.getItem('tweetMsg'))
   
    axios.get(`http://44.200.38.38:8080/tweets/comments/${tweetId}`)
      .then(res => {
        console.log("alltweets: ", res);
        setTotalComments(res.data)
        // setAllTweets(res.data)
      })
      .catch(err => console.log("err ", err))

    axios.get(`http://44.200.38.38:8080/tweets/likes/${tweetId}`)
      .then(res => {
        console.log("likes: ", res);
        res.data.map(data => {
          if (data.loginId === sessionStorage.getItem("userName")) {
            setLike(true)
          }
        })
        setTotalLikesCount(res.data.length)
        // setTweetLikes(res.data)
        // setComments(res.data)
        // setAllTweets(res.data)
      })
      .catch(err => console.log("err ", err))

  }
  const handleDelete = () => {
    const userName=sessionStorage.getItem("userName");
    axios.delete(`http://44.200.38.38:8080/tweets/${userName}/delete/${tweetId}`)
    .then(res => {
      console.log("alltweets: ", res);
      // setEditing(false);
      window.location.reload()
        })
    .catch(err => console.log("err ", err))
    
  }
  const [editing, setEditing] = useState(false);
  const [editedTweet, setEditedTweet] = useState(text);
  // #659DBD
  return (
    <div>
      {!editable &&
    <div style={{background: "#87ceeb", color: "black", cursor: "pointer", width: "30%", float:"left", marginBottom:"3%", marginLeft: "13%",fontSize:"13px"}} onClick={() => {viewTweet()}}>
      <tabel >
        <tbody>
          <tr>
            <td rowSpan="3" style={{width: "10%"}}><img style={{width: "70px", height: "70px", marginLeft:"20%", marginTop:"10%", borderRadius:"50px"}} src={userImage}/></td>
            {/* <td style={{width: "90%"}}><h3>{displayName}</h3><p>{text}</p></td> */}
            <td style={{width: "90%", marginTop:"50%"}}><b style={{float:"left", paddingLeft:"10%"}}>{displayName}: &nbsp;</b> <span style={{float:"left"}}>{text}</span></td>
          </tr>
          
          {/* <tr>
            <td style={{width: "90%"}}><p>{text}</p></td>
          </tr> */}
          <tr style={{border: "2px"}}>
            {/* <td style={{width: "10%"}}></td> */}
            {/* <td style={{width: "90%"}}>comment &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Like</td> */}
            <td style={{width: "90%"}}><span onClick={() => {viewTweet()}}><b>View Post</b></span></td>
          </tr>
          <tr>
            <td>View  {totalComments.length} comments&nbsp; &nbsp; &nbsp; 
            <button style={{ cursor: "", background: `${like ? "blue" : "white"}`, color: `${like ? "white" : "black"}` }} onClick={() => { }}>Likes </button><b> {totalLikesCount}</b>
            </td>
          </tr>
        </tbody>
      </tabel>
      </div>}
          {editable && 
            <div style={{background: "#87ceeb", color: "black", marginBottom:"3%", width: "30%", float:"left", marginLeft: "13%",fontSize:"13px"}} >
            <tabel >
              <tbody>
                <tr>
                  <td rowSpan="2" style={{width: "10%"}}><img style={{width: "70px", height: "70px", marginLeft:"20%", marginTop:"10%", borderRadius: "50px"}} src={userImage}/></td>
                  {!editing && <td style={{width: "90%", marginTop:"50%"}}><b style={{float:"left", paddingLeft:"10%"}}>{displayName}: &nbsp;</b> <span style={{float:"left"}}>{text}</span></td>}
                  {editing && <div style={{marginLeft: "10%", width: "80%"}}>
      <TextareaAutosize
      style={{width: "80%", height: "80px", marginTop: "5%"}}
      rowsMax={4}
      aria-label="maximum height"
      placeholder="What happened!!"
      defaultValue=""
      value={editedTweet}
      onChange = {(e) => {
        if(editedTweet.length <= 144){
        setEditedTweet(e.currentTarget.value)}}}
    />
    <button style={{cursor: "pointer", marginLeft: "3%", width: "30%", height: "40px", color: "black", background: "white"}} onClick={() => handleEdit(tweetId)}><b>Update</b></button>
    <button style={{cursor: "pointer", marginLeft: "1%", width: "30%", height: "40px", color: "black", background: "yellow"}} onClick={() => setEditing(false)}><b>Cancel</b></button>
      </div>}
                </tr>
                <tr style={{border: "2px"}}>
                  {/* <td style={{width: "10%"}}></td> */}
                  {/* <td style={{width: "90%"}}>comment &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Like</td> */}
                  {!editing && <td style={{width: "90%"}}><span onClick={() => {viewTweet()}} style={{cursor: "pointer"}}><b>View Post</b></span></td>}
                  {editing && <td></td>}
                </tr>
                <tr>
                <td>{!editing && <Button onClick={() => setEditing(true)} style={{ float: "right", marginLeft: "0%"}} variant="contained" color="primary"><b>Edit</b></Button>}&nbsp;</td>
                <td>{!editing && <Button onClick={() => handleDelete()} style={{marginLeft:"60%", float: "left", marginLeft: "68%", marginTop:"2%", marginBottom: "2%"}} variant="contained" color="secondary"><b>Delete</b></Button>}</td>
                
                </tr>
              </tbody>
            </tabel>
            <br/>
                </div>
          }
      {/* <br/> */}
          </div>
  );
}

export default Post;