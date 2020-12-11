import React, {useCallback} from "react";
import s from "../Header/Header.module.scss"
import SocialNetworkIcon from "../../assets/icon/HASH.svg"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AuthRootType, logout} from "../../store/AuthReducer";
import {StateType} from "../../store/store";
import ReactTypingEffect from "react-typing-effect";
import SNButton from "../../common/common_component/button/SNButton";


const Header = React.memo(() => {

    const dispatch = useDispatch()
    const {isAuth, data} = useSelector<StateType, AuthRootType>(state => state.auth)

    const onLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    return (
        <div className={s.headerBlock}>
            <header>
                <div className={s.logo}>
                    <img src={SocialNetworkIcon} alt=""/>
                    <div className={s.typing}>
                        <ReactTypingEffect text={'Hash society '}/>
                    </div>
                </div>
                <div className={s.auth}>
                    {isAuth
                        ? <>
                            <span>{data.login}</span>
                            <SNButton buttonText={'logout'} onClick={onLogout}/>
                        </>
                        : <NavLink to={'/login'}><SNButton buttonText={'login'}/></NavLink>
                    }
                </div>
            </header>
        </div>
    )
})

export default Header