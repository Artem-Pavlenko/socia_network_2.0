
type ErrorRootType = {
    error: string[]
}

const initialState: ErrorRootType = {
    error: []
}

const ErrorReducer = (state = initialState, action: ActionsType): ErrorRootType => {
    switch (action.type) {
        case "error/SET_ERROR":
            return {...state, error: [...state.error, action.error]}
        case "error/CLEAR_ERRORS":
            return {...state, error: []}
        default:
            return state
    }
}

export const setError = (error: string) => ({type: 'error/SET_ERROR', error} as const)
export const clearErrors = () => ({type: 'error/CLEAR_ERRORS'} as const)

export default ErrorReducer

type ActionsType = ReturnType<typeof setError> | ReturnType<typeof clearErrors>