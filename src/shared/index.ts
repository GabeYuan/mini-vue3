export const extend = Object.assign

export const isObject = value => {
    return value !== null && typeof value === 'object'
}

export const hasChanged = (value: any, oldValue: any) => {
    return !Object.is(value, oldValue)
}

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)

