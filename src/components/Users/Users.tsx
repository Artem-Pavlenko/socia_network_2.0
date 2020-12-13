import React, {ChangeEvent, useEffect, useState} from "react";
import s from "../Users/Users.module.scss"
import {requestUsers, UsersRootType, UserType} from "../../store/UsersReducer";
import Paginator from "../../common/common_component/Paginator/Paginator";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {useDispatch, useSelector} from "react-redux";
import {DEV_MODE} from "../../common/dev.mode/devMode";
import {StateType} from "../../store/store";
import Search from "../../common/common_component/Search/Search";
import {requestFriends} from "../../store/FriendsReducer";
import _ from "lodash"
import {MapUsers} from "./MapUsers";
import {NotFound} from "../../common/common_component/NotFound/NotFound";


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
    const {pageSize} = useSelector<StateType, UsersRootType>(state => state.users)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const search = (value: string) => {
        props.mode === "friends" && dispatch(requestFriends(1, pageSize, value))
        props.mode === "users" && dispatch(requestUsers(1, pageSize, value))
    }

    const change = _.debounce(search, 1000)

    useEffect(() => {
        change(value)
        return change.cancel
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

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
            <div className={s.searchBlock}>
                <Search value={value} onChange={onChange}/>
            </div>
            <div className={s.users}>
                {props.showPreloader && <MiniPreloader/>}
                {props.users.length === 0
                    ? <NotFound text={'users not found'}/>
                    : <MapUsers {...props}/>}
            </div>
        </div>
    )
})

export default Users