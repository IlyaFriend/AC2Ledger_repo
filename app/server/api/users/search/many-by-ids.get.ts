import { defineEventHandler, getQuery } from 'h3'
import { User } from '../../../dbModels'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    console.log(`*** GET /api/user/search/many-by-ids?${new URLSearchParams(query)} ***`)

    const idsParam = query.ids
    const ids = JSON.parse(idsParam)

    if (!ids || !Array.isArray(ids)) {
      throw new Error('Invalid user IDs provided')
    }

    const users = await User.find({ _id: { $in: ids } }).select(keysToStringExclude('_id'))

    console.log('Users found by ids:', users)
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
