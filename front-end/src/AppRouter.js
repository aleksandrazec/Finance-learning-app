import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Game from './components/game-page/Game';
import Home from './components/Home';
import OptionList from './components/game-page/OptionList';

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <Routes>
                        <Route index={true} element={<Home/>}/>
                        <Route path="gamemain" element={<Game />}>
                            <Route path="/:id" element={<OptionList />} />
                        </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;