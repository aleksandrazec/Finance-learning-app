import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
import GameMainPage from './components/game-page/GameMainPage';
import Home from './components/Home';
import OptionList from './components/game-page/OptionList';

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <Routes>
                        <Route index={true} element={<Home/>}/>
                        <Route path="gamemain" element={<GameMainPage />} />
                        <Route path="gamemain/:id" element={<OptionList />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;