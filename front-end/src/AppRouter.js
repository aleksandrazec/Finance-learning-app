import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
<<<<<<< HEAD
<<<<<<< HEAD
import App from './App';
import GameMainPage from './components/game-page/GameMainPage';
=======
import Game from './components/game-page/Game';
>>>>>>> fc61576d104a00ef0e28d7ff773134d46b884fd7
import Home from './components/Home';
=======
import GameMainPage from './components/game-page/GameMainPage';
import Home from './components/Home';
import Profile from "./components/Profile";
>>>>>>> kacka
import OptionList from './components/game-page/OptionList';

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <Routes>
<<<<<<< HEAD
                        <Route index={true} element={<Home/>}/>
                        <Route path="gamemain" element={<Game />}>
                            <Route path="/:id" element={<OptionList />} />
                        </Route>
=======
                        <Route path="/" index={true} element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="gamemain" element={<GameMainPage/>} />
                        <Route path="gamemain/:id" element={<OptionList/>} />
>>>>>>> kacka
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;