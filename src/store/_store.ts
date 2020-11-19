import {v1} from "uuid"

type AddPost = ReturnType<typeof _addPost>
type SendMessage = ReturnType<typeof _sendMess>

export type ActionsType = AddPost | SendMessage

export type _StateType = typeof _store._state

export const _store = {
    _state: {
        users: [
            {id: '1', name: "Artem"},
            {id: '2', name: "Dima"},
            {id: '3', name: "Alex"},
            {id: '4', name: "Yarik"},
            {id: '5', name: "Bob"}
        ],
        mess: [
            {id: '1', message: 'React'},
            {id: '2', message: 'Redux'},
            {id: '3', message: 'Hooks'},
            {id: '4', message: 'hoc'}
        ],
        posts: [
            {id: '1', post: 'react', likesCount: 33},
            {id: '2', post: 'Redux', likesCount: 25},
            {id: '3', post: 'Thunk', likesCount: 22},
            {id: '4', post: 'Hooks', likesCount: 19},
            {id: '5', post: 'text text text text text text text text text text text text text text', likesCount: 11},
            {id: '6', post: 'text text text text text text text text text text text text text text', likesCount: 5},
            {id: '7', post: 'text text text text text text text text text text text text text text', likesCount: 1}
        ]
    },
    getState: () => {
        return _store._state
    },
    dispatch: (action: ActionsType) => {
        if (action.type === 'ADD_POST') {
            _store._state.posts.unshift({id: v1(), post: action.post, likesCount: 0})
        } else if (action.type === 'SEND_MESSAGE') {
            _store._state.mess.push({id: v1(), message: action.mess})
        }
    }
}


export const _addPost = (post: string) => ({type: 'ADD_POST', post} as const)
export const _sendMess = (mess: string) => ({type: 'SEND_MESSAGE', mess} as const)

