import React, {useEffect} from "react";
import s from "../Friends/Friends.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {FriendsRootType, setFriendCurrentPage, setFriends, setFriendsTotalCount} from "../../store/FriendsReducer";
import Users from "../Users/Users";
import {instance} from "../../api/usersAPI";


const FriendsContainer = () => {

    const dispatch = useDispatch()
    const {totalFriendsCount, currentPage, pageSize, items} = useSelector<StateType, FriendsRootType>(state => state.friends)

    useEffect(() => {
        instance.get(`users?page=${currentPage}&count=${pageSize}&friend=true` )
            .then(res => {
                console.log('currentPage :', currentPage, ', PageSize :', pageSize)
                dispatch(setFriends(res.data.items))
                dispatch(setFriendsTotalCount(res.data.totalCount))
                console.log(pageSize, currentPage, totalFriendsCount)
            })
    }, [currentPage, pageSize, dispatch])

    const setCurrentPage = (page: number) => {
        dispatch(setFriendCurrentPage(page))
    }

    return (
        <div className={s.friendsBlock}>
            <Users
                users={items}
                pageSize={pageSize}
                currentPage={currentPage}
                totalUsersCont={totalFriendsCount}
                setPage={setCurrentPage}
            />
        </div>
    )
}

export default FriendsContainer