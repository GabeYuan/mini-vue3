import { mutableHandlers, readonlyHandlers } from './baseHandlers'

export const reactive = raw => {
    return createReactiveObject(raw, mutableHandlers)
}

export const readonly = raw => {
    return createReactiveObject(raw, readonlyHandlers)
}

function createReactiveObject(raw, handlers) {
    return new Proxy(raw, handlers)
}
