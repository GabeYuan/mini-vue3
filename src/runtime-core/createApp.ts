
import { createVNode } from './vnode'

export function createAppAPI(render) {
    return function createApp(rootComponent) {
        return {
            mount(rootContainer) {
                // component -> vnode
                const vnode = createVNode(rootComponent)

                render(vnode, rootContainer)
            },
        }
    }
}
