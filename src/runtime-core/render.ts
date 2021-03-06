import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
    patch(vnode, container)
}

function patch(vnode, container) {
    // 处理组件
    // 判断是不是 elment 处理
    // 如果是Element调用
    if (typeof vnode.type === 'string') {
        processElement(vnode, container)
    } else {
        processComponent(vnode, container)
    }
}

function processElement(vnode, container) {
    mountElement(vnode, container)
}

function mountElement(vnode, container) {
    const el = (vnode.el = document.createElement(vnode.type))
    const { children, props } = vnode

    if (typeof children === 'string') {
        el.textContent = children
    } else if (Array.isArray(children)) {
        mounteChildren(vnode, el)
    }

    for (const key in props) {
        const val = props[key]
        if (typeof val === 'string') {
            el.setAttribute(key, val)
        } else if (Array.isArray(val)) {
            el.setAttribute(key, val.join(' '))
        }
    }
    container.appendChild(el)
}

function mounteChildren(vnode, container) {
    vnode.children.forEach(v => {
        patch(v, container)
    })
}

function processComponent(vnode: any, container: any) {
    // 挂载
    mountComponent(vnode, container)
}
function mountComponent(initialVNode: any, container: any) {
    const instance = createComponentInstance(initialVNode)

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, initialVNode, container) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)

    patch(subTree, container)

    initialVNode.el = subTree.el
}
