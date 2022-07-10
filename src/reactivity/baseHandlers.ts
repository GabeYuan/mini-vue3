import { isObject } from '../shared'
import { track, trigger } from './effect'
import { reactive, ReactiveFlags, readonly } from './reactive'

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadOnly = false) {
    return function get(target, key) {
        if (key === ReactiveFlags.isReactive) {
            return !isReadOnly
        } else if (key === ReactiveFlags.isReadOnly) {
            return isReadOnly
        }
        const res = Reflect.get(target, key)
        if (isObject(res)) {
            return isReadOnly ? readonly(res) : reactive(res)
        }

        if (!isReadOnly) {
            // TODO 依赖收集
            track(target, key)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value)

        // TODO 触发依赖
        trigger(target, key)
        return res
    }
}

export const mutableHandlers = {
    get,
    set,
}

export const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        console.warn(`Set operation on key "${key}" failed: target is readonly.`)
        return true
    },
}
