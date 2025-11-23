import { useState, useEffect } from 'react'
import ForumCard from './ForumCard'
import api from '../../services/api'
import { useNavigate } from 'react-router'

function ForumsHome(props) {
    const [forums, setForums] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const getForums = () => {
            try {
                api.post(`/forums/listall`, {order:'DSC'})
                    .then(result => {
                        console.log(result.data)
                        setForums(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        
        getForums();
    }, [])
    const goToCreate = async () => {
        try {
            navigate(`/createforum`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Forums</h1>
            <button onClick={()=>goToCreate()}>Create Forum</button>
            {
                forums ?
                forums.map(forum=>
                <ForumCard prompt={forum.prompt} date={forum.date} title={forum.title} id={forum.id} key={forum.id} user_id={forum.user_id}/>)
                :
                <></>
            }
        </div>
    )
}

export default ForumsHome