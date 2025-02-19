import { h, renderSlots } from '../../lib/i-mini-vue.esm.js'

export const Foo = {
    setup () {
        return {}
    },
    render () {
        const foo = h('p', {}, "foo:")
        console.log(this.$slots);

        // renderSlots

        const age = 100
        return h('div', {}, [
            renderSlots(this.$slots, "header", { age }),
            foo,
            renderSlots(this.$slots, "footer")
        ])
    }
}
