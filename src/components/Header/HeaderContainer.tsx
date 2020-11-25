import React, {useEffect} from "react";
import Header from "./Header";
import {instance} from "../../api/API";
import {setAuthUserData, setLoginLogout} from "../../store/AuthReducer";
import {useDispatch} from "react-redux";

const HeaderContainer = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        instance.get('auth/me')
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthUserData(res.data.data))
                    dispatch(setLoginLogout(true))
                }
            })
    })

    return <Header/>
}

export default HeaderContainer