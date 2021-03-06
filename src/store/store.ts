import {applyMiddleware, combineReducers, createStore} from "redux";
import MessageReducer from "./MessageReducer";
import PostReducer from "./PostReducer";
import UsersReducers from "./UsersReducer";
import FriendsReducer from "./FriendsReducer";
import ProfileReducer from "./ProfileReducer";
import AuthReducer from "./AuthReducer";
import thunkMiddleware from "redux-thunk"
import AppReducer from "./appReducer";
import ErrorReducer from "./ErrorReducer";
import {chatReducer} from "./chatReducer";

const reducers = combineReducers({
    message: MessageReducer,
    post: PostReducer,
    users: UsersReducers,
    friends: FriendsReducer,
    profile: ProfileReducer,
    auth: AuthReducer,
    app: AppReducer,
    error: ErrorReducer,
    chat: chatReducer
})


export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type StateType = ReturnType<typeof reducers>


// @ts-ignore
window.store = store