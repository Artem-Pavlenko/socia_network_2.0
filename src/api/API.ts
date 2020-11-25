import axios from "axios"

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
        facebook: string | null
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null
        github: string | null
        mainLink: string | null
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    userId: number,
    photos: {
        small: string | null,
        large: string | null
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
    getUsers: () => {
        instance.get<UsersResponse>('users')
            .then(res => res.data)
    },
    getProfile: (userID: string) => {
        instance.get<ProfileResponse>(`profile/${userID}`)
            .then(res => res.data)
    },
    getStatus: (userID: string) => {
        instance.get(`profile/status/${userID}`)
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
        instance.get<LogResponseType<{ id: number, email: string, login: string }>>(' auth/me')
            .then(res => res.data)
    },
    login: (email: string, password: string, rememberMe: boolean = false, captcha?: string) => {
        instance.post<LogResponseType<{ userId: number }>>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout: () => {
        instance.delete<LogResponseType>('auth/login')
            .then(res => res.data)
    }
}
