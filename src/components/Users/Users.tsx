import React from "react";
import s from "../Users/Users.module.scss"
import {UsersType} from "../../store/UsersReducer";
import UserItem from "./UserItem/UserItem";

type Users = {
    users: Array<UsersType>
}

const Users = (props: Users) => {

    return (
        <div className={s.usersBlock}>
            <div>
                {props.users.map( u => <UserItem key={u.id} id={u.id} status={u.status} followed={u.followed} fullName={u.fullName}/>)}
            </div>
        </div>
    )
}

export default Users