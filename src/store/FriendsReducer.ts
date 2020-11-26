import {UserType} from "./UsersReducer";

type ActionsType =
    ReturnType<typeof setFriends>
    | ReturnType<typeof setFriendsTotalCount>
    | ReturnType<typeof setFriendCurrentPage>
    | ReturnType<typeof setFriendsFetching>
    | ReturnType<typeof setLeavingFriendsPage>
    | ReturnType<typeof setFollowingFriends>
    | ReturnType<typeof toggleFollowingFriendsProgress>


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
    }
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
                        : state.toggleFollowingProgress.ID.filter( id => id !== action.ID)
                }
            }
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

export default FriendsReducer