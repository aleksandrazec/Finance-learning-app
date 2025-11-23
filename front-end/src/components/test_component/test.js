
import api from '../../services/api.js'
import { useState } from 'react'

export default function test(props){

    const [state, setState ] = useState({
        text : ''
    })

    const changeText = (event) => {
        setState(prevState => ({...prevState, text: event.target.value}))
    }

    const sendPostRequests = async () => {
        const lines = state.text.split("\n")
        let sequence, req_body;
        for(i=0; i<lines.length; i++){
            try{
                sequence = lines[i].split(",")
                req_body = {
                    date : sequence[0],
                    close : sequence[1],
                    volume : sequence[2],
                    company : sequence[3],
                }
                await api.post('/stock', req_body)
            }catch(err){
                console.log(`Error while sending line ${i}`)
            }
        }
    }

    return (
        <div>
            <input type='text' onChange={changeText}></input>
            <button onClick={sendPostRequests}>Send post requests</button>
        </div>
    )
}