import React from "react";
import s from "../Users/Users.module.scss"
import UserItem from "./UserItem/UserItem";
import {UserType} from "../../store/UsersReducer";
import Paginator from "../../common/common_component/Paginator/Paginator";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";


type UsersType = {
    users: Array<UserType>
    pageSize: number
    currentPage: number
    totalUsersCont: number
    setPage: (page: number) => void
    showPreloader: boolean
}

const Users = React.memo((props: UsersType) => {


    return (
        <div className={s.usersBlock}>
            <div className={s.paginator}>
                <Paginator
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    totalUsersCont={props.totalUsersCont}
                    onClick={props.setPage}/>
            </div>
            <div className={s.users}>
                {props.showPreloader && <MiniPreloader/>}
                {props.users.map(u => <UserItem
                    photos={u.photos}
                    uniqueUrlName={u.uniqueUrlName}
                    key={u.id}
                    id={+u.id}
                    status={u.status}
                    followed={u.followed}
                    name={u.name}
                />)}
            </div>
        </div>
    )
})

export default Users