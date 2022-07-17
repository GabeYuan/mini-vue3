import { render } from './render'
import { createVNode } from './vnode'

export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // component -> vnode
            const vnode = createVNode(rootComponent)

            render(vnode, rootContainer)
        },
    }
}
