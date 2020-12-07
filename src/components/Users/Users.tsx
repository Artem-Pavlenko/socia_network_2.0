import React, {ChangeEvent, useState} from "react";
import s from "../Users/Users.module.scss"
import UserItem from "./UserItem/UserItem";
import {getUsersThunk, UsersRootType, UserType} from "../../store/UsersReducer";
import Paginator from "../../common/common_component/Paginator/Paginator";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {useDispatch, useSelector} from "react-redux";
import {DEV_MODE} from "../../common/dev.mode/devMode";
import {StateType} from "../../store/store";


type UsersType = {
    users: Array<UserType>
    pageSize: number
    currentPage: number
    totalUsersCont: number
    setPage: (page: number) => void
    showPreloader: boolean
    toggleFollowingProgress: Array<number>
    mode: 'friends' | 'users'
}

const Users = React.memo((props: UsersType) => {

    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const {currentPage, pageSize} = useSelector<StateType, UsersRootType>( state => state.users)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        dispatch(getUsersThunk(currentPage, pageSize))
    }

    DEV_MODE && console.log('Users render')

    return (
        <div className={s.usersBlock}>
            <div className={s.paginator}>
                <Paginator
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    totalUsersCont={props.totalUsersCont}
                    onClick={props.setPage}/>
            </div>
            <div>
                <input type="text" value={value} onChange={onChange}/>
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
                    toggleFollowingProgress={props.toggleFollowingProgress}
                    mode={props.mode}
                />)}
            </div>
        </div>
    )
})

export default Users