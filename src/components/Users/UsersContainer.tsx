import React from "react"
import {useSelector} from "react-redux"
import {UsersRootType} from "../../store/UsersReducer"
import {DEV_MODE} from "../../common/dev.mode/devMode"
import {StateType} from "../../store/store"
import Users from "./Users"


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