import TabItem from './TabItem';
import { UserContext } from '../../UserContext'
import { useState, useContext, useEffect } from 'react'
import './styles.css'

function TabContainer({ children }) {
    const { userInfo, setUserInfo } = useContext(UserContext)
    

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

    const [ tabList, setTabList ] = useState([login])
    
    const updateTabList = () => {
        if (userInfo.role === 0) {
            //make urls correct
            setTabList([ courses, profile, forums])
        } else if (userInfo.role === 1) {
            setTabList([ courses, profile, forums, create_course ])
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


<<<<<<< HEAD



=======
>>>>>>> e1195b97809ca45a03caf7a0015da2ac320be951
export default TabContainer;