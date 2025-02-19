import { camelize, toHandlerKey } from "../shared"

export function emit(instance, event, ...args) {
    // instance.props ==> event
    const { props } = instance

    // TPP
    // 先去写一个特定的行为，再慢慢重构成通用的行为
    // add -> Add
    // add-foo -> AddFoo

    const handlerName = toHandlerKey(camelize(event))
    const handler = props[handlerName]
    handler && handler(...args)
}