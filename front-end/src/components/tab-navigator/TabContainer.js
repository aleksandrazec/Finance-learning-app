import TabItem from './TabItem';
import { UserContext } from '../../Context'
import { useContext } from 'react'
import './styles.css'

//Update this later on so it will fit properly with the dynamic code
let check = 0;

function TabContainer({ children }) {
    const user = useContext(UserContext)
    const getTabs = () => {        

        //Student role
        if (check === 0) {
            return [
                {
                    text: 'Courses',
                    url: '/home',
                },
                 {
                    text: 'Forums',
                    url: '/forumshome',
                },
                {
                    text: 'Profile',
                    url: '/profile',
                }

            ]
        } else if (user.role === 1) {
            return [
                            {
                    text: 'Courses',
                    url: '/home',
                },
                 {
                    text: 'Fornm',
                    url: '/forumshome',
                },
                {
                    text: 'Profile',
                    url: '/profile',
                }

            ]
        } else {
             return [
                //make all urls lead to login
                {
                    text: 'Courses',
                    url: '/form',
                },
                 {
                    text: 'Forums',
                    url: '/form',
                },
                {
                    text: 'Profile',
                    url: '/form',
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
                        className = "navbarcontent"
                    />)
                }
            </div>
            {children}
        </div>

    )
}

export default TabContainer;