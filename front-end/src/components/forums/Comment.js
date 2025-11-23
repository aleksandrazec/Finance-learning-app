import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../UserContext'
import api from '../../services/api'

function Comment(props) {
    const {
        id,
        text,
        date,
        username,
        forum_id
    } = props
    const {userInfo} = useContext(UserContext)
    const [replies, setReplies] = useState()
    const [replyToBe, setReplyToBe] = useState()
    const [textt, setTextt] = useState('')
    useEffect(() => {
        const getReplies = () => {
            try {
                api.post(`/forums/getreplies`, { id: id })
                    .then(result => {
                        console.log(result.data)
                        setReplies(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }

        getReplies();
    }, [id])

    const postReply = async () => {
        if (userInfo.role === '-1') {
            setTextt('Please log in to post comments')
        } else
            try {
                api.post(`/forums/reply`, { text: replyToBe, user_id: userInfo.user_id, forum_id: forum_id, reply_id: id })
                    .then(result => {
                        setReplyToBe('')
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
    }


    return (
        <div>
            <div>
                <h3>{text}</h3>
                <p>Posted on {date} by {username}</p>
                <input  className='comment' type="text" id="reply" name="reply" onChange={({ target: { value: input } }) => setReplyToBe(input)} value={replyToBe} />
                <button className='reply-button' onClick={() => postReply()}>Reply</button>
                <p>{textt}</p>
            </div>
            <div id='replies'  style={{marginLeft: '2%'}}>
                {
                    replies ?
                        replies.map(com => <div className='reply'><Comment id={com.id} forum_id={com.forum_id} text={com.text} key={com.id} date={com.date} username={com.username} user_id={com.user_id} /></div>)
                        :
                        <></>
                }
            </div>
        </div>
    )
}
export default Comment