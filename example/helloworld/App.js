import { h } from '../../lib/i-mini-vue.esm.js'
export const App = {
    render() {
        // ui
        return h(
            'div',
            {
                id: 'root',
                class: ['red', 'hard'],
            },
            // 'helle ' + this.msg
            [h('p', { class: 'red' }, '你好， mini-vue'), h('p', { class: 'blue' }, 'hello mini-vue')]
        )
    },
    setup() {
        return {
            msg: 'mini-vue',
        }
    },
}
