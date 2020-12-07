import React, {useCallback} from "react";
import s from "../Header/Header.module.scss"
import SocialNetworkIcon from "../../assets/icon/HASH.svg"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AuthRootType, logout} from "../../store/AuthReducer";
import {StateType} from "../../store/store";


const Header = React.memo(() => {

    const dispatch = useDispatch()
    const {isAuth, data} = useSelector<StateType, AuthRootType>(state => state.auth)

    const onLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

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
})

export default Header