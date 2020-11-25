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
import {instance} from "../../api/usersAPI";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";


const FriendsContainer = () => {

    const dispatch = useDispatch()
    const {totalFriendsCount, currentPage, pageSize, items} = useSelector<StateType, FriendsRootType>(state => state.friends)
    const isFetching = useSelector<StateType, boolean>(state => state.friends.isFetching)
    const [showPreloader, setShowPreloader] =useState<boolean>(true)

    useEffect(() => {
        instance.get(`users?page=${currentPage}&count=${pageSize}&friend=true` )
            .then(res => {
                dispatch(setFriends(res.data.items))
                dispatch(setFriendsTotalCount(res.data.totalCount))
                dispatch(setFriendsFetching(false))
                setShowPreloader(false)
            })
        return () => {setShowPreloader(true)}
    }, [currentPage, pageSize, dispatch])

    const setCurrentPage = (page: number) => {
        dispatch(setFriendCurrentPage(page))
    }

    console.log('friends rerender')

    if (isFetching) return <MiniPreloader />
    return (
        <div className={s.friendsBlock}>
            <Users
                users={items}
                pageSize={pageSize}
                currentPage={currentPage}
                totalUsersCont={totalFriendsCount}
                setPage={setCurrentPage}
                showPreloader={showPreloader}
            />
        </div>
    )
}

export default FriendsContainer