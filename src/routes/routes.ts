import {ComponentType} from "react";
import ProfilePage from "../components/Profile/ProfilePage";
import FriendsPage from "../components/Friends/FriendsPage";
import UsersPage from "../components/Users/UsersPage";
import DialogsPage from "../components/Dialogs/Dialogs";
import Experimental from "../components/Experimental/Experimental";
import Login from "../components/Login/Login";
import ChatPage from "../pages/ChatPage/ChatPage";
import NotFoundPage from "../common/common_component/NotFoundPage/NotFoundPage";


type Routes = {
    path: string
    Component?: ComponentType
}

export const componentRoutes: Array<Routes> = [
    {
        path: '/profile/:userID?',
        Component: ProfilePage
    },
    {
        path: '/friends',
        Component: FriendsPage
    },
    {
        path: '/users',
        Component: UsersPage
    },
    {
        path: '/messages',
        Component: DialogsPage
    },
    {
        path: '/experimental',
        Component: Experimental
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/chat',
        Component: ChatPage
    },
    {
        path: '*',
        Component: NotFoundPage
    },
    {
        path: '/socia_network_2.0'
    },
    {
        path: '/'
    }
]