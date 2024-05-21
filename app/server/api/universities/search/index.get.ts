import { defineEventHandler, getQuery } from 'h3'
import { University } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    console.log(`*** GET /api/university/search?${new URLSearchParams(query)} ***`)

    const conditions = {}
    for (const [key, value] of Object.entries(query)) {
      conditions[key] = new RegExp(`^${value}`, 'i')
    }

    const universities = await University.find(conditions).select(keysToStringExclude('_id')).limit(50)

    console.log('Universities found:', universities)
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
