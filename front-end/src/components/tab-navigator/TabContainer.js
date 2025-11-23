import TabItem from './TabItem';
import { UserContext } from '../../UserContext'
import { useState, useContext } from 'react'
import './styles.css'

function TabContainer({ children }) {
    const user = useContext(UserContext)
    

    const [ login, courses, profile, forums, create_course ] = [
                {
                    text: 'Login - todo url',
                    url: '/',
                },
                {
                    text: 'Courses',
                    url: '/',
                },
                {
                    text: 'Profile',
                    url: '/profile',
                },
                {
                    text: 'Forums',
                    url: 'forum',
                },
                {
                    text: 'Create a course',
                    url: '/createcourse',
                }
            ]

    const [ state, setState ] = useState({})
    
    const getTabs = () => {
        if (user.role === 0) {
            //make urls correct
            return [ courses, profile, forums]
        } else if (user.role === 1) {
            return [ courses, profile, forums, create_course ]
        } else {
             return [login]
        }
    }
    return (
        <div className='tab-navigator'>
            <div className='tab-container'>
                {
                    getTabs().map(({ text, url }) => <TabItem
                        key={text}
                        text={text}
                        url={url}
                    />)
                }
            </div>
            {children}
        </div>
    )
}


export default TabContainer;