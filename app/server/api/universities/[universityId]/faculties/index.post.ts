import { defineEventHandler, readBody } from 'h3'
import { Faculty, University } from '../../../../dbModels'

interface IRequestBody {
  data: any;
}
export default defineEventHandler(async (event) => {
  console.log('*** POST /api/faculties/ ***')
  const { data: faculty } = await readBody<IRequestBody>(event)
  const { universityId } = event.context.params

  let newFaculty
  try {
    newFaculty = await Faculty.create(faculty)
    console.log('New faculty added:', newFaculty)

    await University.findByIdAndUpdate(universityId, { $push: { faculties: newFaculty._id } })

    return newFaculty
  } catch (err) {
    console.log(err)
    // If updating a university fails, delete the newly created faculty
    if (newFaculty) {
      await Faculty.findByIdAndDelete(newFaculty._id)
    }
    throw error
  }
})
