import {Dispatch} from "redux";
import {authMe} from "./AuthReducer";
import {setError} from "./ErrorReducer";

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

export const initializeApp = () => async (dispatch: Dispatch) => {
    try {
        await dispatch<any>(authMe())
        dispatch(setInitialize())
    } catch (e) {
        dispatch(setError(e.message))
    }
}

export default AppReducer