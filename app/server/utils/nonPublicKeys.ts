export const keys = ['_id', '__v', 'createdBy', 'createdAt', 'updatedAt', 'password']
export const keysToString = keys.map(key => `-${key}`).join(' ')
export const keysToStringExclude = (...args: string[]) => keys.filter(key => !args.includes(key)).map(key => `-${key}`).join(' ')
