import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Settings from "./components/Setting/Settings";
import DialogsPage from "./components/Dialogs/Dialogs";
import NotFound from "./components/404/NotFound";
import FriendsPage from "./components/Friends/FriendsPage";
import UsersPage from "./components/Users/UsersPage";
import ProfilePage from "./components/Profile/ProfilePage";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {useSelector} from "react-redux";
import {StateType} from "./store/store";


const App = () => {

    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)
    const redirectTo = isAuth ? '/profile' : '/login'

    return (
        <div className="App">
            <HeaderContainer/>
            <NavBar/>
            <div className="content-wrapper">
                <Switch>
                    <Route path={"/profile/:userID?"} render={() => <ProfilePage/>}/>
                    <Route path={"/friends"} render={() => <FriendsPage/>}/>
                    <Route path={"/users"} render={() => <UsersPage/>}/>
                    <Route path={"/messages"} render={() => <DialogsPage/>}/>
                    <Route path={"/settings"} render={() => <Settings/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                    <Route exact path={'/'}><Redirect to={redirectTo}/></Route>
                    {/*<Redirect from={"/"} to={"profile"}/>*/}
                    <Route render={() => <NotFound/>}/>
                </Switch>
            </div>
        </div>
    )
}

export default App;
