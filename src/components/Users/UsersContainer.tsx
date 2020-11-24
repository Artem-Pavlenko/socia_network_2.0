import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {setUsersTotalCount, setUsers, UsersRootType, setUsersCurrentPage} from "../../store/UsersReducer";
import Users from "./Users";
import axios from "axios"


const UsersContainer = React.memo(() => {

    const dispatch = useDispatch()
    const {totalCount, currentPage, pageSize, items} = useSelector<StateType, UsersRootType>(state => state.users)


    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                dispatch(setUsers(res.data.items))
                dispatch(setUsersTotalCount(res.data.totalCount))
                console.log(pageSize, currentPage, totalCount)
            })
    }, [currentPage, pageSize, dispatch])

    const setCurrentPage = (page: number) => {
        dispatch(setUsersCurrentPage(page))
    }

    return (
        <Users
            users={items}
            currentPage={currentPage}
            pageSize={pageSize}
            totalUsersCont={totalCount}
            setPage={setCurrentPage}
        />
    )

})

export default UsersContainer