import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/API";

type AuthData = {
    id: number | null
    login: string
    email: string
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
    | ReturnType<typeof setLoginLogout>
    | ReturnType<typeof setUserId>
    | ReturnType<typeof setError>
    | ReturnType<typeof setCaptcha>

const initState: AuthRootType = {
    data: {
        id: null,
        email: '',
        login: ''
    },
    messages: [],
    isAuth: false,
    authError: '',
    captcha: null
}

const AuthReducer = (state: AuthRootType = initState, action: ActionTypes): AuthRootType => {
    switch (action.type) {
        case "auth/SET_AUTH_ME":
            return {...state, data: {...action.data}, isAuth: true}
        case "auth/SET_LOGIN/LOGOUT":
            if (!action.isAuth) {
                return {...state, data: {id: null, email: '', login: ''}, isAuth: action.isAuth}
            } else {
                return {...state, isAuth: action.isAuth}
            }
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

export const setAuthUserData = (data: AuthData) => ({type: 'auth/SET_AUTH_ME', data} as const)
export const setLoginLogout = (isAuth: boolean) => ({type: 'auth/SET_LOGIN/LOGOUT', isAuth} as const)
export const setUserId = (id: number) => ({type: 'auth/SET_ID', id} as const)
export const setError = (error: string) => ({type: 'auth/SET_ERROR', error} as const)
export const setCaptcha = (url: string) => ({type: 'auth/SET_CAPTCHA', url} as const)


export const authMe = () => (dispatch: Dispatch) => {
    authAPI.authMe()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setAuthUserData(res.data))
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
                dispatch<any>(authMe())
            } else if (res.resultCode === 10) {
                res.messages.map(mess => dispatch(setError(mess)))
                securityAPI.getCaptcha()
                    .then(res => {
                        dispatch(setCaptcha(res.url))
                    })
            }
        })
}

export const updCaptchaUrl = () => (dispatch: Dispatch) => {
    securityAPI.getCaptcha()
        .then(res => {
            dispatch(setCaptcha(res.url))
        })
}


export default AuthReducer