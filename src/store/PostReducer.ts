import {v1} from "uuid";



const initState = {
    posts: [
        {id: '1', post: 'react', likesCount: 33},
        {id: '2', post: 'Redux', likesCount: 25},
        {id: '3', post: 'Thunk', likesCount: 22},
        {id: '4', post: 'Hooks', likesCount: 19},
        {id: '5', post: 'text text text text text text text text text text text text text text', likesCount: 11},
        {id: '6', post: 'text text text text text text text text text text text text text text', likesCount: 5},
        {id: '7', post: 'text text text text text text text text text text text text text text', likesCount: 1}
    ]
}

type PostReducerType = typeof initState

const PostReducer = (state = initState, action: ActionsType): PostReducerType => {
    switch (action.type) {
        case "ADD_POST":
        return {
            ...state, posts: [{id: v1(), post: action.post, likesCount: 0},...state.posts]
        }
    }
}

export default PostReducer

export const addPost = (post: string) => ({type: 'ADD_POST', post} as const)

type ActionsType = ReturnType<typeof addPost>