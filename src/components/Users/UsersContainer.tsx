import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {UsersRootType, setUsersLoadingPage, requestUsers} from "../../store/UsersReducer";
import Users from "./Users";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {DEV_MODE} from "../../common/dev.mode/devMode";


const UsersContainer = React.memo(() => {

    const users = useSelector<StateType, UsersRootType>(state => state.users)

    DEV_MODE && console.log('usersContainer page')

    return <Users
        term={users.filter.term}
        users={users.items}
        currentPage={users.currentPage}
        pageSize={users.pageSize}
        totalUsersCont={users.totalCount}
        showPreloader={users.isLoadingPage}
        toggleFollowingProgress={users.toggleFollowingProgress.ID}
        mode={'users'}
    />
})

export default UsersContainer