import { defineEventHandler, readBody, createError } from 'h3'
import { University } from '~/server/dbModels'

interface IRequestBody {
  data: any;
}

export default defineEventHandler(async (event) => {
  const { universityId } = event.context.params
  const { data } = await readBody<IRequestBody>(event)
  const user = event.context.user

  try {
    console.log(`*** PUT /api/universities/${universityId} ***`)

    // Check if the current user is included in the administrators of the university, faculty or department, or if the user is admin
    if (user && !await isInAdministration(user.id, universityId) && !event.context.isAdmin) {
      throw createError({ statusCode: 403, statusMessage: 'You do not have permission to update this university.' })
    }

    const university = await University.findById(universityId)

    if (!university) {
      throw createError({ statusCode: 404, statusMessage: 'University not found.' })
    }

    console.log()

    const updatedUniversity = await University.findByIdAndUpdate(universityId, data, { new: true })
    console.log('Updated university:', updatedUniversity)
    return updatedUniversity
  } catch (error) {
    console.error('Error updating university:', error)
    throw error
  }
})
