
type ActionsType = ReturnType<typeof setFetching>

type FetchingType = typeof initState
const initState = {
    isFetching: true
}

const FetchingReducer = (state: FetchingType =  initState, action: ActionsType): FetchingType => {
    switch (action.type) {
        case "fetching/SET_FETCHING":
            return {...state, isFetching: action.isFetch}
        default:
            return state
    }
}

export default FetchingReducer

export const setFetching = (isFetch: boolean) => ({type: 'fetching/SET_FETCHING', isFetch} as const)