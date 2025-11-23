import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import TabContainer from "./tab-navigator/TabContainer";
import CourseCard from "./CourseCard";
import api from "../services/api";
// const courseData = [
//   { 
//     name: "Crypto invest", 
//     description: "Learn about cryptocurrency investments and blockchain technology."
//   },
//   { 
//     name: "Stock market basics", 
//     description: "Understand the fundamentals of stock trading and market analysis."
//   },
//   { 
//     name: "Gold value", 
//     description: "Discover the value of gold as a stable investment asset."
//   }
// ];

function Home() {
    const [courses, setCourses] = useState([]);
    // const [selectedCourse, setSelectedCourse] = useState(null);

   useEffect(()=>{

    const getCourses = ()=>{
        try {
            api.get(`/course/list`)
            .then(result=>{
                console.log(result.data)
                setCourses(result.data)})
            .catch(err=>console.error(err))
        } catch (error) {
            console.error(error)
        }
        
    } 
        getCourses()
    },[])
    // useEffect(() => {
    //     setCourses(courseData);
    // }, []);

    // // Click function for individual courses
    // function selectCourse(course, index) {
    //     setSelectedCourse(course);
    // }

    return (
        <>
            <div id="course-card">
                <h1>Courses</h1>

            </div>

            {/* <div id="course-container"> */}
            {/* {courses.map((course, index) => (
                    <div 
                        key={index} 
                        className="course-item"
                        onClick={() => selectCourse(course, index)}
                        style={{ cursor: "pointer" }}
                    >
                        {course.name}
                    </div>
                ))} */}
            <div>
                {
                    courses ?
                        courses.map(course =>
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                advisor_id={course.advisor_id}
                                difficulty={course.difficulty}
                                description={course.description}
                                structure_file={course.structure_file}
                            />)
                        :
                        <></>
                }
            </div>

            {/* </div> */}
            {/* 
            <div id="courses-description">
                {selectedCourse && (
                    <div className="course-description">
                        <h3>{selectedCourse.name}</h3>
                        <p>{selectedCourse.description}</p>
                        <Link to={`/course/${selectedCourse.name.toLowerCase().replace(/\s+/g, '-')}`} className="take-course-btn">
                            Take course
                        </Link>
                    </div>
                )}
            </div> */}
        </>
    );
}

export default Home;