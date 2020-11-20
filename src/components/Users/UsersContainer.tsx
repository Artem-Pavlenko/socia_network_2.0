import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {UserType} from "../../store/UsersReducer";
import Users from "./Users";
import {usersAPI} from "../../api/usersAPI";


const UsersContainer = React.memo(() => {

    const dispatch = useDispatch()

    useEffect( () => {usersAPI.getUsers(dispatch)
    },[])
    const users = useSelector<StateType, Array<UserType>>(state => state.users.items)

    return (
        <div>
            <Users users={users} />
        </div>
    )
})

export default UsersContainer