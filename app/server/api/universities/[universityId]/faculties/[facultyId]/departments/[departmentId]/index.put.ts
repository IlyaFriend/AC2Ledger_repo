import { defineEventHandler, readBody, createError } from 'h3'
import { Department } from '~/server/dbModels'
import { isInAdministration } from '~/server/utils/checkAdministration';

interface IRequestBody {
  data: any;
}

export default defineEventHandler(async (event) => {
  const { universityId, facultyId, departmentId } = event.context.params
  const { data } = await readBody<IRequestBody>(event)
  const user = event.context.user

  console.log(`*** PUT /api/departments/${departmentId} ***`)

  try {
    // Check if the current user is included in the users of the department
    if (user && !isInAdministration(user.id, universityId, facultyId, departmentId)) {
      throw createError({ statusCode: 403, statusMessage: 'You do not have permission to update this department.' })
    }

    const updatedDepartment = await Department.findByIdAndUpdate(departmentId, data, { new: true })
    console.log('Updated department:', updatedDepartment)
    return updatedDepartment
  } catch (error) {
    console.error('Error updating department:', error)
    throw error
  }
})
