import { useState, useEffect, useContext } from "react"
import { UserContext } from '../../UserContext';
import api from "../../services/api";
import CourseCard from "./CourseCard";

function ViewCourses(props) {
    const user = useContext(UserContext)
    const [courses, setCourses] = useState();
    useEffect(() => {

        const getCourses = () => {
            try {
                api.post(`/list/:id`, user.user_id)
                    .then(result => {
                        console.log(result.data)
                        setCourses(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }

        }
        getCourses()
    }, [])

    return (
        <div>
            {
                courses ?
                    courses.map(course => <CourseCard title={course.title} key={course.id} id={course.id}/>)
                    :
                    <p>Loading</p>
            }
        </div>
    )
}
export default ViewCourses