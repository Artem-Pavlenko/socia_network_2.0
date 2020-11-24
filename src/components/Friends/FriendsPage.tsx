import React, {useEffect} from "react";
import FriendsContainer from "./FriendsContainer";
import {useDispatch} from "react-redux";
import {setLeavingFriendsPage} from "../../store/FriendsReducer";

const FriendsPage = () => {

    const dispatch = useDispatch()

    useEffect( () => {
        return () => {dispatch(setLeavingFriendsPage())}
    })

    return <FriendsContainer />
}

export default FriendsPage