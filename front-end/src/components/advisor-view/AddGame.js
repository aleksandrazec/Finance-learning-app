import { useState } from "react"
import api from "../../services/api"

function AddGame(props){
    const {
        id
    } = props
    const [text, setText] = useState('')

    const [state, setState] = useState({
        start_money: '',
        course_id: id,
        start_date: '',
        living_cost: ''
    })

    const addNewGame = async() => {
        try{
            await api.post('/game/', {...state})
            setText('Created Game.')
            setState(prev => ({ 
                ...prev, 
                start_money: '', 
                start_date: '', 
                living_cost: '' 
            }));
        } catch(error) {
            console.error(error)
        }
    }
    
    return (
        <div>
            <p>Start Money:</p>
            <input 
                type="number" 
                id="start_money" 
                name="start_money" 
                onChange={({ target: { value } }) => setState(prevState => ({ 
                    ...prevState, 
                    start_money: value 
                }))} 
                value={state.start_money} 
            /><br />
            
            <p>Living Cost:</p>
            <input 
                type="number" 
                id="living_cost" 
                name="living_cost" 
                onChange={({ target: { value } }) => setState(prevState => ({ 
                    ...prevState, 
                    living_cost: value 
                }))} 
                value={state.living_cost} 
            /><br />
            
            <p>Start Date:</p>
            <input 
                type="date" 
                id="start_date" 
                name="start_date" 
                onChange={({ target: { value } }) => setState(prevState => ({ 
                    ...prevState, 
                    start_date: value 
                }))} 
                value={state.start_date} 
            /><br />
            <br />

            <button onClick={() => addNewGame()}>Create New Game</button>
            <br/>
            {text}
        </div>
    )
}

export default AddGame