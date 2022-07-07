class ReactiveEffect {
    private _fn: any
    constructor(fn) {
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
        effect.run()
    }
}
export const effect = fn => {
    const _effect = new ReactiveEffect(fn)
    _effect.run()
    return _effect.run.bind(_effect)
}
