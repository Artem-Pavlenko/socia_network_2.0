
export const DEV_MODE = false

export function renderLog (whatRender: string) {
    DEV_MODE && console.log(whatRender)
}