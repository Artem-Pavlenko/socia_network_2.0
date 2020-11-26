import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {UsersRootType, setUsersCurrentPage, getUsersThunk, setUsersLoadingPage} from "../../store/UsersReducer";
import Users from "./Users";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";


const UsersContainer = React.memo(() => {

    const dispatch = useDispatch()
    const users = useSelector<StateType, UsersRootType>(state => state.users)

    useEffect(() => {

        dispatch(getUsersThunk(users.currentPage, users.pageSize))

        return () => {
            dispatch(setUsersLoadingPage(true))
        }
    }, [users.currentPage, users.pageSize, users.isFetching, dispatch])

    const setCurrentPage = (page: number) => {
        dispatch(setUsersCurrentPage(page))
    }

    // console.log('users page')

    if (users.isFetching) return <MiniPreloader/>
    return (
        <Users
            users={users.items}
            currentPage={users.currentPage}
            pageSize={users.pageSize}
            totalUsersCont={users.totalCount}
            setPage={setCurrentPage}
            showPreloader={users.isLoadingPage}
            toggleFollowingProgress={users.toggleFollowingProgress.ID}
        />
    )

})

export default UsersContainer