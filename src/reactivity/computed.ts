import { ReactiveEffect } from './effect'

class ComputedRefImpl {
    private _getter: any
    private dirty: any = true
    private _value: any
    private _effect: ReactiveEffect

    constructor(getter) {
        this._getter = getter
        this._effect = new ReactiveEffect(this._getter, () => {
            this.dirty = true
        })
    }

    get value() {
        if (this.dirty) {
            this.dirty = false
            this._value = this._effect.run()
        }
        return this._value
    }
}

export const computed = getter => {
    return new ComputedRefImpl(getter)
    // TODO: fsdfas
}
