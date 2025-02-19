import { h } from '../../lib/i-mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
    render() {
    //   emit
        return h("div", {}, [h('div', {},"App"), h(Foo, { 
            // on+Event
            onAdd(a, b) {
                console.log('onAdd', a, b)
            },
            // add-foo --> addFoo
            onAddFoo(){
                console.log('onAddFoo')
            }
         })])
    },
    setup() {
        return {
            msg: 'mini-vue,duduud',
        }
    },
}
