import { defineEventHandler, readBody, createError } from 'h3'
import { Achievement } from '../../dbModels'
import { isInAdministration } from '~/server/utils/checkAdministration'

interface IRequestBody {
  data: any;
}

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const { data } = await readBody<IRequestBody>(event)
  const user = event.context.user

  try {
    console.log(`*** PUT /api/achievements/${id} ***`)

    const achievement = await Achievement.findById(id)

    if (!achievement) {
      throw createError({ statusCode: 404, statusMessage: 'Achievement not found.' })
    }

    const departmentId = achievement.department_id

    // Check if the current user is included in the users of the achievement
    if (user && !achievement?.users?.includes(user.id) && (departmentId ? !await isInAdministration(user.id, undefined, undefined, departmentId) : true)) {
      throw createError({ statusCode: 403, statusMessage: 'You do not have permission to update this achievement.' })
    }

    const updatedAchievement = await Achievement.findByIdAndUpdate(id, data, { new: true })
    console.log('Updated achievement:', updatedAchievement)
    return updatedAchievement
  } catch (error) {
    console.error('Error updating achievement:', error)
    throw error
  }
})
