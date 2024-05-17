import { defineEventHandler, getQuery } from 'h3'
import { University } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    console.log(`*** GET /api/universities/search/many-by-ids?${new URLSearchParams(query)} ***`)

    const idsParam = query.ids
    const ids = JSON.parse(idsParam)

    if (!ids || !Array.isArray(ids)) {
      throw new Error('Invalid university IDs provided')
    }

    const universities = await University.find({ _id: { $in: ids } }).select(keysToStringExclude('_id'))

    console.log('Universities found by ids:', universities)
    return universities
  } catch (error) {
    console.error('Error searching for universities:', error)
    event.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'Something went wrong.'
    }
  }
})
