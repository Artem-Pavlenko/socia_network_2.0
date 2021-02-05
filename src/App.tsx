import React, {Suspense, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link, Redirect, Route, Switch, useHistory} from 'react-router-dom'
import './App.css';
import MiniPreloader from "./common/common_component/Preloader/MiniPreloader/MiniPreloader"
import NekoPreloader from "./common/common_component/Preloader/NekoPreloader/NekoPreloader"
import FriendsPage from "./components/Friends/FriendsPage"
import ProfilePage from "./components/Profile/ProfilePage"
import DialogsPage from "./components/Dialogs/Dialogs"
import Experimental from "./components/Experimental/Experimental"
import UsersPage from "./components/Users/UsersPage"
import {initializeApp} from "./store/appReducer"
import Login from "./components/Login/Login"
import {StateType} from "./store/store"

import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons"
import {clearErrors, ErrorRootType} from "./store/ErrorReducer"
import {AppHeader} from "./components/Header/AppHeader"
import ReactTypingEffect from "react-typing-effect"
import {AuthRootType} from "./store/AuthReducer"
import {Layout, Menu, Modal} from "antd"
import 'antd/dist/antd.css'

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout

// Components that are loaded when needed (lazy-loading)
const NotFoundPage = React.lazy(() => import('./common/common_component/NotFoundPage/NotFoundPage'))
const ChatPage = React.lazy(() => import('./pages/ChatPage/ChatPage'))

const App = () => {

    const initialized = useSelector<StateType, boolean>(state => state.app.initialized)
    const {isAuth} = useSelector<StateType, AuthRootType>(state => state.auth)
    const errors = useSelector<StateType, ErrorRootType>(state => state.error)
    const dispatch = useDispatch()
    const pathName = useHistory().location.pathname.substr(1)

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
        <Layout style={{minHeight: '100vh'}}>
            <AppHeader/>
            <Content style={{padding: '0 50px'}}>
                <ReactTypingEffect text={['Hash society ', 'Society for developers']}/>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <Sider className="site-layout-background" width={175}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[pathName.toString()]}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%',}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="Main">
                                <Menu.Item key="profile"><Link to={'/profile'}>Profile</Link></Menu.Item>
                                <Menu.Item key="messages"><Link to={'/messages'}>Messages</Link></Menu.Item>
                                <Menu.Item key="chat"><Link to={'/chat'}>Chat</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                <Menu.Item key="users"><Link to={'/users'}>Users</Link></Menu.Item>
                                <Menu.Item key="friends"><Link to={'/friends'}>Friends</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Others">
                                <Menu.Item key="news"><Link to={'/news'}>News</Link></Menu.Item>
                                <Menu.Item key="settings"><Link to={'/experimental'}>Experimental</Link></Menu.Item>
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
                                <Route path={"/experimental"} render={() => <Experimental/>}/>
                                <Route path={"/login"} render={() => <Login/>}/>
                                <Route path={"/chat"} render={() => <ChatPage/>}/>
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
