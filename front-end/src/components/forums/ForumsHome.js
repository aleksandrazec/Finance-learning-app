import { useState, useEffect } from 'react'
import ForumCard from './ForumCard'
import api from '../../services/api'
import { useNavigate } from 'react-router'
import './ForumsHome.css' // Import the CSS

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
        <div className="forums-container">
            <div className="forums-header">
                <h1>Forums</h1>
                <button className="create-forum-btn" onClick={()=>goToCreate()}>
                    Create Forum
                </button>
            </div>
            <div className="forums-list">
                {
                    forums ?
                    forums.map(forum=>
                    <ForumCard prompt={forum.prompt} date={forum.date} title={forum.title} id={forum.id} key={forum.id} user_id={forum.user_id}/>)
                    :
                    <div className="loading-state">Loading forums...</div>
                }
            </div>
        </div>
    )
}

export default ForumsHome