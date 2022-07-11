import { hasChanged, isObject } from '../shared'
import { isTracking, trackEffecs, triggerEffects } from './effect'
import { reactive } from './reactive'

class RefImpl {
    private _value: any
    private deps: any
    private _rawValue: any
    public __v_isRef = true
    constructor(value) {
        this._rawValue = value
        this._value = convert(value)
        this.deps = new Set()
    }

    get value() {
        trackRefValue(this)
        return this._value
    }

    set value(newValue) {
        // 判断一些value是否改变
        if (hasChanged(newValue, this._rawValue)) {
            this._rawValue = newValue
            this._value = convert(newValue)
            triggerEffects(this.deps)
        }
    }
}

function convert(value) {
    return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
    if (isTracking()) {
        trackEffecs(ref.deps)
    }
}

export function isRef(ref) {
    return !!ref['__v_isRef']
}

export function unRef(ref) {
    return isRef(ref) ? ref.value : ref
}

export const ref = value => {
    return new RefImpl(value)
}
