import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link, useHistory} from 'react-router-dom'
import './App.css';
import NekoPreloader from "./common/common_component/Preloader/NekoPreloader/NekoPreloader"
import {initializeApp} from "./store/appReducer"
import {StateType} from "./store/store"

import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons"
import {clearErrors, ErrorRootType} from "./store/ErrorReducer"
import {AppHeader} from "./components/Header/AppHeader"
import ReactTypingEffect from "react-typing-effect"
import {Layout, Menu, Modal} from "antd"
import 'antd/dist/antd.css'
import AppRoutes from "./routes/AppRoutes";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout


const App = () => {

    const initialized = useSelector<StateType, boolean>(state => state.app.initialized)
    const errors = useSelector<StateType, ErrorRootType>(state => state.error)
    const dispatch = useDispatch()
    const pathName = useHistory().location.pathname.substr(1)

    useEffect(() => {
        dispatch(initializeApp())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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
                <Layout className="site-layout-background" style={{padding: '15px 0'}}>
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
                        <AppRoutes/>
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
