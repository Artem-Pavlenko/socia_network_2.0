import React, {useEffect} from "react";
import s from "../Friends/Friends.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {
    FriendsRootType,
    setFriendsLoadingPage,
    setFriendCurrentPage,
    getFriendsThunk
} from "../../store/FriendsReducer";
import Users from "../Users/Users";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {DEV_MODE} from "../../common/dev.mode/devMode";


const FriendsContainer = React.memo(() => {

    const dispatch = useDispatch()
    const friends = useSelector<StateType, FriendsRootType>(state => state.friends)

    useEffect(() => {
        dispatch(getFriendsThunk(friends.currentPage, friends.pageSize))

        return () => {
            dispatch(setFriendsLoadingPage(true))
        }
    }, [friends.currentPage, friends.pageSize, dispatch])

    const setCurrentPage = (page: number) => {
        dispatch(setFriendCurrentPage(page))
    }

    DEV_MODE && console.log('friends rerender')

    if (friends.isFetching) return <MiniPreloader/>
    return (
        <div className={s.friendsBlock}>
            {friends.totalFriendsCount
                ? <Users
                    users={friends.items}
                    pageSize={friends.pageSize}
                    currentPage={friends.currentPage}
                    totalUsersCont={friends.totalFriendsCount}
                    setPage={setCurrentPage}
                    showPreloader={friends.isLoadingPage}
                    toggleFollowingProgress={friends.toggleFollowingProgress.ID}
                    mode={'friends'}
                />
                : <div className={s.emptyPage}> empty </div>
            }
        </div>
    )
})

export default FriendsContainer