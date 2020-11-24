import {UserType} from "./UsersReducer";

type ActionsType =
    ReturnType<typeof setFriends>
    | ReturnType<typeof setFriendsTotalCount>
    | ReturnType<typeof setFriendCurrentPage>


export type FriendsRootType = {
    error: null | string
    items: Array<UserType>
    totalFriendsCount: number
    currentPage: number
    pageSize: number
}

const initState: FriendsRootType  = {
    error: null,
    items: [],
    currentPage: 1,
    pageSize: 5,
    totalFriendsCount: 0
}

const FriendsReducer = (state:FriendsRootType = initState, action: ActionsType): FriendsRootType => {
    switch (action.type) {
        case "friends/SET_FRIENDS":
            return {...state, items: action.friends}
        case "friends/SET_FRIENDS_COUNT":
            return {...state, totalFriendsCount: action.friendsCount}
        case "friends/SET_CURRENT_PAGE":
            return {...state, currentPage: action.page}
        default:
            return state
    }
}

export const setFriends = (friends: Array<UserType>) => ({type: 'friends/SET_FRIENDS', friends} as const )
export const setFriendsTotalCount = (friendsCount: number) => ({type: 'friends/SET_FRIENDS_COUNT', friendsCount} as const)
export const setFriendCurrentPage = (page: number) => ({type: 'friends/SET_CURRENT_PAGE', page} as const)

export default FriendsReducer