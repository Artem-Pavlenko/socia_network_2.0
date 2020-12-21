import {Dispatch} from "redux";
import {authAPI, Result, securityAPI} from "../api/API";
import {setError} from "./ErrorReducer";

type AuthData = {
    id: number | null
    login: string | null
    email: string | null
}
export type AuthRootType = {
    data: AuthData
    messages: string[]
    isAuth: boolean
    authError: string
    captcha: string | null
}

type ActionTypes =
    ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setUserId>
    | ReturnType<typeof setAuthError>
    | ReturnType<typeof setCaptcha>

const initState: AuthRootType = {
    data: {
        id: null,
        email: null,
        login: null
    },
    messages: [],
    isAuth: false,
    authError: '',
    captcha: null
}

const AuthReducer = (state: AuthRootType = initState, action: ActionTypes): AuthRootType => {
    switch (action.type) {
        case "auth/SET_AUTH_ME":
            return {...state, data: {...action.data}, isAuth: action.isAuth}
        case "auth/SET_ID":
            return {...state, data: {...state.data, id: action.id}}
        case "auth/SET_ERROR":
            return {...state, authError: action.error}
        case "auth/SET_CAPTCHA":
            return {...state, captcha: action.url}
        default:
            return state
    }
}

export const setAuthUserData = (data: AuthData, isAuth: boolean) => ({type: 'auth/SET_AUTH_ME', data, isAuth} as const)
export const setUserId = (id: number) => ({type: 'auth/SET_ID', id} as const)
export const setAuthError = (error: string) => ({type: 'auth/SET_ERROR', error} as const)
export const setCaptcha = (url: string) => ({type: 'auth/SET_CAPTCHA', url} as const)


export const authMe = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.authMe()
        if (res.resultCode === Result.Success) {
            dispatch(setAuthUserData(res.data, true))
        }
    } catch (e) {
        dispatch(setError(e.message))
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.logout()
        if (res.resultCode === Result.Success) {
            dispatch(setAuthUserData({id: null, login: null, email: null}, false))
        }
    } catch (e) {
        dispatch(setError(e.message))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha?: string) => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.login(email, password, rememberMe, captcha)
        if (res.resultCode === Result.Success) {
            dispatch(setUserId(res.data.userId))
            dispatch<any>(authMe())
        } else if (res.resultCode === Result.CaptchaIsRequired) {
            res.messages.map(mess => dispatch(setAuthError(mess)))
            const captcha = await securityAPI.getCaptcha()
            dispatch(setCaptcha(captcha.url))
        } else if (res.resultCode !== Result.Success) {
            res.messages.map(mess => dispatch(setAuthError(mess)))
        }
    } catch (e) {
        dispatch(setError(e.message))
    }
}

export const updCaptchaUrl = () => async (dispatch: Dispatch) => {
    const res = await securityAPI.getCaptcha()
    dispatch(setCaptcha(res.url))
}


export default AuthReducer