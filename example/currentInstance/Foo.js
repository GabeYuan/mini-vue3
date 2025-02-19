import { getCurrentInstance, h } from '../../lib/i-mini-vue.esm.js'

export const Foo = {
    name: 'Foo',
    setup () {
        const instance = getCurrentInstance()
        console.log(instance)
        return {}
    },
    render () {
       return h('div', {}, "foo")
    }
}
