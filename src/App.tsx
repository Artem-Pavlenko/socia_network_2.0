import React, {Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Settings from "./components/Setting/Settings";
import DialogsPage from "./components/Dialogs/Dialogs";
import FriendsPage from "./components/Friends/FriendsPage";
import UsersPage from "./components/Users/UsersPage";
import ProfilePage from "./components/Profile/ProfilePage";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./store/store";
import MiniPreloader from "./common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {initializeApp} from "./store/appReducer";
import NekoPreloader from "./common/common_component/Preloader/NekoPreloader/NekoPreloader";

// Components that are loaded when needed (lazy-loading)
const NotFound = React.lazy(() => import('./components/404/NotFound'))

const App = () => {

    const initialized = useSelector<StateType, boolean>(state => state.app.initialized)
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const redirectTo = isAuth ? '/profile' : '/login'

    if (!initialized) return <NekoPreloader/>

    return (
        // <Zoom>
        <div className="App">
            <HeaderContainer/>
            <NavBar/>
            <div className="content-wrapper">
                <Suspense fallback={<MiniPreloader/>}>
                    <Switch>
                        <Route path={"/profile/:userID?"} render={() => <ProfilePage/>}/>
                        <Route path={"/friends"} render={() => <FriendsPage/>}/>
                        <Route path={"/users"} render={() => <UsersPage/>}/>
                        <Route path={"/messages"} render={() => <DialogsPage/>}/>
                        <Route path={"/settings"} render={() => <Settings/>}/>
                        <Route path={"/login"} render={() => <Login/>}/>
                        <Route exact path={'/'}><Redirect to={redirectTo}/></Route>
                        {/*<Redirect from={"/"} to={"profile"}/>*/}
                        <Route path={'*'} render={() => <NotFound/>}/>
                    </Switch>
                </Suspense>
            </div>
        </div>
        // </Zoom>
    )
}

export default App;
