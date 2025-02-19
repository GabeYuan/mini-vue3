import { getCurrentInstance, h } from '../../lib/i-mini-vue.esm.js'

export const Foo = {
    name: 'Foo',
    setup () {
        return {}
    },
    render () {
        return h('div', { class: 'blue' }, "foo")
    }
}
