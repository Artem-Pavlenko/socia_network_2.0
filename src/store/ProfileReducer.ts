import {Dispatch} from "redux";
import {profileAPI} from "../api/API";


type ActionTypes =
    ReturnType<typeof setProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setProfileFetch>
    | ReturnType<typeof leavingProfilePage>


export type ProfileType = {
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
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: {
        small: string | null
        large: string | null
    }
}
export type ProfileRootType =
    ProfileType & {
    status: string | null
    profileFetching: boolean
}

const initState: ProfileRootType = {
    aboutMe: null,
    contacts: {
        facebook: null,
        website: null,
        vk: null,
        twitter: null,
        instagram: null,
        youtube: null,
        github: null,
        mainLink: null
    },
    lookingForAJob: false,
    lookingForAJobDescription: null,
    fullName: null,
    userId: 1,
    photos: {
        small: null,
        large: null
    },
    status: null,
    profileFetching: false
}

const ProfileReducer = (state: ProfileRootType = initState, action: ActionTypes): ProfileRootType => {
    switch (action.type) {
        case "profile/SET_PROFILE":
            return {...state, ...action.profile}
        case "profile/SET_STATUS":
            return {...state, status: action.status}
        case "profile/SET_PROFILE_FETCH":
            return {...state, profileFetching: action.isFetch}
        case "profile/LEAVING_PROFILE_PAGE":
            return {
                ...state,
                fullName: '',
                photos: {...state.photos, large: '', small: ''},
                aboutMe: '',
                status: '',
                userId: 1,
                lookingForAJobDescription: '',
                profileFetching: true
            }
        default:
            return state
    }
}


export const setProfile = (profile: ProfileType) => ({type: 'profile/SET_PROFILE', profile} as const)
export const setStatus = (status: string | null) => ({type: 'profile/SET_STATUS', status} as const)
export const setProfileFetch = (isFetch: boolean) => ({type: 'profile/SET_PROFILE_FETCH', isFetch} as const)
export const leavingProfilePage = () => ({type: 'profile/LEAVING_PROFILE_PAGE'} as const)


export const getProfile = (userID: string) => (dispatch: Dispatch) => {
    dispatch(setProfileFetch(true))
    let profile = profileAPI.getProfile(userID)
    let status = profileAPI.getStatus(userID)
    Promise.all([profile, status])
        .then(res => {
            dispatch(setProfile(res[0]))
            res[1] && dispatch(setStatus(res[1]))
            dispatch(setProfileFetch(false))
        })
}

export const changeStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.changeStatus(status)
        .then(res => {
            if (res.resultCode === 0) {
                // dispatch(setStatus(res.data))
            }
        })
}

export default ProfileReducer