import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
    patch(vnode, container)
}

function patch(vnode, container) {
    // 处理组件

    // 判断是不是 elment 处理
    processComponent(vnode, container)
}
function processComponent(vnode: any, container: any) {
    // 挂载
    mountComponent(vnode, container)
}
function mountComponent(vnode: any, container: any) {
    const instance = createComponentInstance(vnode)

    setupComponent(instance)
    setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container) {
    const subTree = instance.render()
    // vnode tree
    // vnode ——>patch
    // vnode ——>element ->mountElement

    patch(subTree, container)
}
