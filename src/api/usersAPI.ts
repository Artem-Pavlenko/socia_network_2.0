import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }

}

const instance = axios.create({
    ...settings,
    baseURL: "",

})

export const usersAPI = {
    getUsers: () => {
        instance.get('users')
    }
}
