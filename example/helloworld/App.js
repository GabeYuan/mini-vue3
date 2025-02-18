import { h } from '../../lib/i-mini-vue.esm.js'
import { Foo } from './Foo.js'
window.self = null
export const App = {
    render() {
        window.self = this
        // ui
        return h(
            'div',
            {
                id: 'root',
                class: ['red', 'hard'],
                onClick() {
                    console.log('click')
                },
                onMouseDown() {
                    console.log('mouseDown')
                },
            },
            [
                h('div', {}, 'hi,'+this.msg),
                h(Foo, {count: 1}),
            ]
            // [h('p', { class: 'red' }, '你好， mini-vue'), h('p', { class: 'blue' }, 'hello mini-vue')]
        )
    },
    setup() {
        return {
            msg: 'mini-vue,duduud',
        }
    },
}
