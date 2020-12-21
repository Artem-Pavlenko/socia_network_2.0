import React, {Suspense, useEffect, useState} from 'react';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Settings from "./components/Setting/Settings";
import DialogsPage from "./components/Dialogs/Dialogs";
import FriendsPage from "./components/Friends/FriendsPage";
import UsersPage from "./components/Users/UsersPage";
import ProfilePage from "./components/Profile/ProfilePage";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./store/store";
import MiniPreloader from "./common/common_component/Preloader/MiniPreloader/MiniPreloader";
import {initializeApp} from "./store/appReducer";
import NekoPreloader from "./common/common_component/Preloader/NekoPreloader/NekoPreloader";

import {Layout, Menu, Modal} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css'
import {AuthRootType} from "./store/AuthReducer";
import {AppHeader} from "./components/Header/AppHeader";
import ReactTypingEffect from "react-typing-effect";
import {clearErrors, ErrorRootType} from "./store/ErrorReducer";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout

// Components that are loaded when needed (lazy-loading)
const NotFoundPage = React.lazy(() => import('./common/common_component/NotFoundPage/NotFoundPage'))

const App = () => {

    const initialized = useSelector<StateType, boolean>(state => state.app.initialized)
    const {isAuth} = useSelector<StateType, AuthRootType>(state => state.auth)
    const errors = useSelector<StateType, ErrorRootType>(state => state.error)
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        dispatch(initializeApp())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const redirectTo = isAuth ? '/profile' : '/login'

    if (!initialized) return <NekoPreloader/>

    return (
        // <div className="App">
        //     <HeaderContainer/>
        //     <NavBar/>
        //     <div className="content-wrapper">
        //         <Suspense fallback={<MiniPreloader/>}>
        //             <Switch>
        //                 <Route path={"/profile/:userID?"} render={() => <ProfilePage/>}/>
        //                 <Route path={"/friends"} render={() => <FriendsPage/>}/>
        //                 <Route path={"/users"} render={() => <UsersPage/>}/>
        //                 <Route path={"/messages"} render={() => <DialogsPage/>}/>
        //                 <Route path={"/settings"} render={() => <Settings/>}/>
        //                 <Route path={"/login"} render={() => <Login/>}/>
        //                 <Route exact path={'/'}><Redirect to={redirectTo}/></Route>
        //                 {/*<Redirect from={"/"} to={"profile"}/>*/}
        //                 <Route path={'*'} render={() => <NotFoundPage/>}/>
        //             </Switch>
        //         </Suspense>
        //     </div>
        // </div>
        <Layout>
            <AppHeader/>
            <Content style={{padding: '0 50px'}}>
                <ReactTypingEffect text={['Hash society ', 'Society for developers']}/>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <Sider className="site-layout-background" width={175}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%',}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="Main">
                                <Menu.Item key="1"><Link to={'/profile'}>Profile</Link></Menu.Item>
                                <Menu.Item key="2"><Link to={'/messages'}>Messages</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                <Menu.Item key="5"><Link to={'/users'}>Users</Link></Menu.Item>
                                <Menu.Item key="6"><Link to={'/friends'}>Friends</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Others">
                                <Menu.Item key="10"><Link to={'/news'}>News</Link></Menu.Item>
                                <Menu.Item key="9"><Link to={'/settings'}>Experimental</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Suspense fallback={<MiniPreloader/>}>
                            <Switch>
                                <Route path={"/profile/:userID?"} render={() => <ProfilePage/>}/>
                                <Route path={"/friends"} render={() => <FriendsPage/>}/>
                                <Route path={"/users"} render={() => <UsersPage/>}/>
                                <Route path={"/messages"} render={() => <DialogsPage/>}/>
                                <Route path={"/settings"} render={() => <Settings/>}/>
                                <Route path={"/login"} render={() => <Login/>}/>
                                <Route exact path={'/'}><Redirect to={redirectTo}/></Route>
                                {/*<Redirect from={"/"} to={"profile"}/>*/}
                                <Route path={'*'} render={() => <NotFoundPage/>}/>
                            </Switch>
                        </Suspense>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Footer</Footer>
            <Modal
                title={'Error...'}
                centered
                visible={!!errors.error.length}
                onOk={() => dispatch(clearErrors())}
                onCancel={() => dispatch(clearErrors())}
            >{errors.error.map(e => <p>{e}</p>)}</Modal>
        </Layout>
    )
}

export default App;
