import { effect } from '../reactivity'
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
        patch(null, vnode, container, null)
    }

    // n1 --> 老的
    // n2 --> 新的
    function patch(n1, n2, container, parentComponent) {
        const { type, shapeFlag } = n2

        switch (type) {
            case Fragment:
                processFragment(n1, n2, container, parentComponent)
                break
            case Text:
                processText(n1, n2, container)
                break
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(n1, n2, container, parentComponent)
                } else if (shapeFlag | ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(n1, n2, container, parentComponent)
                }
                break
        }

    }

    function processFragment(n1, n2, container, parentComponent) {
        mountChildren(n2, container, parentComponent)
    }

    function processText(n1, n2, container) {
        const { children } = n2
        const textNode = n2.el = document.createTextNode(children)
        container.append(textNode)
    }

    function processElement(n1, n2, container, parentComponent) {
        if (!n1) {
            mountElement(n2, container, parentComponent)
        } else {
            patchElement(n1, n2, container)
        }
    }

    function patchElement(n1, n2, container) {
        console.log("patchElement");
        console.log("n1", n1);
        console.log("n2", n2);
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
            patch(null, v, container, parentComponent)
        })
    }

    function processComponent(n1, n2: any, container: any, parentComponent: any) {
        // 挂载
        mountComponent(n2, container, parentComponent)
    }
    function mountComponent(initialVNode: any, container: any, parentComponent) {
        const instance = createComponentInstance(initialVNode, parentComponent)

        setupComponent(instance)
        setupRenderEffect(instance, initialVNode, container)
    }

    function setupRenderEffect(instance: any, initialVNode, container) {
        effect(() => {

            if (!instance.isMounted) {
                console.log('init');

                const { proxy } = instance
                const subTree = instance.subTree = instance.render.call(proxy)
                console.log(subTree);

                patch(null, subTree, container, instance)

                initialVNode.el = subTree.el

                instance.isMounted = true
            } else {
                console.log('update');

                const { proxy } = instance
                const subTree = instance.render.call(proxy)
                const prevSubTree = instance.subTree
                instance.subTree = subTree

                patch(prevSubTree, subTree, container, instance)
            }

        })

    }

    return {
        createApp: createAppAPI(render)
    }

}