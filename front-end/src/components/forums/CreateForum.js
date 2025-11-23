import { useNavigate } from 'react-router';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext'
import api from '../../services/api';

function CreateForum(props) {
    const {userInfo} = useContext(UserContext)
    const navigate=useNavigate()
    const [prompt, setPrompt] = useState('')
    const [text, setText] = useState('')
    const createForum = () => {
        try {
            api.post(`/forums/create`, { prompt: prompt, user_id: userInfo.user_id})
                .then(result => {
                    setText('Created forum with following prompt: '+prompt)
                    setPrompt('')
                })
                .catch(err => console.error(err))
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        if(userInfo.role==='-1'){
            navigate(`/`)
        }
    },[navigate, userInfo])

    return (
        <div>
            <h3>Create Forum</h3>
            <p>Type in prompt</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: input } }) => setPrompt(input)} value={prompt} /><br />
            <button className="buttons-list" onClick={()=>createForum()}>Post</button><br/>
            {text}
        </div>
    )
}

export default CreateForum