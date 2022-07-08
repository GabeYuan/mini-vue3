class ReactiveEffect {
    private _fn: any
    constructor(fn, public scheduler?) {
        this._fn = fn
    }
    run() {
        activeEffect = this
        return this._fn()
    }
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
    deps.add(activeEffect)
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
    _effect.run()
    return _effect.run.bind(_effect)
}
