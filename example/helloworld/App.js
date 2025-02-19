import { h } from '../../lib/i-mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
    name: 'App',
    render () {
        return h('div', { class: 'red' }, [
            h('p', {}, 'currentInstance demo'),
            h(Foo)
        ])
    },
    setup () {
    },
}
