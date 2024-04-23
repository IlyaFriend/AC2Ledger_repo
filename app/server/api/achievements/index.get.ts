import { defineEventHandler, getQuery } from 'h3'
import { Achievement } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const createdBy = query?.createdBy
  const user = query?.user

  try {
    console.log(`*** GET /api/achievements/?createdBy=${createdBy}&user=${user} ***`)

    const filter: any = {}
    if (createdBy) {
      filter.createdBy = createdBy
    }
    if (user) {
      filter.users = { $in: [user] }
    }

    const achievements = await Achievement.find(filter)

    console.log('achievements;', achievements)
    return achievements
  } catch (error) {
    console.error('Error querying achievements:', error)
    throw error
  }
})
