import React, {useEffect, useState} from "react";
import s from "../Friends/Friends.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {
    FriendsRootType,
    setFriendCurrentPage,
    setFriends,
    setFriendsFetching,
    setFriendsTotalCount
} from "../../store/FriendsReducer";
import Users from "../Users/Users";
import {usersAPI} from "../../api/API";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";


const FriendsContainer = () => {

    const dispatch = useDispatch()
    const {totalFriendsCount, currentPage, pageSize, items, toggleFollowingProgress} = useSelector<StateType, FriendsRootType>(state => state.friends)
    const isFetching = useSelector<StateType, boolean>(state => state.friends.isFetching)
    const [showPreloader, setShowPreloader] = useState<boolean>(true)


    useEffect(() => {
        usersAPI.getFriends(currentPage, pageSize)
            .then(res => {
                dispatch(setFriends(res.items))
                dispatch(setFriendsTotalCount(res.totalCount))
                dispatch(setFriendsFetching(false))
                setShowPreloader(false)
            })
        return () => {
            setShowPreloader(true)
        }

    }, [currentPage, pageSize, isFetching, dispatch])

    const setCurrentPage = (page: number) => {
        dispatch(setFriendCurrentPage(page))
    }

    console.log('friends rerender')

    if (isFetching) return <MiniPreloader/>
    return (
        <div className={s.friendsBlock}>
            {totalFriendsCount
                ? <Users
                    users={items}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalUsersCont={totalFriendsCount}
                    setPage={setCurrentPage}
                    showPreloader={showPreloader}
                    toggleFollowingProgress={toggleFollowingProgress.ID}
                />
                : <div className={s.emptyPage}> empty </div>
            }
        </div>
    )
}

export default FriendsContainer