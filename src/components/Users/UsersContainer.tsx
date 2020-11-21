import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {setTotalCount, setUsers, UserType} from "../../store/UsersReducer";
import Users from "./Users";
import {usersAPI} from "../../api/usersAPI";
import axios from "axios"


const UsersContainer = React.memo(() => {

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(res => {
                dispatch(setUsers(res.data.items))
                dispatch(setTotalCount(res.data.totalCount))
            })
    },[])

    const users = useSelector<StateType, Array<UserType>>(state => state.users.items)

    return (
        <div>
            <Users users={users}/>
        </div>
    )
})

export default UsersContainer