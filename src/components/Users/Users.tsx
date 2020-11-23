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

const Users = (props: Users) => {

    const dispatch = useDispatch()

    const totalPagesCount = props.totalUsersCont / props.pageSize
    const pages: number[] = []
    for (let i = 1; i <= totalPagesCount / 50; i++) {  //делю на 50 для удобства просмотра
        pages.push(i)
    }

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