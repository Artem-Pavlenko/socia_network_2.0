import {Dispatch} from "redux";
import {authAPI} from "../api/API";
import {authMe} from "./AuthReducer";

type AppType = {
    initialized: boolean
}

type ActionTypes = ReturnType<typeof setInitialize>

const initState: AppType = {
    initialized: false
}

const AppReducer = (state: AppType = initState, action: ActionTypes): AppType => {
    switch (action.type) {
        case "app/SET_INITIALIZE_APP":
            return {...state, initialized: true}
        default:
            return state
    }
}

export const setInitialize = () => ({type: 'app/SET_INITIALIZE_APP'})

export const initializeApp = () => (dispatch: Dispatch) => {
    dispatch<any>(authMe()).then(() =>  dispatch(setInitialize()))
}

export default AppReducer