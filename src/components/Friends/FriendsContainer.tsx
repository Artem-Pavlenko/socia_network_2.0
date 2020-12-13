import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";
import {FriendsRootType, requestFriends, setFriendsLoadingPage} from "../../store/FriendsReducer";
import Users from "../Users/Users";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {DEV_MODE} from "../../common/dev.mode/devMode";


const FriendsContainer = React.memo(() => {

    const friends = useSelector<StateType, FriendsRootType>(state => state.friends)

    DEV_MODE && console.log('friends rerender')

    return <Users
        term={friends.filter.term}
        users={friends.items}
        pageSize={friends.pageSize}
        currentPage={friends.currentPage}
        totalUsersCont={friends.totalFriendsCount}
        showPreloader={friends.isLoadingPage}
        toggleFollowingProgress={friends.toggleFollowingProgress.ID}
        mode={'friends'}
    />
})

export default FriendsContainer