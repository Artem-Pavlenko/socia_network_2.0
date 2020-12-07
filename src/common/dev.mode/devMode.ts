
export const DEV_MODE = true

export function renderLog (whatRender: string) {
    DEV_MODE && console.log(whatRender)
}