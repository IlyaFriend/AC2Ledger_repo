import { defineEventHandler } from 'h3'
import { Achievement } from '../../dbModels'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  console.log(`*** GET /api/achievements/${id} ***`)

  try {
    const fetchedAchievement = await Achievement.findById(id)
    console.log('fetched achivement:', fetchedAchievement, '\n')
    return fetchedAchievement
  } catch (err) {
    console.dir(err)
    event.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'Something wrong.'
    }
  }
})
