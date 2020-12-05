import {Dispatch} from "redux";
import {profileAPI, ProfileData, Res} from "../api/API";
import {StateType} from "./store";


type ActionTypes =
    ReturnType<typeof setProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setProfileFetch>
    | ReturnType<typeof leavingProfilePage>
    | ReturnType<typeof setPhoto>
    | ReturnType<typeof setErrorMessages>
    | ReturnType<typeof clearErrors>

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
    messages: string[]
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
    profileFetching: false,
    messages: []
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
        case "profile/SET_PHOTOS":
            return {...state, photos: {...action.photos}}
        case "profile/SET_ERROR_MESSAGES":
            return {...state, messages: action.messages}
        case "profile/CLEAR_ERRORS":
            return {...state, messages: []}
        default:
            return state
    }
}


export const setProfile = (profile: ProfileType) => ({type: 'profile/SET_PROFILE', profile} as const)
export const setStatus = (status: string | null) => ({type: 'profile/SET_STATUS', status} as const)
export const setProfileFetch = (isFetch: boolean) => ({type: 'profile/SET_PROFILE_FETCH', isFetch} as const)
export const leavingProfilePage = () => ({type: 'profile/LEAVING_PROFILE_PAGE'} as const)
export const setPhoto = (photos: { small: string, large: string }) => ({type: 'profile/SET_PHOTOS', photos} as const)
export const setErrorMessages = (messages: string[]) => ({type: 'profile/SET_ERROR_MESSAGES', messages} as const)
export const clearErrors = () => ({type: 'profile/CLEAR_ERRORS'} as const)


export const getProfile = (userID: number) => (dispatch: Dispatch) => {
    dispatch(setProfileFetch(true))
    let profile = profileAPI.getProfile(userID)
    let status = profileAPI.getStatus(userID)
    Promise.all([profile, status])
        .then(res => {
            dispatch(setProfile(res[0]))
            dispatch(setStatus(res[1]))
            dispatch(setProfileFetch(false))
        })
}

export const updStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updStatus(status)
        .then(res => {
            if (res.resultCode === Res.Success) {
                dispatch(setStatus(status))
            }
        })
        .catch(e => {
            console.log('change status error :', e.message)
        })
}

export const updPhoto = (photo: string | Blob) => (dispatch: Dispatch) => {
    profileAPI.updPhoto(photo)
        .then(res => {
            if (res.resultCode === Res.Success) {
                dispatch(setPhoto(res.data.photos))

            }
        })
}

export const updProfile = (profileData: ProfileData) => (dispatch: Dispatch, getState: () => StateType) => {
    profileAPI.updProfile(profileData)
        .then(res => {
            if (res.resultCode === Res.Success){
                dispatch<any>(getProfile(getState().profile.userId))
            } else if (res.resultCode !== Res.Success) {
                dispatch(setErrorMessages(res.messages))
                // res.messages.map(mess => {
                //    if (mess.toLowerCase().indexOf('Vk')) {
                //
                //    }
                // })
            }
        })
}

export default ProfileReducer