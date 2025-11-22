import React, { useState } from "react";
import "../styles/Home.css";

import {Link} from "react-router-dom";

//Get the data from the course
const courseData = ["Crypto invest", "Stock market basics", "Gold value"];

//Set each of the courses from the given data
function Home() {
    const [courses, setCourses] = useState([]);

    function createCourses() {
        setCourses(courseData);
    }

    return (
        <>
            <div><h1>Title</h1></div>

            <div className="home-container">
                <div className="home-card">
                    <h2>Forum</h2>
                </div>
                
                {/*One parent div for both cards*/}
                <div>
                    <div className="home-card" id="courseBtn" onClick={createCourses}> 
                        <h2>
                            Courses
                        </h2>
                    </div>

                    {/*Create and map each of the given courses*/}
                    <div id="course-container">
                        {courses.map((course, index) => (
                            <div key={index}>{course}</div>))}
                    </div>
                </div>

                <div className="home-card">
                    <Link to = "/profile">Profile</Link>
                </div>
            </div>
        </>
    );
}

export default Home;
