import React, {ChangeEvent, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import * as queryString from "querystring"
import {FriendsRootType, requestFriends, setFriendsLoadingPage} from "../../store/FriendsReducer"
import {requestUsers, setUsersLoadingPage, UsersRootType, UserType} from "../../store/UsersReducer"
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader"
import Paginator from "../../common/common_component/Paginator/Paginator"
import {NotFound} from "../../common/common_component/NotFound/NotFound"
import SNButton from "../../common/common_component/button/SNButton"
import Search from "../../common/common_component/Search/Search"
import {DEV_MODE} from "../../common/dev.mode/devMode"
import {StateType} from "../../store/store"
import s from "../Users/Users.module.scss"
import {MapUsers} from "./MapUsers"
// import _ from "lodash"

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

    const dispatch = useDispatch()
    const users = useSelector<StateType, UsersRootType>(state => state.users)
    const friends = useSelector<StateType, FriendsRootType>(state => state.friends)
    const history = useHistory()
    const [value, setValue] = useState<string>(props.term)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const search = (value: string) => {

        let friendsCurrentPageForDebounce = 1
        let usersCurrentPageForDebounce = 1

        if (value === '') {
            friendsCurrentPageForDebounce = friends.currentPage
            usersCurrentPageForDebounce = users.currentPage
        }

        props.mode === "friends" && dispatch(requestFriends(friendsCurrentPageForDebounce, friends.pageSize, value))
        props.mode === "users" && dispatch(requestUsers(usersCurrentPageForDebounce, users.pageSize, value))
    }
    // const debounceSearch = _.debounce(search, 1000)

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
        // .substr(1) для того чтобы убрать "?"
        const parsed = queryString.parse(history.location.search.substr(1)) as { term: string, page: string }
        let actualPage = currentPage
        let actualFilter = term

        if (!!parsed.page) actualPage = +parsed.page
        if (!!parsed.term) actualFilter = parsed.term as string // может прийти массив строк. для этого as string

        props.mode === "users" && dispatch(requestUsers(actualPage, users.pageSize, actualFilter))
        props.mode === "friends" && dispatch(requestFriends(actualPage, friends.pageSize, actualFilter))

        return () => {
            props.mode === "users" && dispatch(setUsersLoadingPage(true))
            props.mode === "friends" && dispatch(setFriendsLoadingPage(true))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // для _.debounce
    // useEffect(() => {
    //     debugger
    //     debounceSearch(value)
    //     return debounceSearch.cancel
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [value])

    useEffect(() => {
        history.push({
            pathname: `/${props.mode}`,
            search: `?term=${term}&page=${currentPage}`
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term, props.mode, currentPage])


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
                <SNButton buttonText={'find'} onClick={ () => search(value)} />
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