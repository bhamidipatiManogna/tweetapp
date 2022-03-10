import React from "react";
import homeImg from "../images/bg.png";
import Login from "./Login";

function Home() {
    return (
        <>
        <div>
            {/* <img style={{width:"100%", height:"100%"}} src={homeImg}></img> */}
            <Login></Login>
        </div>
        </>
    )
}

export default Home;