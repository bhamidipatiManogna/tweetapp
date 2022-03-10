import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Feed.css";
import userImage from "../images/user.png";
import Post from "./Post";
// import db from "./firebase";

function AllUsers() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    validateSession();
    getAllUsers();
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
const [allUsers, setAllUsers] = useState([]);
const getAllUsers = () => {
    const user = sessionStorage.getItem("userName")
  axios.get(`http://44.200.38.38:8080/tweets/users/all`)
    .then(res => {
      console.log("allusers: ", res);
      setAllUsers(res.data)
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
        <h2>Users List</h2>
      </div>
      <div style={{width: "60%", background: "#87ceeb", marginBottom:"3%", marginLeft: "20%"}}>
      <tabel >
        <tbody>
        {allUsers.map(data =>
          <tr >
            <td style={{width: "10%"}}><img style={{width: "80px",marginLeft:"25%", borderRadius:"40px", height: "80px"}} src={userImage}/><br/></td>
            <td style={{width: "90%"}}><h3>{data.firstName} {data.lastName}</h3><p>@{data.loginId}</p><br/><hr/></td>
          </tr>
          
           )}
        </tbody>
     
      </tabel>
          </div>
             
    </div>}
    </>
  );
}

export default AllUsers;