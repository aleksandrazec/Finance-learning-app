import { useNavigate } from "react-router";

function CourseCard(props) {
    const navigate = useNavigate();

    const {
        id,
        title,
        advisor_id,
        difficulty,
        description,
        structure_file
    } = props;

    const goToCourse = async () => {
        try {
            navigate(`/course/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div id="course-card">
                <div
                    onClick={() => goToCourse({id})}
                    style={{ cursor: "pointer" }}
                >
                    {title}
                </div>
            </div>
        </>
    );
}

export default CourseCard;