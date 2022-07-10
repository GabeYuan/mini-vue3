import { isReadOnly, shallowReadonly } from '../reactive'

describe('shallowReadonly', () => {
    test('should not make non-reactive properties reactive', () => {
        const original = { n: { foo: 1 } }
        const props = shallowReadonly(original)
        expect(isReadOnly(props)).toBe(true)
        expect(isReadOnly(props.n)).toBe(false)
    })

    it('warn then call set', () => {
        // console.warn();
        console.warn = jest.fn()

        const user = shallowReadonly({
            age: 10,
        })
        user.age = 11
        expect(console.warn).toHaveBeenCalled()
    })
})
