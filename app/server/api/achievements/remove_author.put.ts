import { defineEventHandler } from 'h3'
import { Achievement } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const { achievementId, userId } = getQuery(event)

  if (!achievementId || !userId) {
    return {
      statusCode: 400,
      code: 'ERROR',
      message: 'Both achievementId and userId are required query parameters.'
    }
  }

  try {
    console.log(`*** PUT /api/achievements/remove_author?${achievementId}?userId=${userId} ***`)

    // Update the achievement by removing the userId from the users array
    const updatedAchievement = await Achievement.findByIdAndUpdate(achievementId, { $pull: { users: userId } }, { new: true })

    console.log('Updated achievement:', updatedAchievement, '\n')

    return updatedAchievement
  } catch (err) {
    console.error('Error updating achievement:', err)
    return {
      statusCode: 500,
      code: 'ERROR',
      message: 'Something went wrong while updating the achievement.'
    }
  }
})
