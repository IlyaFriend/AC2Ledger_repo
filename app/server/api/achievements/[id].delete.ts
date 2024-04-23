import { defineEventHandler } from 'h3'
import { Achievement } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  try {
    console.log(`*** DELETE /api/achievements/${id} ***`)
    return await Achievement.deleteOne({ _id: id })
  } catch (error) {
    console.error('Error deleting achievements:', error)
    throw error
  }
})
