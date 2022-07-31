import { h } from '../../lib/i-mini-vue.esm.js'
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
            'helle, ' + this.msg
            // [h('p', { class: 'red' }, '你好， mini-vue'), h('p', { class: 'blue' }, 'hello mini-vue')]
        )
    },
    setup() {
        return {
            msg: 'mini-vue,duduud',
        }
    },
}
