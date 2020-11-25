import React from "react";
import s from "../Header/Header.module.scss"
import SocialNetworkIcon from "../../assets/images/social.svg"
import {NavLink} from "react-router-dom";
import {instance} from "../../api/API";
import {useDispatch, useSelector} from "react-redux";
import {AuthRootType, setLoginLogout} from "../../store/AuthReducer";
import {StateType} from "../../store/store";


const Header = () => {

    const dispatch = useDispatch()
    const {isAuth, data} = useSelector<StateType, AuthRootType>(state => state.auth)

    const onLogout = () => {
        instance.delete('auth/login')
            .then(res => {
                debugger
                if (res.data.resultCode === 0) {
                    dispatch(setLoginLogout(false))
                }
            })
    }

    return (
        <div className={s.headerBlock}>
            <header>
                <img src={SocialNetworkIcon} alt=""/>
                <div>
                    {isAuth
                        ? <>
                            <span>{data.login}</span>
                            <button onClick={onLogout}>logout</button>
                        </>


                        : <NavLink to={'/login'}>login</NavLink>
                    }
                </div>
            </header>
        </div>
    )
}

export default Header