import React, {ChangeEvent, useEffect, useState} from "react";
import s from "../Users/Users.module.scss"
import {requestUsers, setUsersLoadingPage, UsersRootType, UserType} from "../../store/UsersReducer";
import Paginator from "../../common/common_component/Paginator/Paginator";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {useDispatch, useSelector} from "react-redux";
import {DEV_MODE} from "../../common/dev.mode/devMode";
import {StateType} from "../../store/store";
import Search from "../../common/common_component/Search/Search";
import {FriendsRootType, requestFriends, setFriendsLoadingPage} from "../../store/FriendsReducer";
import _ from "lodash"
import {MapUsers} from "./MapUsers";
import {NotFound} from "../../common/common_component/NotFound/NotFound";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";


type UsersType = {
    users: Array<UserType>
    pageSize: number
    currentPage: number
    totalUsersCont: number
    showPreloader: boolean
    toggleFollowingProgress: Array<number>
    mode: 'friends' | 'users'
    term: string
}

const Users = React.memo((props: UsersType) => {

    const [value, setValue] = useState<string>(props.term)
    const dispatch = useDispatch()
    const users = useSelector<StateType, UsersRootType>(state => state.users)
    const friends = useSelector<StateType, FriendsRootType>(state => state.friends)
    const history = useHistory()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const search = (value: string) => {
        props.mode === "friends" && dispatch(requestFriends(1, friends.pageSize, value))
        props.mode === "users" && dispatch(requestUsers(1, users.pageSize, value))
    }

    const change = _.debounce(search, 1000)

    let currentPage: number
    let term: string
    switch (props.mode) {
        case "users":
            term = users.filter.term
            currentPage = users.currentPage
            break
        case "friends":
            term = friends.filter.term
            currentPage = friends.currentPage
            break
    }

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as {term: string, page: string}

        let actualPage: number
        let actualFilter: string
        switch (props.mode) {
            case "users":
                actualPage = users.currentPage
                actualFilter = users.filter.term
                break
            case "friends":
                actualPage = friends.currentPage
                actualFilter = friends.filter.term
                break
        }

        if (parsed.page) actualPage = +parsed.page
        if (parsed.term) actualFilter = parsed.term as string

        props.mode === "users" && dispatch(requestUsers(actualPage, users.pageSize, actualFilter))
        props.mode === "friends" && dispatch(requestFriends(actualPage, friends.pageSize, actualFilter))

        return () => {
            props.mode === "users" && dispatch(setUsersLoadingPage(true))
            props.mode === "friends" && dispatch(setFriendsLoadingPage(true))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        history.push({
            pathname: `/${props.mode}`,
            search: `?term=${term}&page=${currentPage}`
        })
    }, [term, props.mode, currentPage])

    useEffect(() => {
        change(value)
        return change.cancel
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const setPage = (page: number) => {
        props.mode === "friends" && dispatch(requestFriends(page, friends.pageSize, friends.filter.term))
        props.mode === "users" && dispatch(requestUsers(page, users.pageSize, users.filter.term))
    }

    DEV_MODE && console.log('Users render')

    if (props.mode === "friends" && friends.isFetching) return <MiniPreloader/>
    if (props.mode === "users" && users.isFetching) return <MiniPreloader/>
    return (
        <div className={s.usersBlock}>
            <div className={s.paginator}>
                <Paginator
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    totalUsersCont={props.totalUsersCont}
                    onClick={setPage}/>
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