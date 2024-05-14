import { defineEventHandler } from 'h3'
import { University } from '../../dbModels'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  console.log(`*** GET /api/universities/${id} ***`)

  try {
    const fetchedUniversity = await University.findById(id)
      .populate({
        path: 'administration',
        select: keysToStringExclude('_id')
      })
      .populate({
        path: 'faculties',
        select: keysToStringExclude('_id')
      })
    console.log('fetched university:', fetchedUniversity, '\n')
    return fetchedUniversity
  } catch (err) {
    console.log(err)
    throw error
  }
})
