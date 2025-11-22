import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Game from './components/game-page/Game';
import Home from './components/Home';
import Profile from "./components/Profile";
import Form from "./components/Form";
import OptionList from './components/game-page/OptionList';

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <Routes>
                        {/*The register home page should be the default*/}
                        <Route path='/' element = {<Form/>}/>
                        {/*Changed path here*/}
                        <Route path="/home" index={true} element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/gamemain" element={<Game />}>
                        {/*Changed the path here*/}
                        <Route path=":id" element={<OptionList />} />
                        </Route>

                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;