import {Dispatch} from "redux";
import {authAPI} from "../api/API";

type AuthData = {
    id: number
    login: string
    email: string
}
export type AuthRootType = {
    data: AuthData
    messages: string[]
    isAuth: boolean
}

type ActionTypes =
    ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setLoginLogout>
    | ReturnType<typeof setUserId>

const initState: AuthRootType = {
    data: {
        id: 1,
        email: '',
        login: ''
    },
    messages: [],
    isAuth: false
}

const AuthReducer = (state: AuthRootType = initState, action: ActionTypes): AuthRootType => {
    switch (action.type) {
        case "auth/SET_AUTH_ME":
            return {...state, data: {...action.data}, isAuth: true}
        case "auth/SET_LOGIN/LOGOUT":
            if (!action.isAuth) {
                return {...state, data: {id: 1, email: '', login: ''}, isAuth: action.isAuth}
            } else {
                return {...state, isAuth: action.isAuth}
            }
        case "auth/SET_ID":
            return {...state, data: {...state.data, id: action.id}}
        default:
            return state
    }
}

export const setAuthUserData = (data: AuthData) => ({type: 'auth/SET_AUTH_ME', data} as const)
export const setLoginLogout = (isAuth: boolean) => ({type: 'auth/SET_LOGIN/LOGOUT', isAuth} as const)
export const setUserId = (id: number) => ({type: 'auth/SET_ID', id} as const)

export const authMe = () => (dispatch: Dispatch) => {
    authAPI.authMe()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setAuthUserData(res.data))
                dispatch(setLoginLogout(true))
            }
        })
        .catch(e => {
            console.log('auth error :', e.message)
        })
}

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setLoginLogout(false))
            }
        })
}

export const login = (email: string, password: string, rememberMe: boolean, captcha?: string) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe, captcha)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setUserId(res.data.userId))
                dispatch(setLoginLogout(true))
            }
        })
}


export default AuthReducer