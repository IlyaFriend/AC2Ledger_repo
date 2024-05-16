import { defineEventHandler } from 'h3'
import { University } from '../../../dbModels'

export default defineEventHandler(async (event) => {
  const { universityId } = event.context.params
  console.log(`*** GET /api/universities/${universityId} ***`)

  try {
    const fetchedUniversity = await University.findById(universityId)
      .populate({
        path: 'administration',
        select: keysToStringExclude('_id')
      })
      .populate({
        path: 'faculties',
        select: keysToStringExclude('_id')
      })
    return fetchedUniversity
  } catch (err) {
    console.log(err)
    throw error
  }
})
