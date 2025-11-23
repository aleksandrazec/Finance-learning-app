import TabItem from './TabItem';
import { UserContext } from '../../UserContext'
import { useState, useContext, useEffect } from 'react'
import './styles.css'

function TabContainer({ children }) {
    const { userInfo, setUserInfo } = useContext(UserContext)
    

    const [ login, courses, profile, forums, create_course, view_courses ] = [
                {
                    text: 'Login',
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
                },
                {
                    text: 'View courses',
                    url: '/viewcourses',
                }
            ]

    const [ tabList, setTabList ] = useState([login])
    
    const updateTabList = () => {
        if (userInfo.role === 0) {
            //make urls correct
            setTabList([ courses, forums, profile])
        } else if (userInfo.role === 1) {
            setTabList([ courses, forums, create_course, view_courses, profile])
        } else {
            setTabList([login])
        }
    }

    useEffect(() => {
        updateTabList()
    }, [userInfo])
    return (
        <div className='tab-navigator'>
            <div className='tab-container'>
                {
                    tabList.map(({ text, url }) => <TabItem
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