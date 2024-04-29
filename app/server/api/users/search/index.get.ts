import { defineEventHandler, getQuery } from 'h3'
import { User } from '../../../dbModels'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    console.log(`*** GET /api/user/search?${new URLSearchParams(query)} ***`)

    const conditions = { ...query }

    const users = await User.find(conditions).select(keysToStringExclude('_id'))

    console.log('Users found:', users)
    return users
  } catch (error) {
    console.error('Error searching for users:', error)
    event.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'Something went wrong.'
    }
  }
})
