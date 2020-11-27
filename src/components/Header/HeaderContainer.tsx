import React, {useEffect} from "react";
import Header from "./Header";
import {authMe} from "../../store/AuthReducer";
import {useDispatch} from "react-redux";

const HeaderContainer = () => {

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(authMe())
    })

    return <Header/>
}

export default HeaderContainer