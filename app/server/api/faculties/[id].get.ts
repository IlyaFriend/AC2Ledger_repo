import { defineEventHandler } from 'h3'
import { Faculty } from '../../dbModels'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  console.log(`*** GET /api/faculties/${id} ***`)

  try {
    const fetchedFaculty = await Faculty.findById(id)
      .populate({
        path: 'administration',
        select: keysToStringExclude('_id')
      })
      .populate({
        path: 'departments',
        select: keysToStringExclude('_id')
      })
    console.log('fetched faculty:', fetchedFaculty, '\n')
    return fetchedFaculty
  } catch (err) {
    console.log(err)
    throw error
  }
})
