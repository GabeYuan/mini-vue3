import { mutableHandlers, readonlyHandlers } from './baseHandlers'

export const enum ReactiveFlags {
    isReactive = '__v_isReactive',
    isReadOnly = '__v_isReadOnly',
}

export const reactive = raw => {
    return createReactiveObject(raw, mutableHandlers)
}

export const readonly = raw => {
    return createReactiveObject(raw, readonlyHandlers)
}

export const isReactive = value => {
    return !!value[ReactiveFlags.isReactive]
}

export const isReadOnly = value => {
    return !!value[ReactiveFlags.isReadOnly]
}

function createReactiveObject(raw, handlers) {
    return new Proxy(raw, handlers)
}
