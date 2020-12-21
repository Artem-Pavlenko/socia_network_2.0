import {Dispatch} from "redux";
import {followingAPI, Result, usersAPI} from "../api/API";
import {setError} from "./ErrorReducer";

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
    mode: 'users'
    filter: {
        term: string
    }
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
    isLoadingPage: true,
    mode: 'users',
    filter: {
        term: ''
    }
}

const UsersReducers = (state: UsersRootType = initState, action: ActionsType): UsersRootType => {
    switch (action.type) {
        case "users/FOLLOW_UNFOLLOW":
            return {
                ...state,
                items: state.items.map(u => u.id === action.userID ? {...u, followed: action.following} : u)
            }
        case "users/SET_USERS":
            return {...state, items: action.users, totalCount: action.totalCount}
        case "users/SET_CURRENT_PAGE":
            return {...state, currentPage: action.page}
        case "users/SET_PAGE_COUNT":
            return {...state, pageSize: action.pageSize}
        case "users/SET_FETCHING":
            return {...state, isFetching: action.isFetch}
        case "users/SET_LEAVING_USER_PAGE":
            return {...state, isFetching: true, currentPage: 1, filter: {term: ''}}
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
        case "users/FOLLOW":
            return {...state, items: state.items.map(u => u.id === action.ID ? {...u, followed: true} : u)}
        case "users/UNFOLLOW":
            return {...state, items: state.items.map(u => u.id === action.ID ? {...u, followed: false} : u)}
        case "users/SET_FILTER":
            return {...state, filter: {...state.filter, term: action.term}}
        default:
            return state
    }
}

export const followUnfollow = (userID: number, following: boolean) => ({
    type: 'users/FOLLOW_UNFOLLOW',
    userID,
    following
} as const)
export const setUsers = (users: Array<UserType>, totalCount: number) => ({
    type: 'users/SET_USERS',
    users,
    totalCount
} as const)
export const setCurrentPage = (page: number) => ({type: 'users/SET_CURRENT_PAGE', page} as const)
// setPageCount не использую пока нигде
export const setPageCount = (pageSize: number) => ({type: 'users/SET_PAGE_COUNT', pageSize} as const)
export const setUsersFetching = (isFetch: boolean) => ({type: 'users/SET_FETCHING', isFetch} as const)
export const setUsersLoadingPage = (isLoadingPage: boolean) => ({type: 'users/SET_FETCH', isLoadingPage} as const)
export const setLeavingUsersPage = () => ({type: 'users/SET_LEAVING_USER_PAGE'} as const)
export const toggleFollowingProgress = (progress: boolean, ID: number) => ({
    type: 'users/FOLLOWING_PROGRESS',
    progress,
    ID
} as const)
export const followUser = (ID: number) => ({type: 'users/FOLLOW', ID} as const)
export const unfollowUser = (ID: number) => ({type: 'users/UNFOLLOW', ID} as const)
export const setFilter = (term: string) => ({type: 'users/SET_FILTER', term} as const)


export const requestUsers = (currentPage: number, pageSize: number, term: string) => async (dispatch: Dispatch) => {
    dispatch(setUsersLoadingPage(true))
    dispatch(setFilter(term))
    dispatch(setCurrentPage(currentPage))
    try {
        const res = await usersAPI.getUsers(currentPage, pageSize, term)
        dispatch(setUsers(res.items, res.totalCount))
        dispatch(setUsersFetching(false))
        dispatch(setUsersLoadingPage(false))
    } catch (e) {
        dispatch(setError(e.message))
    }
}


export const usersFollow = (ID: number) => async (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(true, ID))
    try {
        const res = await followingAPI.follow(ID)
        if (res.resultCode === Result.Success) {
            dispatch(followUser(ID))
            dispatch(toggleFollowingProgress(false, ID))
        } else if (res.resultCode !== Result.Success) {
            res.messages.forEach(e => dispatch(setError(e)))
        }
    } catch (e) {
        dispatch(setError(e.message))
    }
}

export const usersUnfollow = (ID: number) => async (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(true, ID))
    try {
        const res = await followingAPI.unfollow(ID)
        if (res.resultCode === Result.Success) {
            dispatch(unfollowUser(ID))
            dispatch(toggleFollowingProgress(false, ID))
        } else if (res.resultCode !== Result.Success) {
            res.messages.forEach(e => dispatch(setError(e)))
        }
    } catch (e) {
        dispatch(setError(e.message))
    }
}

export default UsersReducers

type ActionsType =
    ReturnType<typeof followUnfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setUsersFetching>
    | ReturnType<typeof setLeavingUsersPage>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setUsersLoadingPage>
    | ReturnType<typeof followUser>
    | ReturnType<typeof unfollowUser>
    | ReturnType<typeof setFilter>