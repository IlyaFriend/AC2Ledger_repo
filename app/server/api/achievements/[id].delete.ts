import { defineEventHandler } from 'h3'
import { Achievement } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const currentUser = event.context.user

  try {
    console.log(`*** DELETE /api/achievements/${id} ***`)

    const achievement = await Achievement.findById(id)

    if (!achievement) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Achievement not found.'
      })
    }

    // Check if the current user is the author of the achievement
    if (currentUser && achievement?.createdBy?.toString() === currentUser.id) {
      const result = await Achievement.deleteOne({ _id: id })
      console.log('Achievement deleted:', result)
      return result
    } else {
      throw createError({
        statusCode: 403,
        statusMessage: 'You do not have permission to delete this achievement.'
      })
    }
  } catch (error) {
    console.error('Error deleting achievement:', error)
    throw error
  }
})
