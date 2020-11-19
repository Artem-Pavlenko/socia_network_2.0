import {v1} from "uuid";

type MessageReducerType = typeof initState


const initState = {
    users: [
        {id: '1', name: "Artem"},
        {id: '2', name: "Dima"},
        {id: '3', name: "Alex"},
        {id: '4', name: "Yarik"},
        {id: '5', name: "Bob"}
    ],
    message: [
        {id: '1', message: 'React'},
        {id: '2', message: 'Redux'},
        {id: '3', message: 'Hooks'},
        {id: '4', message: 'hoc'}
    ]
}

const MessageReducer = (state:MessageReducerType = initState, action: ActionsType): MessageReducerType => {
    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state, message: [...state.message, {id: v1(), message: action.mess}]
            }
    }
}

export default MessageReducer

export const sendMess = (mess: string) => ({type: 'SEND_MESSAGE', mess} as const)

type ActionsType = ReturnType<typeof sendMess>