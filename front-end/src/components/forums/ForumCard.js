import { useNavigate } from 'react-router'

function ForumCard(props) {

    const navigate = useNavigate()

    const {
        prompt,
        username,
        date,
        id
    } = props

    const goToForum=async()=>{
        try {
            navigate(`/forum/${id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div>
                <h3 onClick={()=>goToForum()}>{prompt}</h3>
            </div>
            <p>Posted on {date} by {username}</p>
        </div>
    )

}

export default ForumCard