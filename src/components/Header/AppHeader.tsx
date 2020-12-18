import React, {useCallback} from "react";
import hashSociety from "../../assets/icon/HASH.svg"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AuthRootType, logout} from "../../store/AuthReducer";
import {StateType} from "../../store/store";
import {Avatar, Button, Col, Layout, Row} from "antd";

const {Header} = Layout

export const AppHeader = React.memo(() => {

    const dispatch = useDispatch()
    const {isAuth, data} = useSelector<StateType, AuthRootType>(state => state.auth)

    const onLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    return (
        // <div className={s.headerBlock}>
        //     <header>
        //         <div className={s.logo}>
        //             <img src={SocialNetworkIcon} alt=""/>
        //             <div className={s.typing}>
        //                 <ReactTypingEffect text={'Hash society '}/>
        //             </div>
        //         </div>
        //         <div className={s.auth}>
        //             {isAuth
        //                 ? <>
        //                     <span>{data.login}</span>
        //                     <SNButton buttonText={'logout'} onClick={onLogout}/>
        //                 </>
        //                 : <NavLink to={'/login'}><SNButton buttonText={'login'}/></NavLink>
        //             }
        //         </div>
        //     </header>
        // </div>
        <Header className="header">
            <Row>
                <Col span={20}><Avatar src={hashSociety} shape={'square'} size={'large'}/></Col>
                <Col span={4}> {isAuth
                    ? <div>
                        <span style={{color: 'white'}}>{data.login}</span>
                        <Button size={'small'} onClick={onLogout} type={'primary'}>logout</Button>
                    </div>
                    : <Link to={'/login'}><Button type={'primary'} size={'small'}>login</Button></Link>
                }</Col>
            </Row>
        </Header>
    )
})
