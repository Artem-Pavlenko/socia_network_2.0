import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import UsersContainer from "./UsersContainer";
import {setLeavingUsersPage} from "../../store/UsersReducer";


const UsersPage = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(setLeavingUsersPage())
        }
    },[dispatch])

    return <UsersContainer/>
}

export default UsersPage