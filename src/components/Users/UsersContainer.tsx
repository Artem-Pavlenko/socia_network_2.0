import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {setTotalCount, setUsers, UsersRootType, UserType} from "../../store/UsersReducer";
import Users from "./Users";
import axios from "axios"


const UsersContainer = React.memo(() => {

    const dispatch = useDispatch()
    const users = useSelector<StateType, Array<UserType>>(state => state.users.items)
    const {totalCount, currentPage, pageSize} = useSelector<StateType, UsersRootType>(state => state.users)


    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                dispatch(setUsers(res.data.items))
                dispatch(setTotalCount(res.data.totalCount))
            })
    },[currentPage, pageSize])



    return (
        <div>
            <Users users={users} currentPage={currentPage} pageSize={pageSize} totalUsersCont={totalCount}/>
        </div>
    )
})

export default UsersContainer