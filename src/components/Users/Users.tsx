import React from "react";
import s from "../Users/Users.module.scss"
import UserItem from "./UserItem/UserItem";
import {setCurrentPage, UserType} from "../../store/UsersReducer";
import {useDispatch} from "react-redux";
import Paginator from "../../common/common_component/Paginator/Paginator";

type Users = {
    users: Array<UserType>
    pageSize: number
    currentPage: number
    totalUsersCont: number
}

const Users = React.memo ((props: Users) => {

    const dispatch = useDispatch()

    const setPage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    return (
        <div className={s.usersBlock}>
            <div className={s.paginator}>
                <Paginator
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    totalUsersCont={props.totalUsersCont}
                    onClick={setPage}/>
            </div>
            <div className={s.users}>
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
})

export default Users