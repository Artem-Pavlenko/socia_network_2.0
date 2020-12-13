import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {UsersRootType, setUsersLoadingPage, requestUsers} from "../../store/UsersReducer";
import Users from "./Users";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {DEV_MODE} from "../../common/dev.mode/devMode";


const UsersContainer = React.memo(() => {

    const dispatch = useDispatch()
    const users = useSelector<StateType, UsersRootType>(state => state.users)

    useEffect(() => {
        dispatch(requestUsers(users.currentPage, users.pageSize, users.filter.term))

        return () => {
            dispatch(setUsersLoadingPage(true))
        }
    }, [])

    const setCurrentPage = useCallback((page: number) => {
        dispatch(requestUsers(page, users.pageSize, users.filter.term))
    }, [dispatch, users.filter.term, users.pageSize])

    DEV_MODE && console.log('usersContainer page')

    if (users.isFetching) return <MiniPreloader/>
    return <Users
        users={users.items}
        currentPage={users.currentPage}
        pageSize={users.pageSize}
        totalUsersCont={users.totalCount}
        setPage={setCurrentPage}
        showPreloader={users.isLoadingPage}
        toggleFollowingProgress={users.toggleFollowingProgress.ID}
        mode={'users'}
    />
})

export default UsersContainer