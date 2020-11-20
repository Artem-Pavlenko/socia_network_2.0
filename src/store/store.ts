import {combineReducers, createStore} from "redux";
import MessageReducer from "./MessageReducer";
import PostReducer from "./PostReducer";
import UsersReducers from "./UsersReducer";


const reducers = combineReducers({
    message: MessageReducer,
    post: PostReducer,
    users: UsersReducers
})


export const store = createStore(reducers)

export type StateType = ReturnType<typeof reducers>


// @ts-ignore
window.store = store