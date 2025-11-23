import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import api from '../../services/api';

function CreateCourse(props) {
    const user = useContext(UserContext)
    const [state, setState] = useState({
        title: 'a',
        advisor_id: 2,
        difficulty: 1,
        description: 'a',
        structure_file: 'a'
    })
    const [text, setText]=useState('')

    const addNewCourse = async()=>{
        console.log(state.title)
        const structure_file_name=state.title+'_structure.txt'
        setState(prevState => ({ ...prevState, structure_file: structure_file_name}))
        try{
            await api.post('/course/', {...state})
            setText('Created course.')
            setState(prev => ({ ...prev, title:'', advisor_id: user.user_id, difficulty: 1, description: '', structure_file: ''}));
        }catch(error){
            console.error(error)
        }
    }
    
    const handleDifficultyChange = (event) => {
        setState(prevState => ({...prevState, difficulty: parseInt(event.target.value)}))
    }

    const sendStockPostRequest = async () => {
        try{
            await api.post('/stock/batch', {text : state.title})
            
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div>
            <h1>New Course: </h1>
            <p>Title:</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: inputTitle } }) => setState(prevState => ({ ...prevState, title: inputTitle }))} value={state.title} /><br />
            <p>Description:</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: inputDescription } }) => setState(prevState => ({ ...prevState, description: inputDescription }))} value={state.description} /><br />
            <p>Difficulty:</p>
            <select
                value={state.difficulty}
                onChange={handleDifficultyChange}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #dee2e6' }}
            >
                <option value={1}>1 - Very Easy</option>
                <option value={2}>2 - Easy</option>
                <option value={3}>3 - Medium</option>
                <option value={4}>4 - Hard</option>
                <option value={5}>5 - Very Hard</option>
            </select>
            <p>Selected Difficulty: {state.difficulty}/5</p>
            <button onClick={()=>addNewCourse()}>Create New Course</button>
            <button onClick={()=>sendStockPostRequest()}>Send stock data</button>
              {text}
        </div>
    )
}

export default CreateCourse;