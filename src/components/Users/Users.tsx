import React from "react";
import s from "../Users/Users.module.scss"
import UserItem from "./UserItem/UserItem";
import {UserType} from "../../store/UsersReducer";

type Users = {
    users: Array<UserType>
}

const Users = (props: Users) => {


    return (
        <div className={s.usersBlock}>
            <div>
                {props.users.map(u => <UserItem
                        photos={u.photos}
                        uniqueUrlName={u.uniqueUrlName}
                        key={u.id} id={(Number(u.id))}
                        status={u.status}
                        followed={u.followed}
                        name={u.name}
                    />)}
            </div>
        </div>
    )
}

export default Users