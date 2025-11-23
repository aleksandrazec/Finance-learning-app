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
                            <Route path=":id" element={<OptionList />} />
                        </Route>

                        <Route path="/createcourse" element={<CreateCourse/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;