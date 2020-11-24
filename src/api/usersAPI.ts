import axios from "axios"
import {Dispatch} from "redux";
import {setUsersTotalCount, setUsers} from "../store/UsersReducer";

type UsersResponse = {
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
type ProfileResponse = {
    aboutMe: string | null
    contacts: {
        facebook:  string | null
        website:  string | null
        vk:  string | null
        twitter:  string | null
        instagram:  string | null
        youtube:  string | null
        github:  string | null
        mainLink:  string | null
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName:  string | null,
    userId: number,
    photos: {
        small:  string | null,
        large:  string | null
    }
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
        instance.get<UsersResponse>('users').then( res => res.data)
    },
    getProfile: (userID: number) => {
        instance.get<ProfileResponse>(`profile/${userID}`).then( res => res.data)
    }
}
