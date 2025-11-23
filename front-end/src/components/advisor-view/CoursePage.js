import { useState } from "react"
import { useParams } from "react-router-dom";
import AddGame from "./AddGame";
import AddLecture from "./AddLecture";
import AddQuiz from "./AddQuiz";

function CoursePage(props){
    const [selectedComponent, setSelectedComponent] = useState("");
    const{id}=useParams();

    const handleSelectChange = (event) => {
        setSelectedComponent(event.target.value);
    };

    const renderSelectedComponent = () => {
        switch(selectedComponent) {
            case "lecture":
                return <AddLecture id={id}/>;
            case "quiz":
                return <AddQuiz  id={id}/>;
            case "game":
                return <AddGame  id={id}/>;
            default:
                return <div>Please select a component to load</div>;
        }
    };
    return (
        <div>
            <h2>Course Page</h2>
            
            <select 
                value={selectedComponent} 
                onChange={handleSelectChange}
                style={{ padding: '8px', marginBottom: '20px' }}
            >
                <option value="">Select a component</option>
                <option value="lecture">Add Lecture</option>
                <option value="quiz">Add Quiz</option>
                <option value="game">Add Game</option>
            </select>

            <div style={{ border: '1px solid #ccc', padding: '20px', minHeight: '100px' }}>
                {renderSelectedComponent()}
            </div>
        </div>
    );
}
export default CoursePage