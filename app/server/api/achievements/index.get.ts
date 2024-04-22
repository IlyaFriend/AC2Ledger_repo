import { defineEventHandler, getQuery } from 'h3'
import { Achievement } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const createdBy = query?.createdBy

  try {
    console.log(`*** GET /api/achievements/?createdBy=${createdBy} ***`)
    const achievements = await Achievement.find({ createdBy })

    console.log('achievements;', achievements)
    return achievements
  } catch (error) {
    console.error('Error querying achievements:', error)
    throw error
  }
})
