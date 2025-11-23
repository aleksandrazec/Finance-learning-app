import { useState } from "react"
import api from "../../services/api"

function AddLecture(props) {

    const {
        id
    } = props
    const [text, setText]=useState('')

    const [state, setState] = useState({
        title: '',
        course_id: id,
        text_file: ''
    })
    const addNewLecture = async()=>{
        try{
            await api.post('/lecture/', {...state})
            setText('Created lecture.')
            setState(prev => ({ ...prev, title:'', text_file:''}));
        }catch(error){
            console.error(error)
        }
    }
    
    return (
        <div>
            <p>Title:</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: inputTitle } }) => setState(prevState => ({ ...prevState, title: inputTitle }))} value={state.title} /><br />
            <p>Text:</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: inputText } }) => setState(prevState => ({ ...prevState, text_file: inputText }))} value={state.text_file} /><br />
            <br />
            <button onClick={() => addNewLecture()}>Create New Lecture</button>
            <br/>
            {text}
        </div>
    )
}
export default AddLecture