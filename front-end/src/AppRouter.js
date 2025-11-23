import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Game from './components/game-page/Game';
import Home from './components/Home';
import Profile from "./components/Profile";
import Form from "./components/Form";
import OptionList from './components/game-page/OptionList';
import App from './App';

//FOR SOME REASON THIS WORKS
class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    {/* Remove the nested structure for Form and Home */}
                    <Route path="/" element={<App />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/gamemain" element={<Game />}>
                    <Route path="id" element={<OptionList />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;