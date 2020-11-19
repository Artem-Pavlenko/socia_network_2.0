import {combineReducers, createStore} from "redux";
import MessageReducer from "./MessageReducer";
import PostReducer from "./PostReducer";


const reducers = combineReducers({
    message: MessageReducer,
    post: PostReducer
})


export const store = createStore(reducers)

export type StateType = ReturnType<typeof reducers>
