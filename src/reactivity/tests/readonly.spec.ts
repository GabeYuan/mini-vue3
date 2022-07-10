import { readonly } from '../reactive'

describe('readonly', () => {
    it('happy path', () => {
        // not set
        const original = { foo: 1 }
        const observed = readonly(original)

        expect(observed).not.toBe(original)
        expect(observed.foo).toBe(1)
    })

    it('warn then call set', () => {
        // console.warn();
        console.warn = jest.fn()

        const user = readonly({
            age: 10,
        })
        user.age = 11

        expect(console.warn).toHaveBeenCalled()
    })
})
