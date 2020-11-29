import React, {useEffect} from "react";
import Header from "./Header";
import {authMe} from "../../store/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/store";

const HeaderContainer = () => {

    const dispatch = useDispatch()

    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        if (!isAuth) {
            dispatch(authMe())
        }
    })

    return <Header/>
}

export default HeaderContainer