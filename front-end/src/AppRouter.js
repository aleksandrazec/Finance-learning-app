import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Game from './components/game-page/Game';
import GameMain from './components/game-page/GameMain';
import Home from './components/Home';
import Profile from "./components/Profile";
import Form from "./components/Form";
import OptionList from './components/game-page/OptionList';
import App from './App';
import CreateCourse from './components/advisor-view/CreateCourse';
import Test from './components/test_component/test';
import ViewCourses from './components/advisor-view/ViewCourses';
import CoursePage from './components/advisor-view/CoursePage';
import ForumsHome from './components/forums/ForumsHome';
import CreateForum from './components/forums/CreateForum';
import ForumPage from './components/forums/ForumPage';

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <Routes>

                    <Route path="/" element={<App />}>
                        <Route index={true} element={<Form />} />
                        <Route path="/home" index={true} element={<Home />} />
                        
                        <Route path="/profile" element={<Profile />} />

                         <Route path="game/:id" element={<Game />}>
                            <Route index={true} element={<GameMain />} />
                            <Route path="trade" element={<OptionList />} />
                        </Route>

                        <Route path="/createcourse" element={<CreateCourse/>}/>
                        <Route path="/test" element={<Test/>}/>
                        <Route path="/viewcourses" element={<ViewCourses/>}/>
                        <Route path="/viewcourses/:id" element={<CoursePage/>}/>

                        <Route path="/forum" element={<ForumsHome/>}/>
                        <Route path="/forum/:id" element={<ForumPage/>}/>
                        <Route path="/createforum" element={<CreateForum/>}/>

                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;