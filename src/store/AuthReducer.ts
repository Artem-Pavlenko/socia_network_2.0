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

type ActionTypes = ReturnType<typeof setAuthUserData> | ReturnType<typeof setLoginLogout>

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
                return {...state, data: {id: 1, email:'', login:''}, isAuth: action.isAuth}
            } else {
                return {...state, isAuth: action.isAuth}
            }
        default:
            return state
    }
}

export const setAuthUserData = (data: AuthData) => ({type: 'auth/SET_AUTH_ME', data} as const)
export const setLoginLogout = (isAuth: boolean) => ({type: 'auth/SET_LOGIN/LOGOUT', isAuth} as const)


export default AuthReducer