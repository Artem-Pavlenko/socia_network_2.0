import React, {useEffect} from "react";
import FriendsContainer from "./FriendsContainer";
import {useDispatch} from "react-redux";
import {leavingFriendsPage} from "../../store/FriendsReducer";

const FriendsPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(leavingFriendsPage())
        }
    })

    return <FriendsContainer/>
}

export default FriendsPage