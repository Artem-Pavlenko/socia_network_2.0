import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import UsersContainer from "./components/Users/UsersContainer";
import Settings from "./components/Setting/Settings";
import Messages from "./components/Dialogs/Messages";

const App = () => {

    return (
        <div className="App">
            <Header/>
            <NavBar/>
            <div className="content">
                <Switch>
                    <Route path={"/profile"} render={() => <Main/>}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    <Route path={"/messages"} render={() => <Messages/>}/>
                    <Route path={"/settings"} render={() => <Settings/>}/>
                    <Route render={() => <div>404</div>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
