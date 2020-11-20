
export type UsersReducerType = typeof initState
type ActionsType = ReturnType<typeof followUnfollow> | ReturnType<typeof setUsers> | ReturnType<typeof setTotalCount>

export type UserType =  {
    followed: boolean
    id: number
    name: string
    photos: {
        small: string | null
        large: string | null
    }
    status: string | null
    uniqueUrlName: string | null
}
type UsersRootType = {
    error: null | string
    items: Array<UserType>
    totalCount: number
}

const initState: UsersRootType = {
    error: null,
    items: [
        {
            followed: false,
            id: 1,
            name: "",
            photos: {small: null, large: null},
            status: null,
            uniqueUrlName: null
        }
    ],
    totalCount: 1
}

const UsersReducers = (state: UsersRootType = initState, action: ActionsType): UsersReducerType => {
    switch (action.type) {
        case "users/FOLLOW_UNFOLLOW":
            return {...state, items: state.items.map(u => u.id === action.userID ? {...u, followed: !u.followed} : u)}
        case "users/SET_USERS":
            return {...state, items: action.users}
        case "users/SET_TOTAL_COUNT":
            return {...state, totalCount: action.totalCount}
        default:
            return state
    }
}

export const followUnfollow = (userID: number) => ({type: 'users/FOLLOW_UNFOLLOW', userID} as const)
export const setUsers = (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const)
export const setTotalCount = (totalCount: number) => ({type: 'users/SET_TOTAL_COUNT', totalCount} as const)

export default UsersReducers