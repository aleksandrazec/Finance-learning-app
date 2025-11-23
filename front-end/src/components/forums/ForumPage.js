import { useParams, useNavigate } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../UserContext'
import api from '../../services/api';
import Comment from './Comment'
import './ForumPage.css' // Import the CSS

function ForumPage(props) {
    const { id } = useParams()
    const navigate = useNavigate()
    const {userInfo} = useContext(UserContext)

    const [info, setInfo] = useState({
        prompt: undefined,
        id: undefined,
        date: undefined,
        user_id: undefined,
        username: undefined
    })
    const [comments, setComments] = useState()
    const [commentToBe, setCommentToBe] = useState()
    const [text, setText] = useState('')

    useEffect(() => {
        const getInfo = () => {
            try {
                api.post(`/forums/find`, { id })
                    .then(result => {
                        setInfo(result.data[0])
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        const getComments = () => {
            try {
                api.post(`/forums/getcomments`, { id })
                    .then(result => {
                        setComments(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        getComments();
        getInfo();
    }, [id])

    const postComment = async () => {
        if (userInfo.role === 'Guest') {
            setText('Please log in to post comments')
        } else {
            try {
                api.post(`/forums/comment`, { text: commentToBe, user_id: userInfo.user_id, forum_id: id })
                    .then(result => {
                        setCommentToBe('')
                        window.location.reload(false);

                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="forum-page">
            {
                info ?
                    <div className="forum-header">
                        <div>
                            <h1>{info.prompt}</h1>
                        </div>
                        <h3 className="forum-meta">Posted on {info.date} by {info.username}</h3>
                    </div>
                    :
                    <></>
            }
            <div className="comment-section">
                <div className="comment-input-container">
                    <input className="comment-input" type="text" id="comment" name="comment" onChange={({ target: { value: input } }) => setCommentToBe(input)} value={commentToBe} placeholder="Write your comment..." />
                    <button className="reply-button" onClick={() => postComment()}>Comment</button>
                </div>
                <p className="error-message">{text}</p>
                {
                    comments && comments.length > 0 ?
                        <div>
                            <h1 className="comments-header">Comments:</h1>
                            <div className="comments-list">
                                {comments.map(com => <Comment id={com.id} forum_id={com.forum_id} text={com.text} key={com.id} date={com.date} username={com.username} user_id={com.user_id} />)}
                            </div>
                        </div>
                        :
                        <h1 className="no-comments">No comments yet.</h1>
                }
            </div>
        </div>
    )
}

export default ForumPage