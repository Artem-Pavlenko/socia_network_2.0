import {chatAPI, ChatMessageAPIType, StatusType} from '../api/chatAPI'
import {Dispatch} from 'redux'
import {v1} from 'uuid'

export type ChatMessagesType = ChatMessageAPIType & { id: string }
export type ChatType = {
    messages: ChatMessagesType[],
    status: StatusType
}
type ActionType = ReturnType<typeof setMessages>
    | ReturnType<typeof clearAllMessages>
    | ReturnType<typeof changeStatus>

const initializeState: ChatType = {
    messages: [],
    status: 'pending'
}

export const chatReducer = (state = initializeState, action: ActionType): ChatType => {
    switch (action.type) {
        case "chat/SET_MESSAGES":
            // фильтруем сообщения (filter()). оставляем только последние 100
            return {
                ...state,
                messages: [...state.messages, ...action.payload.mess.map(m => ({...m, id: v1()}))]
                    .filter((m, i, arr) =>
                        i >= arr.length - 100)
            }
        case "chat/CLEAR_ALL_MESSAGES":
            return {...state, messages: []}
        case "chat/CHANGE_STATUS":
            return {...state, status: action.payload.status}
        default:
            return state
    }
}


export const setMessages = (mess: ChatMessageAPIType[]) => ({type: 'chat/SET_MESSAGES', payload: {mess}} as const)
export const clearAllMessages = () => ({type: 'chat/CLEAR_ALL_MESSAGES'} as const)
export const changeStatus = (status: StatusType) => ({type: 'chat/CHANGE_STATUS', payload: {status}} as const)

// _memoMessagesHandler - мемоизация через замыкание
// хоть и будем передвать идну и ту же fn в санки(подписка/одписка), но результат вызова функции будет всегда разным
let _memoMessagesHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_memoMessagesHandler === null) {
        _memoMessagesHandler = (messages) => {
            dispatch(setMessages(messages))
        }
    }
    return _memoMessagesHandler
}

let _memoStatusHandler: ((status: StatusType) => void) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_memoStatusHandler === null) {
        _memoStatusHandler = (status) => {
            dispatch(changeStatus(status))
        }
    }
    return _memoStatusHandler
}

export const startMessagesListening = () => (dispatch: Dispatch) => {
    chatAPI.start()
    chatAPI.subscribe("message_received", newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe("status_changed", newStatusHandlerCreator(dispatch))
}

export const stopMessagesListening = () => (dispatch: Dispatch) => {
    chatAPI.stop()
    chatAPI.unSubscribe("message_received", newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe("status_changed", newStatusHandlerCreator(dispatch))
}

export const sendMessage = (message: string) => (dispatch: Dispatch) => {
    chatAPI.sendMessage(message)
}