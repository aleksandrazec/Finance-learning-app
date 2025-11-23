import React from "react";
import userIcon from "../images/userIcon.png";
import streakGif from "../images/streak.gif";

import "../styles/Profile.css";

function Profile(){

    return(
        <>
            <h1> My profile </h1>
            
            {/*Main container*/}
            <div id="user-container">
                <div className="container-header">
                    <h2>User information</h2>

                    <img src={userIcon} id="userIcon"/>

                    <div className="user-data">
                        <h2>Username:</h2>
                        {/* <h3>Name:</h3> */}
                        {/* <h3>Surname:</h3> */}
                        <h3>E-mail:</h3>
                    </div>
                </div>
            </div>

            {/*Streak container*/}
            <div id="streak-container">
                <div id="progressBar">Progress</div>
                <img src={streakGif} id="streakGif"/>
            </div>
        </>
    )
}

export default Profile;