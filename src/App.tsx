import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Settings from "./components/Setting/Settings";
import ProfilePage from "./components/Profile/Profile";
import DialogsPage from "./components/Dialogs/Dialogs";
import UsersContainer from "./components/Users/UsersContainer";
import NotFound from "./components/404/NotFound";
import FriendsContainer from "./components/Friends/FriendsContainer";



const App = () => {


    return (
        <div className="App">
            <Header/>
            <NavBar/>
            <div className="content-wrapper">
                <Switch>
                    <Route path={"/profile"}
                           render={() => <ProfilePage/>}/>
                    <Route path={"/friends"} render={() => <FriendsContainer/>}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    <Route path={"/messages"}
                           render={() => <DialogsPage/>}/>
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
