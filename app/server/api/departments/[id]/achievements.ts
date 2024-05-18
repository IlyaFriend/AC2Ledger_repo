import { defineEventHandler } from 'h3'
import { Achievement } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  try {
    console.log(`*** GET /api/departments/${id}/achievements ***`)

    const achievements = await Achievement.find({ department_id: id })
      .populate({
        path: 'users',
        select: keysToStringExclude('_id')
      })

    return achievements
  } catch (error) {
    console.error('Error querying achievements of a department:', error)
    throw error
  }
})
