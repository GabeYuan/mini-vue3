import { isReadOnly, readonly } from '../reactive'

describe('readonly', () => {
    it("should make nested values readonly", () => {
        // not set
        const original = { foo: 1, bar: { baz: 2 } };
        const wrapped = readonly(original)

        expect(wrapped).not.toBe(original)
        expect(isReadOnly(wrapped)).toBe(true)
        expect(isReadOnly(original)).toBe(false)
        expect(isReadOnly(wrapped.bar)).toBe(true)
        expect(isReadOnly(original.bar)).toBe(false)
        expect(wrapped.foo).toBe(1)
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
