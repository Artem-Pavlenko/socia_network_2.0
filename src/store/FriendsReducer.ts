import {UserType} from "./UsersReducer";
import {Dispatch} from "redux";
import {usersAPI} from "../api/API";

type ActionsType =
    ReturnType<typeof setFriends>
    | ReturnType<typeof setFriendsTotalCount>
    | ReturnType<typeof setFriendCurrentPage>
    | ReturnType<typeof setFriendsFetching>
    | ReturnType<typeof setLeavingFriendsPage>
    | ReturnType<typeof setFollowingFriends>
    | ReturnType<typeof toggleFollowingFriendsProgress>
    | ReturnType<typeof setFriendsLoadingPage>


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
    isLoadingPage: true
}

const FriendsReducer = (state: FriendsRootType = initState, action: ActionsType): FriendsRootType => {
    switch (action.type) {
        case "friends/SET_FRIENDS":
            return {...state, items: action.friends}
        case "friends/SET_FRIENDS_COUNT":
            return {...state, totalFriendsCount: action.friendsCount}
        case "friends/FOLLOW_UNFOLLOW":
            return {
                ...state,
                items: state.items.map(u => u.id === action.userID ? {...u, followed: action.following} : u)
            }
        case "friends/SET_CURRENT_PAGE":
            return {...state, currentPage: action.page}
        case "friends/SET_FETCHING":
            return {...state, isFetching: action.isFetch}
        case "friends/SET_LEAVING_FRIENDS_PAGE":
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
        default:
            return state
    }
}


export const setFriends = (friends: Array<UserType>) => ({type: 'friends/SET_FRIENDS', friends} as const)
export const setFriendsTotalCount = (friendsCount: number) => ({
    type: 'friends/SET_FRIENDS_COUNT',
    friendsCount
} as const)
export const setFriendCurrentPage = (page: number) => ({type: 'friends/SET_CURRENT_PAGE', page} as const)
export const setFriendsFetching = (isFetch: boolean) => ({type: 'friends/SET_FETCHING', isFetch} as const)
export const setLeavingFriendsPage = () => ({type: 'friends/SET_LEAVING_FRIENDS_PAGE'} as const)
export const setFollowingFriends = (userID: number, following: boolean) => ({
    type: 'friends/FOLLOW_UNFOLLOW',
    userID,
    following
} as const)
export const toggleFollowingFriendsProgress = (progress: boolean, ID: number) => ({
    type: 'friends/FOLLOWING_PROGRESS',
    progress, ID
} as const)
export const setFriendsLoadingPage = (isLoadingPage: boolean) => ({type: 'friends/SET_FETCH', isLoadingPage} as const)


export const getFriendsThunk = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    usersAPI.getFriends(currentPage, pageSize)
        .then(res => {
            dispatch(setFriends(res.items))
            dispatch(setFriendsTotalCount(res.totalCount))
            dispatch(setFriendsFetching(false))
            dispatch(setFriendsLoadingPage(false))
        })
}


export default FriendsReducer