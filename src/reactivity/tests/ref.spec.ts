import { effect } from '../effect'
import { reactive } from '../reactive'
import { isRef, ref, unRef } from '../ref'

describe('ref', () => {
    it('happy path', () => {
        const count = ref(1)
        expect(count.value).toBe(1)
    })

    it('should be effec', () => {
        const a = ref(1)
        let dummy
        let calls = 0
        effect(() => {
            calls++
            dummy = a.value
        })
        expect(calls).toBe(1)
        expect(dummy).toBe(1)

        a.value = 2
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
        a.value = 2
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
    })

    it('赋值相同的对象', () => {
        const a = ref({
            one: 1,
            two: 2,
        })
        let dummy
        let calls = 0
        effect(() => {
            calls++
            dummy = a.value.one
        })
        expect(calls).toBe(1)
        expect(dummy).toBe(1)
        const obj = {
            one: 2,
            two: 2,
        }
        a.value = obj
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
        a.value = obj
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
    })

    it('should make nested properties reactive', () => {
        const a = ref({
            count: 1,
        })
        let dummy
        effect(() => {
            dummy = a.value.count
        })
        expect(dummy).toBe(1)
        a.value.count = 2
        expect(dummy).toBe(2)
    })

    it('isRef', () => {
        const a = ref(1)
        const user = reactive({ name: 'tony' })
        expect(isRef(a)).toBe(true)
        expect(isRef(1)).toBe(false)
        expect(isRef(user)).toBe(false)
    })

    it('unRef', () => {
        const a = ref(1)
        expect(unRef(a)).toBe(1)
        expect(unRef(1)).toBe(1)
    })
})
