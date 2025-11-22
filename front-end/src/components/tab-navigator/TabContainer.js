import TabItem from './TabItem';
import { UserContext } from '../../UserContext'
import { useContext } from 'react'
import './styles.css'

function TabContainer({ children }) {
    const user = useContext(UserContext)
    const getTabs = () => {
        if (user.role === 0) {
            //make urls correct
            return [
                {
                    text: 'Courses',
                    url: '/',
                },
                {
                    text: 'Profile',
                    url: '/facultiesgen',
                },
                {
                    text: 'Forums',
                    url: '/forumshome',
                }
            ]
        } else if (user.role === 1) {
            return [
                {
                    text: 'Courses',
                    url: '/',
                },
                {
                    text: 'Profile',
                    url: '/facultiesgen',
                },
                {
                    text: 'Forums',
                    url: '/forumshome',
                }
            ]
        } else {
             return [
                //make all urls lead to login
                {
                    text: 'Courses',
                    url: '/',
                },
                {
                    text: 'Profile',
                    url: '/facultiesgen',
                },
                {
                    text: 'Forums',
                    url: '/forumshome',
                }
            ]
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