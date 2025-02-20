import { h, ref } from '../../lib/i-mini-vue.esm.js'
export const Child = {
    name: 'Child',
    setup () {

    },
    render (proxy) {
        return h('div', {}, [h('div', {}, 'child - props - msg:' + this.$props.msg)])
    },
}
