import { defineEventHandler, readBody, createError } from 'h3'
import { Department, User } from '~/server/dbModels'

interface IRequestBody {
  data: any;
}

export default defineEventHandler(async (event) => {
  const { universityId, facultyId, departmentId }  = event.context.params
  const { data: { teachers, action } } = await readBody<IRequestBody>(event)
  const user = event.context.user

  console.log(`*** PUT /api/departments/${departmentId}/update-teachers ***`)
  if (!teachers) {
    throw createError({ statusCode: 400, statusMessage: 'No teachers provided.' })
  }
  if (!action) {
    throw createError({ statusCode: 400, statusMessage: 'No action provided.' })
  }

  try {
    const department = await Department.findById(departmentId)

    if (!department) {
      throw createError({ statusCode: 404, statusMessage: 'Department not found.' })
    }

    // Check if the current user is included in the users of the department
    if (user && !await isInAdministration(user.id, universityId, facultyId, departmentId)) {
      throw createError({ statusCode: 403, statusMessage: 'You do not have permission to update this department.' })
    }

    if (action === 'delete') {
      await Department.findByIdAndUpdate(departmentId, { $pull: { teachers: { $in: teachers } } })
      return true
    } else if (action === 'add') {
      await Department.findByIdAndUpdate(departmentId, { $push: { teachers } })
      const addedTeachers = await User.find({ _id: { $in: teachers } }).select(keysToStringExclude('_id'))
      return addedTeachers
    } else {
      throw createError({ statusCode: 400, statusMessage: 'Invalid action provided.' })
    }
  } catch (error) {
    console.error('Error updating department:', error)
    throw error
  }
})
