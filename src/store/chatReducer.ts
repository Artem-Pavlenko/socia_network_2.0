import {chatAPI, ChatMessageType} from "../api/chatAPI";
import {Dispatch} from "redux";

type ChatType = {
    messages: ChatMessageType[]
}
type ActionType = ReturnType<typeof setMessages> | ReturnType<typeof clearAllMessages>

const initializeState = {
    messages: [] as ChatMessageType[]
}

export const chatReducer = (state = initializeState, action: ActionType): ChatType => {
    switch (action.type) {
        case "chat/SET_MESSAGES":
            return {...state, messages: [...state.messages, ...action.payload.mess]}
        case "chat/CLEAR_ALL_MESSAGES":
            return {...state, messages: []}
        default:
            return state
    }
}


export const setMessages = (mess: ChatMessageType[]) => ({type: 'chat/SET_MESSAGES', payload: {mess}} as const)
export const clearAllMessages = () => ({type: 'chat/CLEAR_ALL_MESSAGES'} as const)

// _memoMessagesHandler - мемоизация через замыкание
// хоть и будем передвать идну и ту же fn в санки(подписка/одписка), но результат вызова функции будет всегда разным
let _memoMessagesHandler: ((messages: ChatMessageType[]) => void) | null  = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_memoMessagesHandler === null) {
        _memoMessagesHandler = (messages) => {
            dispatch(setMessages(messages))
        }
    }
    return _memoMessagesHandler
}

export const startMessagesListening = () => (dispatch: Dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch))
}

export const stopMessagesListening = () => (dispatch: Dispatch) => {
    chatAPI.stop()
    chatAPI.unSubscribe(newMessagesHandlerCreator(dispatch))
}

export const sendMessage = (message: string) => (dispatch: Dispatch) => {
    chatAPI.sendMessage(message)
}