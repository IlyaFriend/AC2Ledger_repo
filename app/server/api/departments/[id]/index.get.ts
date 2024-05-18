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
    console.log('fetched department:', fetchedDepartment, '\n')
    return fetchedDepartment
  } catch (err) {
    console.log(err)
    throw error
  }
})
