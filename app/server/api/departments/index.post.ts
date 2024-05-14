import { defineEventHandler, readBody } from 'h3'
import { Department, Faculty } from '../../dbModels'

interface IRequestBody {
  data: any;
}
export default defineEventHandler(async (event) => {
  console.log('*** POST /api/departments/ ***')
  const { data: { department, facultyId } } = await readBody<IRequestBody>(event)

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
