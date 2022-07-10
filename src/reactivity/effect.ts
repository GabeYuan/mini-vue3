import { extend } from '../shared'

class ReactiveEffect {
    private _fn: any
    active = true
    deps = []
    onStop?: () => void
    constructor(fn, public scheduler?) {
        this._fn = fn
    }
    run() {
        activeEffect = this
        return this._fn()
    }
    stop() {
        if (this.active) {
            clearupEffect(this)
            this.onStop && this.onStop()
            this.active = false
        }
    }
}

const clearupEffect = effect => {
    effect.deps.forEach((dep: any) => {
        dep.delete(effect)
    })
}

let activeEffect

const targetMap = new Map()

// 依赖收集器
export const track = (target, key) => {
    // target -> keys -> deps
    if (!targetMap.get(target)) {
        targetMap.set(target, new Map())
    }
    const depsMap = targetMap.get(target)

    if (!depsMap.get(key)) {
        depsMap.set(key, new Set())
    }
    const deps = depsMap.get(key)

    if (!activeEffect) return

    deps.add(activeEffect)
    activeEffect.deps.push(deps)
}

// 依赖触发器
export const trigger = (target, key) => {
    const depsMap = targetMap.get(target)
    const deps = depsMap.get(key)
    for (const effect of deps) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}

export const effect = (fn, options: any = {}) => {
    const scheduler = options.scheduler
    const _effect = new ReactiveEffect(fn, scheduler)
    // extend
    extend(_effect, options)
    _effect.run()

    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect

    return runner
}

export const stop = runner => {
    runner.effect.stop()
}
