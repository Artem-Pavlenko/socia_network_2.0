import axios from "axios"
import {Dispatch} from "redux";
import {setUsersTotalCount, setUsers} from "../store/UsersReducer";

type Response = {
    error: null | string
    items: [{
        followed: boolean
        id: number
        name: string
        photos: {
            small: string | null
            large: string | null
        }
        status: string | null
        uniqueUrlName: string | null
    }]
    totalCount: number
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3e79c344-389c-4379-912f-1ab506d5006c'
    }

}

export const instance = axios.create({
    ...settings,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers: (dispatch: Dispatch) => {
        instance.get<Response>('users').then( res => {
            dispatch(setUsers(res.data.items))
            dispatch(setUsersTotalCount(res.data.totalCount))
        })
    }
}
