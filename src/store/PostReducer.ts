import {v1} from "uuid";

export type PostType = typeof initState.posts
export type PostReducerType = typeof initState
type ActionsTypes = ReturnType<typeof addPost>

const initState = {
    posts: [
        {id: '1', post: 'react', likesCount: 33},
        {id: '2', post: 'Redux', likesCount: 25},
        {id: '3', post: 'Thunk', likesCount: 22},
        {id: '4', post: 'Hooks', likesCount: 19},
    ]
}


const PostReducer = (state:PostReducerType = initState, action: ActionsTypes): PostReducerType => {
    switch (action.type) {
        case "ADD_POST":
            if (action.post.trim()) {
                return {
                    ...state, posts: [{id: v1(), post: action.post, likesCount: 0}, ...state.posts]
                }
            }
            return state
        default:
            return state
    }
}

export default PostReducer

export const addPost = (post: string) => ({type: 'ADD_POST', post} as const)

