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
