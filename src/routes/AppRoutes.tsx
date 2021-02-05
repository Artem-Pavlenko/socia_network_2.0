import React, {Suspense} from 'react'
import MiniPreloader from "../common/common_component/Preloader/MiniPreloader/MiniPreloader"
import Experimental from "../components/Experimental/Experimental"
import ProfilePage from "../components/Profile/ProfilePage"
import FriendsPage from "../components/Friends/FriendsPage"
import {Redirect, Route, Switch} from "react-router-dom"
import DialogsPage from "../components/Dialogs/Dialogs"
import UsersPage from "../components/Users/UsersPage"
import {AuthRootType} from "../store/AuthReducer"
import Login from "../components/Login/Login"
import {useSelector} from "react-redux"
import {StateType} from "../store/store"

// Components that are loaded when needed (lazy-loading)
const NotFoundPage = React.lazy(() => import('../common/common_component/NotFoundPage/NotFoundPage'))
const ChatPage = React.lazy(() => import('../pages/ChatPage/ChatPage'))

const AppRoutes = () => {
    const {isAuth} = useSelector<StateType, AuthRootType>(state => state.auth)
    const redirectTo = isAuth ? '/profile' : '/login'

    return (
        <div>
            <Suspense fallback={<MiniPreloader/>}>
                <Switch>
                    <Route path={"/profile/:userID?"} render={() => <ProfilePage/>}/>
                    <Route path={"/friends"} render={() => <FriendsPage/>}/>
                    <Route path={"/users"} render={() => <UsersPage/>}/>
                    <Route path={"/messages"} render={() => <DialogsPage/>}/>
                    <Route path={"/experimental"} render={() => <Experimental/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                    <Route path={"/chat"} render={() => <ChatPage/>}/>
                    {/*при первой загрузке в useHistory() попадает '/socia_network_2.0'*/}
                    <Route exact path={'/socia_network_2.0'}><Redirect to={redirectTo}/></Route>
                    <Route exact path={'/'}><Redirect to={redirectTo}/></Route>
                    {/*<Redirect from={"/"} to={"profile"}/>*/}
                    <Route path={'*'} render={() => <NotFoundPage/>}/>
                </Switch>
            </Suspense>
        </div>
    )
}

export default AppRoutes