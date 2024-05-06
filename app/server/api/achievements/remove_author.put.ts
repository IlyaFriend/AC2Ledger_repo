import { defineEventHandler, getQuery, createError } from 'h3'
import { Achievement } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const { achievementId, userId } = getQuery(event)

  if (!achievementId || !userId) {
    throw createError({
      statusCode: 400,
      message: 'Both achievementId and userId are required query parameters.'
    })
  }

  try {
    console.log(`*** PUT /api/achievements/remove_author?${achievementId}?userId=${userId} ***`)

    // Find the achievement and check if the user is an author
    const achievement = await Achievement.findById(achievementId)
    if (!achievement) {
      throw createError({
        statusCode: 404,
        message: 'Achievement not found.'
      })
    }

    if (!achievement?.users?.includes(userId)) {
      throw createError({
        statusCode: 403,
        message: 'You must be an author of the update the achievement.'
      })
    }

    // If the user is an author, remove them from the users array
    const updatedAchievement = await Achievement.findByIdAndUpdate(achievementId, { $pull: { users: userId } }, { new: true })

    console.log('Updated achievement:', updatedAchievement, '\n')
    return updatedAchievement
  } catch (err) {
    console.error('Error updating achievement:', err)
    throw createError({
      statusCode: 500,
      message: 'Something went wrong while updating the achievement.'
    })
  }
})
