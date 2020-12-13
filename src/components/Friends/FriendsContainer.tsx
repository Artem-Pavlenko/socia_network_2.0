import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {FriendsRootType, requestFriends, setFriendsLoadingPage} from "../../store/FriendsReducer";
import Users from "../Users/Users";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {DEV_MODE} from "../../common/dev.mode/devMode";


const FriendsContainer = React.memo(() => {

    const dispatch = useDispatch()
    const friends = useSelector<StateType, FriendsRootType>(state => state.friends)

    useEffect(() => {
        dispatch(requestFriends(friends.currentPage, friends.pageSize, ''))

        return () => {
            dispatch(setFriendsLoadingPage(true))
        }
    }, [])

    const setCurrentPage = useCallback((page: number) => {
        dispatch(requestFriends(page, friends.pageSize, friends.filter.term))
    }, [dispatch, friends.filter.term, friends.pageSize])

    DEV_MODE && console.log('friends rerender')

    if (friends.isFetching) return <MiniPreloader/>
    return <Users
        users={friends.items}
        pageSize={friends.pageSize}
        currentPage={friends.currentPage}
        totalUsersCont={friends.totalFriendsCount}
        setPage={setCurrentPage}
        showPreloader={friends.isLoadingPage}
        toggleFollowingProgress={friends.toggleFollowingProgress.ID}
        mode={'friends'}
    />
})

export default FriendsContainer