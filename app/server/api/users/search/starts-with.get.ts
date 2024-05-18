import { defineEventHandler, getQuery } from 'h3'
import { User } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  console.log('query', query, new URLSearchParams(query))

  try {
    console.log(`*** GET /api/user/search/starts-with?${new URLSearchParams(query)} ***`)

    // Construct conditions based on query parameters with regex for "starts with" match
    const conditions = {}
    for (const [key, value] of Object.entries(query)) {
      conditions[key] = new RegExp(`^${value}`, 'i')
    }

    const users = await User.find(conditions).select(keysToStringExclude('_id')).limit(50)

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
