
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

let ws: WebSocket | null = null

const reconnect = () => {
    setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    debugger
    subscribers.forEach(s => s(newMessages))
}

function createChanel() {
    // в случае если есть сокет(ws !== null) и делаем реконект нужно подчистить слушателей, которые на закрытие
    // канала 'close' делают реконект, то есть рекурсивно вызывает fn createChanel();
    ws?.removeEventListener('close', reconnect)
    ws?.removeEventListener('message', messageHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', reconnect)
    ws.addEventListener('message', messageHandler)
}

type SubscriberType = (messages: ChatMessageType[]) => void
let subscribers: SubscriberType[] = []


export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', reconnect)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: (messages: ChatMessageType[]) => void) {
        subscribers.push(callback)
        // return unSubscribe
        // return () => {
        //     subscribers.filter(s => s !== callback)
        // }
    },
    unSubscribe(callback: (messages: ChatMessageType[]) => void) {
        subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}