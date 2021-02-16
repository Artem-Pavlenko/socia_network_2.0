export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'
type EventsNamesType = 'message_received' | 'status_changed'
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

let ws: WebSocket | null = null

const reconnect = () => {
    console.log('WS CLOSED')
    notifySubscribersAboutStatusChanging('pending')
    setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['message_received'].forEach(s => s(newMessages))
}

const notifySubscribersAboutStatusChanging = (status: StatusType) => {
    subscribers["status_changed"].forEach(s => s(status))
}

const openHandler = () => {
    notifySubscribersAboutStatusChanging('ready')
}

function errorHandler() {
    notifySubscribersAboutStatusChanging('error')
    console.error('(errorHandler(){...}) Restart page')
}

const cleanUp = () => {
    ws?.removeEventListener('close', reconnect)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}


function createChanel() {
    // в случае если есть сокет(ws !== null) и делаем реконект нужно подчистить слушателей, которые на закрытие
    // канала 'close' делают реконект, то есть рекурсивно вызывает fn createChanel();
    cleanUp()
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatusChanging('pending')
    ws.addEventListener('close', reconnect)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}


let subscribers = {
    'message_received': [] as MessagesReceivedSubscriberType[],
    'status_changed': [] as StatusChangedSubscriberType[]
}


export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers["message_received"] = []
        subscribers["status_changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        if (eventName === 'message_received') {
            subscribers[eventName].push(callback as MessagesReceivedSubscriberType)
        } else if (eventName === 'status_changed') {
            subscribers[eventName].push(callback as StatusChangedSubscriberType)
        }

        // return unSubscribe
        // return () => {
        //     subscribers.filter(s => s !== callback)
        // }
    },
    unSubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        if (eventName === 'message_received') {
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        } else if (eventName === 'status_changed') {
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }

    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}