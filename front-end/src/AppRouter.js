import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
import GameMainPage from './components/game-page/GameMainPage';
import OptionList from './components/game-page/OptionList';

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index={true} element={<HomePage/>}/>
                        <Route path="gamemain" element={<GameMainPage />} />
                        <Route path="gamemain/:id" element={<OptionList />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;