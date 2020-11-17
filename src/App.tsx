import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import UsersContainer from "./components/Users/UsersContainer";
import Settings from "./components/Setting/Settings";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {StoreType} from "./index";

type AppType = {
    store: StoreType
}

const App = (props: AppType) => {

    return (
        <div className="App">
            <Header/>
            <NavBar/>
            <div className="content-wrapper">
                <Switch>
                    <Route path={"/profile"} render={() => <Profile posts={props.store.posts}/>}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    <Route path={"/messages"} render={() => <Dialogs users={props.store.users} mess={props.store.mess}/>}/>
                    <Route path={"/settings"} render={() => <Settings/>}/>
                    <Route exact path={'/'}><Redirect to={'/profile'}/></Route>
                    {/*<Redirect from={"/"} to={"profile"}/>*/}
                    <Route render={() => <div>404 not found</div>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
