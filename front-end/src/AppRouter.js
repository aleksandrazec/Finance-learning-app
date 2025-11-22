import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import GameMainPage from './components/game-page/GameMainPage';
import Home from './components/Home';
import Profile from "./components/Profile";
import OptionList from './components/game-page/OptionList';

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <Routes>
                        <Route path="/" index={true} element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="gamemain" element={<GameMainPage/>} />
                        <Route path="gamemain/:id" element={<OptionList/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;