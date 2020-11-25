import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {
    setUsersTotalCount,
    setUsers,
    UsersRootType,
    setUsersCurrentPage,
    setUsersFetching
} from "../../store/UsersReducer";
import Users from "./Users";
import axios from "axios"
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";


const UsersContainer = React.memo(() => {

    const dispatch = useDispatch()
    const {totalCount, currentPage, pageSize, items} = useSelector<StateType, UsersRootType>(state => state.users)
    const isFetching = useSelector<StateType, boolean>(state => state.users.isFetching)
    const [showPreloader, setShowPreloader] = useState<boolean>(true)


    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                dispatch(setUsers(res.data.items))
                dispatch(setUsersTotalCount(res.data.totalCount))
                dispatch(setUsersFetching(false))
                setShowPreloader(false)
            })
        return () => {
            setShowPreloader(true)
        }
    }, [currentPage, pageSize, isFetching, dispatch])

    const setCurrentPage = (page: number) => {
        dispatch(setUsersCurrentPage(page))
    }

    console.log('users page')

    if (isFetching) return <MiniPreloader/>
    return (
        <Users
            users={items}
            currentPage={currentPage}
            pageSize={pageSize}
            totalUsersCont={totalCount}
            setPage={setCurrentPage}
            showPreloader={showPreloader}
        />
    )

})

export default UsersContainer