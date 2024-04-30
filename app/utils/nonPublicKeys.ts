export const keys = ['_id', '__v', 'createdBy', 'createdAt', 'updatedAt', 'password']
export const keysToStringExclude = (...args: string[]) => keys.filter(key => !args.includes(key)).map(key => `-${key}`).join(' ')
