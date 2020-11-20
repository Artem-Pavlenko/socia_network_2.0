import React from "react";
import {useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {UsersType} from "../../store/UsersReducer";
import Users from "./Users";


const UsersContainer = React.memo(() => {

    const users = useSelector<StateType, Array<UsersType>>(state => state.users.users)

    return (
        <div>
            <Users users={users} />
        </div>
    )
})

export default UsersContainer