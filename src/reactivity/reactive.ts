import { isObject } from '../shared/index'
import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from './baseHandlers'

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

export const shallowReadonly = raw => {
    return createReactiveObject(raw, shallowReadonlyHandlers)
}

export const isReactive = value => {
    return !!value[ReactiveFlags.isReactive]
}

export const isReadOnly = value => {
    return !!value[ReactiveFlags.isReadOnly]
}

export const isProxy = value => {
    return isReactive(value) || isReadOnly(value)
}

function createReactiveObject(target, handlers) {
    if(!isObject(target)){
        console.warn(`target ${target} 必须是一个对象`);
        return target
    }
    return new Proxy(target, handlers)
}
