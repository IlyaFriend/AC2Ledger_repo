import { defineEventHandler } from 'h3'
import { Department } from '~/server/dbModels'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  console.log(`*** GET /api/departments/${id} ***`)

  try {
    const fetchedDepartment = await Department.findById(id)
      .populate({
        path: 'administration',
        select: keysToStringExclude('_id')
      })
      .populate({
        path: 'teachers',
        select: keysToStringExclude('_id')
      })
    if (!fetchedDepartment) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Department not found'
      })
    }
    fetchedDepartment.score = Number(fetchedDepartment.score)?.toFixed(2)
    return fetchedDepartment
  } catch (err) {
    console.log(err)
    throw error
  }
})
