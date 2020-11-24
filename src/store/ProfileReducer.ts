
export type ProfileType = {
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
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName:  string | null
    userId: number
    photos: {
        small:  string | null
        large:  string | null
    }
    status: string | null
}
type ActionTypes =
    ReturnType<typeof setProfile>
    | ReturnType<typeof setStatus>


const initState: ProfileType = {
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
    status: null
}

const ProfileReducer = (state: ProfileType = initState, action: ActionTypes): ProfileType => {
    switch (action.type) {
        case "profile/SET_PROFILE":
            return {...state, ...action.profile}
        case "profile/SET_STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}


export const setProfile = (profile: ProfileType) => ({type: 'profile/SET_PROFILE', profile} as const)
export const setStatus = (status: string | null) => ({type: 'profile/SET_STATUS', status} as const)

export default ProfileReducer