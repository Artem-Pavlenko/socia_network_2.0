import axios from "axios"
import {ProfileType} from "../store/ProfileReducer";

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
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get<UsersResponse>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    getFriends: (currentPage: number, pageSize: number) => {
        return instance.get<UsersResponse>(`users?page=${currentPage}&count=${pageSize}&friend=true`)
            .then(res => res.data)
    }
}


type LogResponseType<d = {}> = {
    resultCode: number
    messages: string[]
    data: d
}

export const authAPI = {
    authMe: () => {
        return instance.get<LogResponseType<{ id: number, email: string, login: string }>>('auth/me')
            .then(res => res.data)
    },
    login: (email: string, password: string, rememberMe: boolean = false, captcha?: string) => {
        return instance.post<LogResponseType<{ userId: number }>>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout: () => {
        return instance.delete<LogResponseType>('auth/login')
            .then(res => res.data)
    }
}

export const followingAPI = {
    // Is current user follower for requested user
    isFollowed: (userID: number) => {
        return instance.get<boolean>(`follow/${userID}`)
            .then(res => res.data)
    },
    follow: (userID: number) => {
        return instance.post<LogResponseType>(`follow/${userID}`)
            .then(res => res.data)
    },

    unfollow: (userID: number) => {
        return instance.delete<LogResponseType>(`follow/${userID}`)
            .then(res => res.data)
    }
}

export const profileAPI = {
    getProfile: (userID: number) => {
        return instance.get<ProfileType>(`profile/${userID}`)
            .then(res => res.data)
    },
    getStatus: (userID: number) => {
        return instance.get<string | null>(`profile/status/${userID}`)
            .then(res => res.data)
    },
    updStatus: (status: string) => {
        return instance.put<LogResponseType>('profile/status', {status})
            .then(res => res.data)
    },
    updPhoto: (photo: string | Blob) => {
        // формируем объект formData
        const formData = new FormData()
        // далие добавляем 'image' (так в сервере указано в request) и саму фото
        formData.append('image', photo)
        return instance.put<LogResponseType<{photos: {small: string, large: string} }>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data)
    }
}

export const securityAPI = {
    getCaptcha: () => {
        return instance.get<{ url: string }>('security/get-captcha-url')
            .then(res => res.data)
    }
}
