import React from "react";
import "../styles/Home.css"; 
import Courses from "./Courses";

function Home() {
    return (
        <>
        <div><h1>Tittle</h1></div>


        <div className="home-container">
            <div className="home-card">
                <h2>Forum</h2>
            </div>

            <div className="home-card">
                <h2 id = "selectCourse">Courses</h2>
            </div>

            <div className="home-card">
                <h2>Profile</h2>
            </div>
        </div>
        </>
    );
}

export default Home;
