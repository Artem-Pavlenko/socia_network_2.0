import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import UsersContainer from "./components/Users/UsersContainer";
import Settings from "./components/Setting/Settings";
import {ActionsType, StateType} from "./store/store";
import ProfilePage from "./components/Profile/Profile";
import DialogsPage from "./components/Dialogs/Dialogs";

type AppType = {
    store: StateType
    dispatch: (action: ActionsType) => void
}

const App = (props: AppType) => {

    return (
        <div className="App">
            <Header/>
            <NavBar/>
            <div className="content-wrapper">
                <Switch>
                    <Route path={"/profile"}
                           render={() => <ProfilePage dispatch={props.dispatch} posts={props.store.posts}/>}/>
                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                    <Route path={"/messages"}
                           render={() => <DialogsPage dispatch={props.dispatch} users={props.store.users}
                                                      mess={props.store.mess}/>}/>
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
