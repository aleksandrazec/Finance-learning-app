import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import NodeCard from '../NodeCard' 
import api from '../../services/api';

function CoursePage(props) {
    const { id } = useParams();
    const [info, setInfo] = useState({
        id: id,
        title: '',
        advisor_id: '',
        difficulty: '',
        description: '',
        structure_file: ''
    })

    const [structure, setStructure] = useState('')
    const [structureNodes, setStructureNodes] = useState([])

    // Function to map structure data to NodeCard components
    const mapStructureToNodes = (structureData) => {
        if (!structureData || !structureData.structure_content) return [];
        
        const content = structureData.structure_content;
        
        // Split by newlines and filter out empty lines
        // Using \r\n to handle Windows line endings
        const rows = content.split('\r\n').filter(row => row.trim() !== '');
        
        return rows.map((row, index) => {
            const [type, nodeId] = row.split(',').map(item => item.trim());
            
            return (
                <NodeCard
                    key={`${type}-${nodeId}-${index}`}
                    type={type}
                    id={nodeId}
                    courseId={id}
                    position={index + 1}
                />
            );
        });
    }

    useEffect(() => {
        const getInfo = () => {
            try {
                api.get(`/course/${id}`)
                    .then(result => {
                        console.log('Course info:', result.data)
                        setInfo(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        getInfo()
    }, [])

    useEffect(() => {
        const getStructure = () => {
            try {
                api.get(`/course/structure/${id}`)
                    .then(result => {
                        console.log('Structure response:', result.data)
                        setStructure(result.data)
                        
                        // Map structure to nodes whenever structure data is updated
                        const nodes = mapStructureToNodes(result.data);
                        setStructureNodes(nodes);
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        getStructure()
    }, [info])

    return (
        <div>
            <h1>{info.title}</h1>
            <p>{info.description}</p>
            <div className="course-structure">
                <h2>Course Structure</h2>
                <div className="nodes-container">
                    {structureNodes}
                </div>
            </div>
        </div>
    )
}

export default CoursePage