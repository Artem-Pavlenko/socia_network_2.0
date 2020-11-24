import {combineReducers, createStore} from "redux";
import MessageReducer from "./MessageReducer";
import PostReducer from "./PostReducer";
import UsersReducers from "./UsersReducer";
import FriendsReducer from "./FriendsReducer";
import ProfileReducer from "./ProfileReducer";


const reducers = combineReducers({
    message: MessageReducer,
    post: PostReducer,
    users: UsersReducers,
    friends: FriendsReducer,
    profile: ProfileReducer
})


export const store = createStore(reducers)

export type StateType = ReturnType<typeof reducers>


// @ts-ignore
window.store = store