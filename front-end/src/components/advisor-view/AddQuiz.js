import { useState } from "react"
import api from "../../services/api"

function AddQuiz(props){

    const {
        id
    } = props
    const [text, setText]=useState('')

    const [state, setState] = useState({
        question: '',
        course_id: id,
        answer: '',
        wrong_op1: '',
        wrong_op2:'',
        wrong_op3:''
    })
    const addNewQuiz = async()=>{
        try{
            await api.post('/quiz/', {...state})
            setText('Created Quiz.')
            setState(prev => ({ ...prev, question:'', answer:'', wrong_op1:'',wrong_op2:'',wrong_op3:''}));
        }catch(error){
            console.error(error)
        }
    }
    
    return (
        <div>
            <p>Question:</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: inputQuestion } }) => setState(prevState => ({ ...prevState, question: inputQuestion }))} value={state.question} /><br />
            <p>Answer:</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: inputAnswer } }) => setState(prevState => ({ ...prevState, answer: inputAnswer }))} value={state.answer} /><br />
            <br />
            <p>Wrong option 1:</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: inputOP1 } }) => setState(prevState => ({ ...prevState, wrong_op1: inputOP1 }))} value={state.wrong_op1} /><br />
            <br />
            <p>Wrong option 2:</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: inputOP2 } }) => setState(prevState => ({ ...prevState, wrong_op2: inputOP2 }))} value={state.wrong_op2} /><br />
            <br />
            <p>Wrong option 3:</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: inputOP3 } }) => setState(prevState => ({ ...prevState, wrong_op3: inputOP3 }))} value={state.wrong_op3} /><br />
            <br />
            <button onClick={() => addNewQuiz()}>Create New Quiz</button>
            <br/>
            {text}
        </div>
    )
}
export default AddQuiz