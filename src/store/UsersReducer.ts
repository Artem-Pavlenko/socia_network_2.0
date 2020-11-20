import {v1} from "uuid";

export type UsersType = typeof initState.users[0]
export type UsersReducerType = typeof initState
type ActionsType = ReturnType<typeof follow> | ReturnType<typeof unfollow> | ReturnType<typeof followUnfollow>
    | ReturnType<typeof setUsers>

const initState = {
    users: [
        {id: v1(), followed: true, fullName: "Artem", status: "ok", location: {city: "Kiev", country: "Ukraine"}},
        {id: v1(), followed: false, fullName: "Alina", status: "ok", location: {city: "Kiev", country: "Ukraine"}},
        {id: v1(), followed: true, fullName: "Kiril", status: "ok", location: {city: "Kiev", country: "Ukraine"}}
    ]
}

const UsersReducers = (state:UsersReducerType = initState, action: ActionsType): UsersReducerType => {
    switch (action.type) {
        case "users/FOLLOW":
            return {...state, users: state.users.map( u => u.id === action.userID ? {...u,followed: true} : u)}
        case "users/UNFOLLOW":
            return {...state, users: state.users.map( u => u.id === action.userID ? {...u, followed: false} : u)}
        case "users/FOLLOW_UNFOLLOW":
            return {...state, users: state.users.map( u => u.id === action.userID ? {...u, followed: !u.followed} : u)}
        case "users/SET_USERS":
            return {...state, users: [...state.users, action.users]}
        default:
            return state
    }
}

export const followUnfollow = (userID: string) => ({type: 'users/FOLLOW_UNFOLLOW', userID} as const)
export const follow = (userID: string) => ({type: 'users/FOLLOW', userID} as const)
export const unfollow = (userID: string) => ({type: 'users/UNFOLLOW', userID} as const)
export const setUsers = (users: any) => ({type: 'users/SET_USERS', users} as const)

export default UsersReducers