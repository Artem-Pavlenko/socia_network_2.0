import {UserType} from "./UsersReducer";
import {Dispatch} from "redux";
import {followingAPI, Result, usersAPI} from "../api/API";
import {setError} from "./ErrorReducer";

type ActionsType =
    ReturnType<typeof setFriends>
    | ReturnType<typeof setFriendCurrentPage>
    | ReturnType<typeof setFriendsFetching>
    | ReturnType<typeof leavingFriendsPage>
    | ReturnType<typeof setFollowingFriends>
    | ReturnType<typeof toggleFollowingFriendsProgress>
    | ReturnType<typeof setFriendsLoadingPage>
    | ReturnType<typeof followF>
    | ReturnType<typeof unfollowF>
    | ReturnType<typeof setFilter>


export type FriendsRootType = {
    error: null | string
    items: Array<UserType>
    totalFriendsCount: number
    currentPage: number
    pageSize: number
    isFetching: boolean
    toggleFollowingProgress: {
        ID: Array<number>
        inProgress: boolean
    }
    isLoadingPage: boolean
    mode: 'friends'
    filter: {
        term: string
    }
}

const initState: FriendsRootType = {
    error: null,
    items: [],
    currentPage: 1,
    pageSize: 5,
    totalFriendsCount: 0,
    isFetching: true,
    toggleFollowingProgress: {
        ID: [],
        inProgress: false
    },
    isLoadingPage: true,
    mode: 'friends',
    filter: {
        term: ''
    }
}

const FriendsReducer = (state: FriendsRootType = initState, action: ActionsType): FriendsRootType => {
    switch (action.type) {
        case "friends/SET_FRIENDS":
            return {...state, items: action.friends, totalFriendsCount: action.totalCount}
        case "friends/FOLLOW_UNFOLLOW":
            return {
                ...state,
                items: state.items.map(u => u.id === action.userID ? {...u, followed: action.following} : u)
            }
        case "friends/SET_CURRENT_PAGE":
            return {...state, currentPage: action.page}
        case "friends/SET_FETCHING":
            return {...state, isFetching: action.isFetch}
        case "friends/LEAVING_FRIENDS_PAGE":
            return {...state, isFetching: true, currentPage: 1}
        case "friends/FOLLOWING_PROGRESS":
            return {
                ...state, toggleFollowingProgress: {
                    ...state.toggleFollowingProgress,
                    inProgress: action.progress,
                    ID: action.progress
                        ? [...state.toggleFollowingProgress.ID, action.ID]
                        : state.toggleFollowingProgress.ID.filter(id => id !== action.ID)
                }
            }
        case "friends/SET_FETCH":
            return {...state, isLoadingPage: action.isLoadingPage}
        case "friends/FOLLOW":
            return {...state, items: state.items.map(f => f.id === action.userID ? {...f, followed: true} : f)}
        case "friends/UNFOLLOW":
            return {...state, items: state.items.map(f => f.id === action.userID ? {...f, followed: false} : f)}
        case "friends/SET_FILTER":
            return {...state, filter: {...state.filter, term: action.term}}
        default:
            return state
    }
}


export const setFriends = (friends: Array<UserType>, totalCount: number) => ({
    type: 'friends/SET_FRIENDS',
    friends,
    totalCount
} as const)
export const setFriendCurrentPage = (page: number) => ({type: 'friends/SET_CURRENT_PAGE', page} as const)
// для прелодера (при загрузки целой стронице "Friends")
export const setFriendsFetching = (isFetch: boolean) => ({type: 'friends/SET_FETCHING', isFetch} as const)
// зануление редюсера при выходе со страницы
export const leavingFriendsPage = () => ({type: 'friends/LEAVING_FRIENDS_PAGE'} as const)
export const setFollowingFriends = (userID: number, following: boolean) => ({
    type: 'friends/FOLLOW_UNFOLLOW',
    userID,
    following
} as const)
// при подписки или отписки на пользователя. Для disable кнопки или показывать что-то до ответа со сервера
export const toggleFollowingFriendsProgress = (progress: boolean, ID: number) => ({
    type: 'friends/FOLLOWING_PROGRESS',
    progress, ID
} as const)
// для прелодера при переходе со страницы на страницу
export const setFriendsLoadingPage = (isLoadingPage: boolean) => ({type: 'friends/SET_FETCH', isLoadingPage} as const)
export const followF = (userID: number) => ({type: 'friends/FOLLOW', userID} as const)
export const unfollowF = (userID: number) => ({type: 'friends/UNFOLLOW', userID} as const)
export const setFilter = (term: string) => ({type: 'friends/SET_FILTER', term} as const)


export const requestFriends = (currentPage: number, pageSize: number, term: string) => async (dispatch: Dispatch) => {
    dispatch(setFriendsLoadingPage(true))
    dispatch(setFilter(term))
    dispatch(setFriendCurrentPage(currentPage))
    try {
        const res = await usersAPI.getFriends(currentPage, pageSize, term)
        dispatch(setFriends(res.items, res.totalCount))
        dispatch(setFriendsFetching(false))
        dispatch(setFriendsLoadingPage(false))
    } catch (e) {
        setError(e.message)
    }
}

export const friendFollowing = (ID: number) => async (dispatch: Dispatch) => {
    dispatch(toggleFollowingFriendsProgress(true, ID))
    try {
        const res = await followingAPI.follow(ID)
        if (res.resultCode === Result.Success) {
            dispatch(followF(ID))
            dispatch(toggleFollowingFriendsProgress(false, ID))
        }
    } catch (e) {
        setError(e.message)
    }
}

export const friendUnfollow = (ID: number) => async (dispatch: Dispatch) => {
    dispatch(toggleFollowingFriendsProgress(true, ID))
    try {
        const res = await followingAPI.unfollow(ID)
        if (res.resultCode === Result.Success) {
            dispatch(unfollowF(ID))
            dispatch(toggleFollowingFriendsProgress(false, ID))
        }
    } catch (e) {
        setError(e.message)
    }
}


export default FriendsReducer