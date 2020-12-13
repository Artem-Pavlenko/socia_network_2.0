import React from "react";
import {UserType} from "../../store/UsersReducer";
import UserItem from "./UserItem/UserItem";

type PropsType = {
    users: Array<UserType>
    toggleFollowingProgress: Array<number>
    mode: 'friends' | 'users'
}

export const MapUsers = React.memo((props: PropsType) => {

    return (
        <div>
            {props.users.map(u => <UserItem
                photos={u.photos}
                uniqueUrlName={u.uniqueUrlName}
                key={u.id}
                id={+u.id}
                status={u.status}
                followed={u.followed}
                name={u.name}
                toggleFollowingProgress={props.toggleFollowingProgress}
                mode={props.mode}
            />)}
        </div>
    )
})