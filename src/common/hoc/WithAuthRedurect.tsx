import React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {StateType} from "../../store/store";


export const WithAuthRedirect = <P extends object>(Component: React.ComponentType<P>) => {
    debugger

    const ContainerComponent = (props: P) => {
        const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)
        return (
            <div>
                {!isAuth && <Redirect to={'/login'}/>}
                <Component {...props}/>
            </div>
        )
    }

    return ContainerComponent;
}
