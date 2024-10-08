import { defineEventHandler, readBody } from 'h3'
import { Department, Faculty } from '~/server/dbModels'

interface IRequestBody {
  data: any;
}
export default defineEventHandler(async (event) => {
  console.log('*** POST /api/departments/ ***')
  const { universityId, facultyId } = event.context.params
  const body = await readBody<IRequestBody>(event)
  const department = body.data
  const user = event.context.user

  if (user && !await isInAdministration(user.id, universityId, facultyId) && !event.context.isAdmin) {
    throw createError({ statusCode: 403, statusMessage: 'You do not have permission to add a new department in this faculty.' })
  }

  let newDepartment
  try {
    newDepartment = await Department.create(department)
    console.log('New department added:', newDepartment)

    await Faculty.findByIdAndUpdate(facultyId, { $push: { departments: newDepartment._id } })

    return newDepartment
  } catch (err) {
    console.log(err)
    // If updating a faculty fails, delete the newly created department
    if (newDepartment) {
      await Department.findByIdAndDelete(newDepartment._id)
    }
    throw error
  }
})
