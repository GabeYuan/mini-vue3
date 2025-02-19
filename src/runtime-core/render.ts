import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'
import { createAppAPI } from './createApp'
import { Fragment, Text } from './vnode'

export function createRenderer(options) {
    const {
        createElement: hostCreateElement,
        patchProp: hostPatchProp,
        insert: hostInsert
    } = options

    function render(vnode, container) {
        patch(vnode, container, null)
    }


    function patch(vnode, container, parentComponent) {
        const { type, shapeFlag } = vnode

        switch (type) {
            case Fragment:
                processFragment(vnode, container, parentComponent)
                break
            case Text:
                processText(vnode, container)
                break
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(vnode, container, parentComponent)
                } else if (shapeFlag | ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(vnode, container, parentComponent)
                }
                break
        }

    }

    function processFragment(vnode, container, parentComponent) {
        mountChildren(vnode, container, parentComponent)
    }

    function processText(vnode, container) {
        const { children } = vnode
        const textNode = vnode.el = document.createTextNode(children)
        container.append(textNode)
    }

    function processElement(vnode, container, parentComponent) {
        mountElement(vnode, container, parentComponent)
    }

    function mountElement(vnode, container, parentComponent) {
        const el = (vnode.el = hostCreateElement(vnode.type))
        const { children, shapeFlag } = vnode

        // children
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            el.textContent = children
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(vnode, el, parentComponent)
        }

        //  props
        const { props } = vnode
        for (const key in props) {
            const val = props[key]

            // const isOn = (key: string) => /^on[A-Z]/.test(key)
            // if (isOn(key)) {
            //     const event = key.slice(2).toLowerCase()
            //     el.addEventListener(event, val)
            // } else {
            //     if (typeof val === 'string') {
            //         el.setAttribute(key, val)
            //     } else if (Array.isArray(val)) {
            //         el.setAttribute(key, val.join(' '))
            //     }
            // }

            hostPatchProp(el, key, val)
        }
        // container.appendChild(el)
        hostInsert(el, container)
    }

    function mountChildren(vnode, container, parentComponent) {
        vnode.children.forEach(v => {
            patch(v, container, parentComponent)
        })
    }

    function processComponent(vnode: any, container: any, parentComponent: any) {
        // 挂载
        mountComponent(vnode, container, parentComponent)
    }
    function mountComponent(initialVNode: any, container: any, parentComponent) {
        const instance = createComponentInstance(initialVNode, parentComponent)

        setupComponent(instance)
        setupRenderEffect(instance, initialVNode, container)
    }

    function setupRenderEffect(instance: any, initialVNode, container) {
        const { proxy } = instance
        const subTree = instance.render.call(proxy)

        patch(subTree, container, instance)

        initialVNode.el = subTree.el
    }

    return {
        createApp: createAppAPI(render)
    }

}