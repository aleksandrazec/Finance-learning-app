import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import api from '../../services/api';

function Lecture(props) {
    const { id } = useParams();
    const [info, setInfo] = useState({
        id: id,
        title: '',
        text_file: '',
        course_id: ''
    })

    useEffect(() => {
        const getInfo = () => {
            try {
                api.get(`/lecture/${id}`)
                    .then(result => {
                        console.log('Lecture info:', result.data)
                        setInfo(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        getInfo()
    }, [id])

    // Function to render lecture content from text_file
    const renderLectureContent = (content) => {
        if (!content) return <p>Loading lecture content...</p>;
        
        // Split by newlines and create paragraphs
        return content.split('\n').map((paragraph, index) => (
            paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
        ));
    }

    return (
        <div className="lecture-page">
            <h1>{info.title}</h1>
            <div className="lecture-content">
                <h2>Lecture Content</h2>
                <div className="content-text">
                    {renderLectureContent(info.text_file)}
                </div>
            </div>
            {info.course_id && (
                <div className="course-reference">
                    <p>Part of course: {info.course_id}</p>
                </div>
            )}
        </div>
    )
}

export default Lecture