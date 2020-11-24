import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Settings from "./components/Setting/Settings";
import DialogsPage from "./components/Dialogs/Dialogs";
import NotFound from "./components/404/NotFound";
import FriendsPage from "./components/Friends/FriendsPage";
import UsersPage from "./components/Users/UsersPage";
import ProfilePage from "./components/Profile/ProfilePage";


const App = () => {

    return (
        <div className="App">
            <Header/>
            <NavBar/>
            <div className="content-wrapper">
                <Switch>
                    <Route path={"/profile/:userID?"} render={() => <ProfilePage/>}/>
                    <Route path={"/friends"} render={() => <FriendsPage/>}/>
                    <Route path={"/users"} render={() => <UsersPage/>}/>
                    <Route path={"/messages"} render={() => <DialogsPage/>}/>
                    <Route path={"/settings"} render={() => <Settings/>}/>
                    <Route exact path={'/'}><Redirect to={'/profile'}/></Route>
                    {/*<Redirect from={"/"} to={"profile"}/>*/}
                    <Route render={() => <NotFound/>}/>
                </Switch>
            </div>
        </div>
    )
}

export default App;
