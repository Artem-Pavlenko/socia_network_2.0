import {Dispatch} from "redux";
import {usersAPI} from "../api/API";

type ActionsType =
    ReturnType<typeof followUnfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof setUsersCurrentPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setUsersFetching>
    | ReturnType<typeof setLeavingUsersPage>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setUsersLoadingPage>

export type UserType = {
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
export type UsersRootType = {
    error: null | string
    items: Array<UserType>
    totalCount: number
    currentPage: number
    pageSize: number
    isFetching: boolean
    toggleFollowingProgress: {
        ID: Array<number>
        inProgress: boolean
    }
    isLoadingPage: boolean
}

const initState: UsersRootType = {
    error: null,
    items: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 5,
    isFetching: true,
    toggleFollowingProgress: {
        ID: [],
        inProgress: false

    },
    isLoadingPage: true
}

const UsersReducers = (state: UsersRootType = initState, action: ActionsType): UsersRootType => {
    switch (action.type) {
        case "users/FOLLOW_UNFOLLOW":
            return {
                ...state,
                items: state.items.map(u => u.id === action.userID ? {...u, followed: action.following} : u)
            }
        case "users/SET_USERS":
            return {...state, items: action.users}
        case "users/SET_TOTAL_COUNT":
            return {...state, totalCount: action.totalCount}
        case "users/SET_CURRENT_PAGE":
            return {...state, currentPage: action.page}
        case "users/SET_PAGE_COUNT":
            return {...state, pageSize: action.pageSize}
        case "users/SET_FETCHING":
            return {...state, isFetching: action.isFetch}
        case "users/SET_LEAVING_USER_PAGE":
            return {...state, isFetching: true, currentPage: 1}
        case "users/FOLLOWING_PROGRESS":
            return {
                ...state, toggleFollowingProgress: {
                    ...state.toggleFollowingProgress,
                    inProgress: action.progress,
                    ID: action.progress
                        ? [...state.toggleFollowingProgress.ID, action.ID]
                        : state.toggleFollowingProgress.ID.filter(id => id !== action.ID)
                }
            }
        case "users/SET_FETCH":
            return {...state, isLoadingPage: action.isLoadingPage}
        default:
            return state
    }
}

export const followUnfollow = (userID: number, following: boolean) => ({
    type: 'users/FOLLOW_UNFOLLOW',
    userID,
    following
} as const)
export const setUsers = (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const)
export const setUsersTotalCount = (totalCount: number) => ({type: 'users/SET_TOTAL_COUNT', totalCount} as const)
export const setUsersCurrentPage = (page: number) => ({type: 'users/SET_CURRENT_PAGE', page} as const)
export const setPageCount = (pageSize: number) => ({type: 'users/SET_PAGE_COUNT', pageSize} as const)
export const setUsersFetching = (isFetch: boolean) => ({type: 'users/SET_FETCHING', isFetch} as const)
export const setLeavingUsersPage = () => ({type: 'users/SET_LEAVING_USER_PAGE'} as const)
export const toggleFollowingProgress = (progress: boolean, ID: number) => ({
    type: 'users/FOLLOWING_PROGRESS',
    progress,
    ID
} as const)
export const setUsersLoadingPage = (isLoadingPage: boolean) => ({type: 'users/SET_FETCH', isLoadingPage} as const)


export const getUsersThunk = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    usersAPI.getUsers(currentPage, pageSize)
        .then(res => {
            dispatch(setUsers(res.items))
            dispatch(setUsersTotalCount(res.totalCount))
            dispatch(setUsersFetching(false))
            dispatch(setUsersLoadingPage(false))
        })
}


export default UsersReducers