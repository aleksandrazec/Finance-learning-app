import { useNavigate } from "react-router";

function NodeCard(props) {
    const navigate = useNavigate();

    const {
        id,
        title,
        advisor_id,
        difficulty,
        description,
        structure_file,
        type,
        courseId,
        position
    } = props;

    const goToNode = async () => {
        try {
            // Navigate based on node type
            if (type === 'lecture') {
                navigate(`/lecture/${id}`);
            } else if (type === 'quiz') {
                navigate(`/quiz/${id}`);
            } else if (type === 'game') {
                navigate(`/game/${id}`);
            } else {
                // Fallback for unknown types or use course navigation
                navigate(`/course/${courseId}/node/${id}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Generate display text based on node type
    const getDisplayText = () => {
        if (!type) return title; // Fallback if no type provided
        
        const typeText = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize first letter
        
        if (title) {
            return `${typeText}: ${title}`;
        } else {
            return `${position || ''} . ${typeText} `.trim();
        }
    }

    return (
        <>
            <div id="course-container">
                <div
                    className="course-item"
                    onClick={goToNode}
                    style={{ cursor: "pointer" }}
                >
                    {getDisplayText()}
                </div>
            </div>
        </>
    );
}

export default NodeCard;