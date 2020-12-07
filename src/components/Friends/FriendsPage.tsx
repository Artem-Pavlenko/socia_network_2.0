import React, {useEffect} from "react";
import FriendsContainer from "./FriendsContainer";
import {useDispatch, useSelector} from "react-redux";
import {leavingFriendsPage} from "../../store/FriendsReducer";
import {StateType} from "../../store/store";
import {Redirect} from "react-router-dom";

const FriendsPage = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        return () => {
            // isAuth чтобы лишний раз не диспатчить так как у нас есть редирект === componentDidUnmount
            isAuth && dispatch(leavingFriendsPage())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isAuth) return <Redirect to={'/login'}/>
    return <FriendsContainer/>
}

export default FriendsPage