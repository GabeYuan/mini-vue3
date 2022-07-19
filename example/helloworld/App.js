import { h } from '../../lib/i-mini-vue.esm.js'
export const App = {
    render() {
        // ui
        return h('div', 'helle ' + this.msg)
    },
    setup() {
        return {
            msg: 'mini-vue',
        }
    },
}
